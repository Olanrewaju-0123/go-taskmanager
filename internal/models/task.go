package models

import (
	"time"

	"gorm.io/gorm"
)

// Task represents a task in the system
type Task struct {
	ID        uint           `json:"id" gorm:"primaryKey;autoIncrement"`
	Title     string         `json:"title" gorm:"not null"`
	Completed bool           `json:"completed" gorm:"default:false"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateTaskRequest represents the request body for creating a task
type CreateTaskRequest struct {
	Title string `json:"title" validate:"required"`
}

// UpdateTaskRequest represents the request body for updating a task
type UpdateTaskRequest struct {
	Title     *string `json:"title,omitempty"`
	Completed *bool   `json:"completed,omitempty"`
}
