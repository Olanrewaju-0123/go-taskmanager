# Task Manager Backend

A RESTful API for managing tasks built with Go (Golang), PostgreSQL, and GORM.

## Features

- ✅ CRUD operations for tasks
- ✅ PostgreSQL database with GORM ORM
- ✅ RESTful API design
- ✅ Proper error handling and JSON responses
- ✅ Repository pattern implementation
- ✅ Service layer for business logic
- ✅ Chi router for HTTP routing
- ✅ Environment configuration
- ✅ Docker support for PostgreSQL
- ✅ Graceful server shutdown
- ✅ Logging middleware
- ✅ Health check endpoint

## Project Structure

```
taskmanager/
├── cmd/
│   └── taskmanager/
│       └── main.go              # Application entry point
├── internal/
│   ├── handlers/
│   │   └── task_handler.go      # HTTP handlers
│   ├── models/
│   │   └── task.go              # Database models
│   ├── repository/
│   │   └── task_repository.go   # Data access layer
│   └── services/
│       └── task_service.go      # Business logic
├── pkg/
│   └── database/
│       └── db.go                # Database connection
├── .cursor/
│   └── rules/
│       └── rules.md             # Project coding rules
├── .env.example                 # Environment variables template
├── docker-compose.yml           # PostgreSQL container setup
├── Makefile                     # Build and development commands
├── go.mod                       # Go module dependencies
└── README.md                    # This file
```

## Prerequisites

- Go 1.21 or higher
- PostgreSQL (or Docker for containerized setup)
- Make (optional, for using Makefile commands)

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd go-taskmanager
```

### 2. Environment Configuration

Copy the example environment file and configure your database:

```bash
cp env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=taskmanager
DB_SSLMODE=disable
SERVER_PORT=8080
```

### 3. Start PostgreSQL (Option 1: Docker)

```bash
make docker-up
```

### 3. Start PostgreSQL (Option 2: Local Installation)

Install PostgreSQL locally and create a database named `taskmanager`.

### 4. Install Dependencies

```bash
go mod download
```

### 5. Run the Application

```bash
make run
```

Or directly:

```bash
go run cmd/taskmanager/main.go
```

The server will start on `http://localhost:8080`

## API Endpoints

### Tasks

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | `/tasks`      | Create a new task   |
| GET    | `/tasks`      | Get all tasks       |
| GET    | `/tasks/{id}` | Get a specific task |
| PUT    | `/tasks/{id}` | Update a task       |
| DELETE | `/tasks/{id}` | Delete a task       |

### Health Check

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| GET    | `/health` | Health check endpoint |

## API Examples

### Create a Task

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Go"}'
```

**Response:**

```json
{
  "data": {
    "id": 1,
    "title": "Learn Go",
    "completed": false,
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

### Get All Tasks

```bash
curl http://localhost:8080/tasks
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Learn Go",
      "completed": false,
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### Get a Specific Task

```bash
curl http://localhost:8080/tasks/1
```

### Update a Task

```bash
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Go Programming", "completed": true}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:8080/tasks/1
```

## Error Responses

The API returns consistent error responses:

```json
{
  "error": "Task not found"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Available Make Commands

```bash
make help        # Show available commands
make run         # Run the application
make build       # Build the application
make test        # Run tests
make clean       # Clean build artifacts
make docker-up   # Start PostgreSQL with Docker
make docker-down # Stop PostgreSQL container
make deps        # Install dependencies
make fmt         # Format code
make lint        # Lint code
make docs        # Show API documentation
```

### Database Schema

The `tasks` table has the following structure:

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

## Architecture

The application follows a clean architecture pattern:

- **Handlers**: HTTP request/response handling
- **Services**: Business logic and validation
- **Repository**: Data access and database operations
- **Models**: Data structures and database models

## Testing

Run tests:

```bash
make test
```

## Contributing

1. Follow the coding rules defined in `.cursor/rules/rules.md`
2. Write tests for new features
3. Ensure all tests pass
4. Follow Go conventions and best practices

## License

This project is open source and available under the [MIT License](LICENSE).
