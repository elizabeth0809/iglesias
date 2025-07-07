// Interfaces actualizadas para sermones
export interface SermonResponse {
  id: number;
  titulo: string;
  descripcion: string;
  url_youtube: string;
  url_facebook?: string | null;
  type: string; 
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
  url_facebook?: string;
  type?: string;
  activo?: boolean;
}

export interface UpdateSermonPayload {
  titulo?: string;
  descripcion?: string;
  url_youtube?: string;
  url_facebook?: string;
  type?: string;
  activo?: boolean;
}


export interface IStrapiGraphQLSermonResponse {
  data: {
    sermones: {
      data: IStrapiGraphQLSermonData[];
      meta: {
        pagination: {
          total: number;
          page: number;
          pageSize: number;
          pageCount: number;
        };
      };
    };
  };
}

export interface IStrapiGraphQLSermonData {
  id: string;
  attributes: {
    titulo: string;
    url_youtube: string;
    url_facebook: string | null;
    type: string;
    descriptions: string;
    activo: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}


export interface IStrapiGraphQLSermonSimpleResponse {
  data: {
    sermones: {
      data: IStrapiGraphQLSermonData[];
    };
  };
}