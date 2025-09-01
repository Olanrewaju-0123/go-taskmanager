.PHONY: help run build test clean migrate docker-up docker-down

# Default target
help:
	@echo "Available commands:"
	@echo "  run        - Run the application"
	@echo "  build      - Build the application"
	@echo "  test       - Run tests"
	@echo "  clean      - Clean build artifacts"
	@echo "  migrate    - Run database migrations"
	@echo "  docker-up  - Start PostgreSQL with Docker"
	@echo "  docker-down- Stop PostgreSQL container"

# Run the application
run:
	go run cmd/taskmanager/main.go

# Build the application
build:
	go build -o bin/taskmanager cmd/taskmanager/main.go

# Run tests
test:
	go test ./...

# Clean build artifacts
clean:
	rm -rf bin/
	go clean

# Run database migrations (auto-migrate is handled in main.go)
migrate:
	@echo "Migrations are handled automatically when the application starts"

# Start PostgreSQL with Docker
docker-up:
	docker compose up -d

# Stop PostgreSQL container
docker-down:
	docker compose down

# Install dependencies
deps:
	go mod download
	go mod tidy

# Format code
fmt:
	go fmt ./...

# Lint code
lint:
	golangci-lint run

# Generate documentation
docs:
	@echo "API Documentation:"
	@echo "POST   /tasks     - Create a new task"
	@echo "GET    /tasks     - Get all tasks"
	@echo "GET    /tasks/{id} - Get a specific task"
	@echo "PUT    /tasks/{id} - Update a task"
	@echo "DELETE /tasks/{id} - Delete a task"
	@echo "GET    /health    - Health check endpoint"
