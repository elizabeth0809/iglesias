import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";

// Interfaces para la respuesta GraphQL de Strapi - Sermones
interface IStrapiGraphQLSermonResponse {
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

interface IStrapiGraphQLSermonData {
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

export class SermonMappers {
  // Función auxiliar para extraer ID del video de YouTube
  static extractYouTubeVideoId(url: string): string {
    if (!url) return '';
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return '';
  }

  // Función auxiliar para generar URL de embed de YouTube
  static generateYouTubeEmbedUrl(videoId: string): string {
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }

  // Función auxiliar para generar URL de thumbnail de YouTube
  static generateYouTubeThumbnail(videoId: string): string {
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  }

  static fromStrapiGraphQLToEntity(result: IStrapiGraphQLSermonData): SermonResponse {
    const videoId = this.extractYouTubeVideoId(result.attributes.url_youtube);
    
    return {
      id: parseInt(result.id),
      titulo: result.attributes.titulo,
      descripcion: result.attributes.descriptions,
      url_youtube: result.attributes.url_youtube,
      url_facebook: result.attributes.url_facebook,
      type: result.attributes.type,
      activo: result.attributes.activo,
      created_at: result.attributes.createdAt || new Date().toISOString(),
      updated_at: result.attributes.updatedAt || new Date().toISOString(),
      youtube_video_id: videoId,
      youtube_embed_url: this.generateYouTubeEmbedUrl(videoId),
      youtube_thumbnail: this.generateYouTubeThumbnail(videoId),
    };
  }

  static fromStrapiGraphQLArrayToEntity(results: IStrapiGraphQLSermonData[]): SermonResponse[] {
    return results.map(result => this.fromStrapiGraphQLToEntity(result));
  }

  static fromStrapiGraphQLResponseToEntity(response: IStrapiGraphQLSermonResponse): {
    sermones: SermonResponse[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  } {
    return {
      sermones: this.fromStrapiGraphQLArrayToEntity(response.data.sermones.data),
      pagination: response.data.sermones.meta.pagination,
    };
  }
}