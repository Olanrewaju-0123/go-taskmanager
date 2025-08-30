package repository

import (
	"context"
	"errors"

	"gorm.io/gorm"
	"taskmanager/internal/models"
)

// TaskRepository handles database operations for tasks
type TaskRepository struct {
	db *gorm.DB
}

// NewTaskRepository creates a new task repository
func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

// Create creates a new task in the database
func (r *TaskRepository) Create(ctx context.Context, task *models.Task) error {
	result := r.db.WithContext(ctx).Create(task)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// GetAll retrieves all tasks from the database
func (r *TaskRepository) GetAll(ctx context.Context) ([]models.Task, error) {
	var tasks []models.Task
	result := r.db.WithContext(ctx).Find(&tasks)
	if result.Error != nil {
		return nil, result.Error
	}
	return tasks, nil
}

// GetByID retrieves a task by its ID
func (r *TaskRepository) GetByID(ctx context.Context, id uint) (*models.Task, error) {
	var task models.Task
	result := r.db.WithContext(ctx).First(&task, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("task not found")
		}
		return nil, result.Error
	}
	return &task, nil
}

// Update updates an existing task in the database
func (r *TaskRepository) Update(ctx context.Context, task *models.Task) error {
	result := r.db.WithContext(ctx).Save(task)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Delete removes a task from the database
func (r *TaskRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&models.Task{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("task not found")
	}
	return nil
}
