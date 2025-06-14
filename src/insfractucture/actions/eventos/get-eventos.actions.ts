
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";
interface EventosProps {
  page?: number;
}

export const GetEventosAllAction = async ({
  page = 1,
}: EventosProps): Promise<IEventoResponse[]> => {
  try {
    const response = await axios.get(`${baseURL}/api/eventos?page=${page}`);
    return response.data as IEventoResponse[];
  } catch (error) {
    console.error("Error fetching eventos data:", error);
    throw error;
  }
};