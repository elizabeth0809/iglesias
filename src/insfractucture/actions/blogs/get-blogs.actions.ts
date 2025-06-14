
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";
interface BlogAllProps {
  page?: number;
}

export const blogGetAllAction = async ({
  page = 1,
}: BlogAllProps): Promise<IBlogResponse[]> => {
  try {
    const response = await axios.get(`${baseURL}/api/blogs?page=${page}`);
    return response.data as IBlogResponse[];
  } catch (error) {
    console.error("Error fetching blog data:", error);
    throw error;
  }
};
