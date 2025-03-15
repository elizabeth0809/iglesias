export interface AuthResponse {
  access_token: string;
  data: UserData;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface ValidationErrorResponse {
    message: string;
    data: Record<string, string[]>;
  }