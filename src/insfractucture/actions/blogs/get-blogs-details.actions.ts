import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import axios from "axios";

interface BlogDetailProps {
  page?: number;
}
const baseURL = "http://127.0.0.1:8000";

export const blogGetBlogDetailsAction = async ({
  page = 1,
}: BlogDetailProps): Promise<IBlogResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/blogs/${page}`);
    return response.data as IBlogResponse;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    throw error;
  }
};