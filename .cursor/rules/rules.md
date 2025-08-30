# Go Task Manager Project Rules

## Code Style & Standards

### Go Conventions

- Follow Go naming conventions (camelCase for variables, PascalCase for exported functions/types)
- Use meaningful variable and function names
- Keep functions small and focused on single responsibility
- Use proper error handling with explicit error returns
- Add comments for exported functions and complex logic

### Project Structure

- Follow the established folder structure:
  - `/cmd/taskmanager` - Main application entry point
  - `/internal/` - Private application code
  - `/pkg/` - Public libraries that can be imported by other projects
- Keep handlers thin, move business logic to services
- Use repository pattern for data access
- Implement proper separation of concerns

### API Design

- Use RESTful conventions for endpoints
- Return consistent JSON responses
- Use proper HTTP status codes
- Implement proper error handling with meaningful error messages
- Use context for request handling and timeouts

### Database

- Use GORM as ORM with PostgreSQL
- Implement auto-migrations for schema changes
- Use proper database connection pooling
- Handle database errors gracefully

### Security

- Use environment variables for sensitive configuration
- Never hardcode database credentials
- Validate input data
- Use proper logging without exposing sensitive information

### Testing

- Write unit tests for repository and service layers
- Use table-driven tests where appropriate
- Mock external dependencies in tests
- Aim for good test coverage

### Documentation

- Add README with setup instructions
- Document API endpoints
- Include example requests/responses
- Add comments for complex business logic

## Implementation Guidelines

### Error Handling

- Always check for errors and handle them appropriately
- Return meaningful error messages to clients
- Log errors for debugging purposes
- Use custom error types when needed

### Logging

- Use structured logging
- Log at appropriate levels (debug, info, warn, error)
- Include request context in logs
- Don't log sensitive information

### Configuration

- Use environment variables for configuration
- Provide sensible defaults
- Validate configuration on startup
- Use a configuration struct to organize settings

### Middleware

- Implement logging middleware
- Add request ID tracking
- Handle CORS if needed
- Add security headers

### Performance

- Use connection pooling for database
- Implement proper indexing
- Use pagination for large datasets
- Consider caching for frequently accessed data
