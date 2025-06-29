// actions/eventos/get-event-by-id.actions.ts
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import axios from "axios";

const baseURL = "http://nkkcoc4wskok8kw04cs4oows.31.97.168.219.sslip.io";

export const eventGetByIdAction = async (id: string): Promise<IEventoResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/eventos/${id}`);
    return response.data as IEventoResponse;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};