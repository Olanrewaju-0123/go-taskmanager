import React, { useState } from "react";
import { Plus } from "lucide-react";

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await onSubmit(title.trim());
        setTitle(""); // Clear form after successful submission
      } catch (error) {
        // Error is handled by the parent component
        console.error("Failed to create task:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!title.trim() || loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={20} />
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
};
