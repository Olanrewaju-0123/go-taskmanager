import React, { useState } from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onUpdate: (
    id: number,
    updates: { title?: string; completed?: boolean }
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onToggleComplete: (id: number) => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      setIsUpdating(true);
      try {
        await onUpdate(task.id, { title: editTitle.trim() });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update task:", error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.id);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white rounded-lg border ${
        task.completed ? "border-green-200 bg-green-50" : "border-gray-200"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggleComplete}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {task.completed && <Check size={14} />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        ) : (
          <span
            className={`block truncate ${
              task.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              disabled={isUpdating}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
