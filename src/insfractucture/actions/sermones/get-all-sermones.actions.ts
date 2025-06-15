
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";
export const getAllSermonsAction = async (): Promise<SermonResponse[]> => {
  try {
    const response = await axios.get(`${baseURL}/api/sermones`, {
     
    });
    return response.data as SermonResponse[];
  } catch (error) {
    console.error("Error fetching sermons data:", error);
    throw error;
  }
};
