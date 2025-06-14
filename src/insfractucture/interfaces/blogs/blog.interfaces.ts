export type BlogStatus = 'draft' | 'published';

export interface IBlogPayload {
  title: string;
  image: File;
  content: string;
  category_id: string | number;
  status: BlogStatus;
  description: string;
}
export interface IBlogFormData extends FormData {}


export interface IBlogResponse {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
  slug: string;
  status: BlogStatus;
  category_id: string;
  created_at: string; 
  updated_at: string; 
}