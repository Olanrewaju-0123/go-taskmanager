package services

import (
	"context"
	"errors"

	"taskmanager/internal/models"
	"taskmanager/internal/repository"
)

// TaskService handles business logic for tasks
type TaskService struct {
	taskRepo *repository.TaskRepository
}

// NewTaskService creates a new task service
func NewTaskService(taskRepo *repository.TaskRepository) *TaskService {
	return &TaskService{
		taskRepo: taskRepo,
	}
}

// CreateTask creates a new task
func (s *TaskService) CreateTask(ctx context.Context, req *models.CreateTaskRequest) (*models.Task, error) {
	if req.Title == "" {
		return nil, errors.New("title is required")
	}

	task := &models.Task{
		Title:     req.Title,
		Completed: false,
	}

	err := s.taskRepo.Create(ctx, task)
	if err != nil {
		return nil, err
	}

	return task, nil
}

// GetAllTasks retrieves all tasks
func (s *TaskService) GetAllTasks(ctx context.Context) ([]models.Task, error) {
	return s.taskRepo.GetAll(ctx)
}

// GetTaskByID retrieves a task by its ID
func (s *TaskService) GetTaskByID(ctx context.Context, id uint) (*models.Task, error) {
	return s.taskRepo.GetByID(ctx, id)
}

// UpdateTask updates an existing task
func (s *TaskService) UpdateTask(ctx context.Context, id uint, req *models.UpdateTaskRequest) (*models.Task, error) {
	task, err := s.taskRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Update fields if provided
	if req.Title != nil {
		if *req.Title == "" {
			return nil, errors.New("title cannot be empty")
		}
		task.Title = *req.Title
	}

	if req.Completed != nil {
		task.Completed = *req.Completed
	}

	err = s.taskRepo.Update(ctx, task)
	if err != nil {
		return nil, err
	}

	return task, nil
}

// DeleteTask removes a task
func (s *TaskService) DeleteTask(ctx context.Context, id uint) error {
	return s.taskRepo.Delete(ctx, id)
}
