import React from "react";
import { TaskItem } from "./TaskItem";
import { Task } from "../types/task";
import { RefreshCw, AlertCircle } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onUpdate: (
    id: number,
    updates: { title?: string; completed?: boolean }
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onToggleComplete: (id: number) => Promise<void>;
  onRefresh: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onUpdate,
  onDelete,
  onToggleComplete,
  onRefresh,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-gray-600">
          <RefreshCw size={20} className="animate-spin" />
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
            <AlertCircle size={20} />
            <span>Error loading tasks</span>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">
          Get started by creating your first task above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};
