export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskRequest {
  title: string;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
