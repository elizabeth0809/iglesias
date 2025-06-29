
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import axios from "axios";

const baseURL = "http://nkkcoc4wskok8kw04cs4oows.31.97.168.219.sslip.io";
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