import { ApiBackend } from "@/config";
import type {
  AuthResponse,
  ValidationErrorResponse,
} from "@/insfractucture/interfaces";
import axios from "axios";

export const LoginAction = async (
  email: string,
  password: string
): Promise<AuthResponse | ValidationErrorResponse> => {
  try {
    const { data } = await ApiBackend.post("/api/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data || "Error desconocido del servidor";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
