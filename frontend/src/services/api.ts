import axios from "axios";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  ApiResponse,
} from "../types/task";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskApi = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>("/tasks");
    return response.data.data || [];
  },

  // Get task by ID
  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data!;
  },

  // Create new task
  createTask: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>("/tasks", task);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data!;
  },

  // Update task
  updateTask: async (id: number, updates: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, updates);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.data!;
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    const response = await api.delete<ApiResponse<string>>(`/tasks/${id}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
  },
};

export default api;
