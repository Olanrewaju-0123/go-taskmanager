import { useState, useEffect, useCallback } from "react";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "../types/task";
import { taskApi } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new task
  const createTask = useCallback(async (taskData: CreateTaskRequest) => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create task";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Update task
  const updateTask = useCallback(
    async (id: number, updates: UpdateTaskRequest) => {
      try {
        setError(null);
        const updatedTask = await taskApi.updateTask(id, updates);
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task))
        );
        return updatedTask;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update task";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  // Delete task
  const deleteTask = useCallback(async (id: number) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete task";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = useCallback(
    async (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        await updateTask(id, { completed: !task.completed });
      }
    },
    [tasks, updateTask]
  );

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refreshTasks: fetchTasks,
  };
};
