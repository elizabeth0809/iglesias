export interface SermonResponse {
  id: number;
  titulo: string;
  descripcion: string;
  url_youtube: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  youtube_video_id: string;
  youtube_embed_url: string;
  youtube_thumbnail: string;
}

export type SermonsResponse = SermonResponse[];

export interface CreateSermonPayload {
  titulo: string;
  descripcion: string;
  url_youtube: string;
  activo?: boolean;
}

export interface UpdateSermonPayload {
  titulo?: string;
  descripcion?: string;
  url_youtube?: string;
  activo?: boolean;
}