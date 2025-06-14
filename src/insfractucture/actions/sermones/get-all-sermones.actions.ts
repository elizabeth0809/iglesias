
import { SermonsResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";
export const getAllSermonsAction = async (): Promise<SermonsResponse[]> => {
  try {
    const response = await axios.get(`${baseURL}/api/sermones`, {
     
    });
    return response.data as SermonsResponse[];
  } catch (error) {
    console.error("Error fetching sermons data:", error);
    throw error;
  }
};