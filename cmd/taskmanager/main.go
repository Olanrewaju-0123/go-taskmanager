package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"taskmanager/internal/handlers"
	"taskmanager/internal/models"
	"taskmanager/internal/repository"
	"taskmanager/internal/services"
	"taskmanager/pkg/database"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using default environment variables")
	}

	// Initialize database
	dbConfig := database.NewConfig()
	db, err := database.Connect(dbConfig)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := database.AutoMigrate(db, &models.Task{}); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize layers
	taskRepo := repository.NewTaskRepository(db)
	taskService := services.NewTaskService(taskRepo)
	taskHandler := handlers.NewTaskHandler(taskService)

	// Setup router
	r := chi.NewRouter()

	// CORS middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			
			next.ServeHTTP(w, r)
		})
	})

	// Other middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Timeout(60 * time.Second))

	// Routes
	r.Route("/tasks", func(r chi.Router) {
		r.Post("/", taskHandler.CreateTask)
		r.Get("/", taskHandler.GetAllTasks)
		r.Get("/{id}", taskHandler.GetTaskByID)
		r.Put("/{id}", taskHandler.UpdateTask)
		r.Delete("/{id}", taskHandler.DeleteTask)
	})

	// Health check endpoint
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Get server port from environment
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	// Create server
	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Server starting on port %s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Server shutting down...")

	// Create a deadline for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}
