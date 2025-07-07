export type BlogStatus = 'draft' | 'published';

export interface IBlogPayload {
  title: string;
  image: File;
  content: string;
  category_id: string | number;
  status: BlogStatus;
  description: string;
}

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

// ==============================================
// ARCHIVO: infrastructure/interfaces/shared/pagination.interfaces.ts
// ==============================================

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}