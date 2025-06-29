
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import axios from "axios";

const baseURL = "http://nkkcoc4wskok8kw04cs4oows.31.97.168.219.sslip.io";
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
