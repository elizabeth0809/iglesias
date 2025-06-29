import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import axios from "axios";

interface BlogDetailProps {
  page: string;
}
const baseURL = "http://nkkcoc4wskok8kw04cs4oows.31.97.168.219.sslip.io";

export const blogGetBlogDetailsAction = async ({
  page ,
}: BlogDetailProps): Promise<IBlogResponse> => {
  try {
    const response = await axios.get(`${baseURL}/api/blogs/${page}`);
    return response.data as IBlogResponse;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    throw error;
  }
};