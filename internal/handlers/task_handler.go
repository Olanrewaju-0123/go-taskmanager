package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"taskmanager/internal/models"
	"taskmanager/internal/services"
)

// TaskHandler handles HTTP requests for tasks
type TaskHandler struct {
	taskService *services.TaskService
}

// NewTaskHandler creates a new task handler
func NewTaskHandler(taskService *services.TaskService) *TaskHandler {
	return &TaskHandler{
		taskService: taskService,
	}
}

// Response represents a standard API response
type Response struct {
	Data  interface{} `json:"data,omitempty"`
	Error string      `json:"error,omitempty"`
}

// CreateTask handles POST /tasks
func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
	var req models.CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	task, err := h.taskService.CreateTask(r.Context(), &req)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusCreated, Response{Data: task})
}

// GetAllTasks handles GET /tasks
func (h *TaskHandler) GetAllTasks(w http.ResponseWriter, r *http.Request) {
	tasks, err := h.taskService.GetAllTasks(r.Context())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve tasks")
		return
	}

	respondWithJSON(w, http.StatusOK, Response{Data: tasks})
}

// GetTaskByID handles GET /tasks/{id}
func (h *TaskHandler) GetTaskByID(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid task ID")
		return
	}

	task, err := h.taskService.GetTaskByID(r.Context(), uint(id))
	if err != nil {
		if err.Error() == "task not found" {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve task")
		return
	}

	respondWithJSON(w, http.StatusOK, Response{Data: task})
}

// UpdateTask handles PUT /tasks/{id}
func (h *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid task ID")
		return
	}

	var req models.UpdateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	task, err := h.taskService.UpdateTask(r.Context(), uint(id), &req)
	if err != nil {
		if err.Error() == "task not found" {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, Response{Data: task})
}

// DeleteTask handles DELETE /tasks/{id}
func (h *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid task ID")
		return
	}

	err = h.taskService.DeleteTask(r.Context(), uint(id))
	if err != nil {
		if err.Error() == "task not found" {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "Failed to delete task")
		return
	}

	respondWithJSON(w, http.StatusOK, Response{Data: "Task deleted successfully"})
}

// respondWithJSON sends a JSON response
func respondWithJSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

// respondWithError sends an error response
func respondWithError(w http.ResponseWriter, statusCode int, message string) {
	respondWithJSON(w, statusCode, Response{Error: message})
}
