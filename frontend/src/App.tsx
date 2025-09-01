import React, { useState } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refreshTasks,
  } = useTasks();

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = async (title: string) => {
    setIsCreating(true);
    try {
      await createTask({ title });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create task"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (
    id: number,
    updates: { title?: string; completed?: boolean }
  ) => {
    try {
      await updateTask(id, updates);
      if (updates.title) {
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update task"
      );
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete task"
      );
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      await toggleTaskCompletion(id);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update task"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <TaskForm onSubmit={handleCreateTask} loading={isCreating} />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onRefresh={refreshTasks}
        />
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
