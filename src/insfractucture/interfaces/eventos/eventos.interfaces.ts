export type EventoStatus = 'ativo' | 'inativo' | 'cancelado' | 'finalizado';

export interface IEventoPayload {
  nome: string;
  descricao?: string;
  imagem?: File;
  data_inicio: string;
  data_fim?: string;
  localizacao?: string;
  status?: EventoStatus;
}

export interface IEventoResponse {
  id: number;
  nome: string;
  slug: string;
  descricao: string | null;
  imagem: string | null;
  data_inicio: string;
  data_fim: string | null;
  localizacao: string | null;
  status: EventoStatus;
  created_at: string;
  updated_at: string;
}

export interface IEventoCreateResponse {
  nome: string;
  descricao: string | null;
  imagem: string | null;
  data_inicio: string;
  data_fim: string | null;
  localizacao: string | null;
  status: EventoStatus;
  updated_at: string;
  created_at: string;
  id: number;
}



// Interfaces para la respuesta GraphQL de Strapi - Eventos
// Interfaces para la respuesta GraphQL de Strapi - Eventos
interface IStrapiGraphQLEventoResponse {
  data: {
    eventos: {
      data: IStrapiGraphQLEventoData[];
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

interface IStrapiGraphQLEventoData {
  id: string;
  attributes: {
    name: string;
    descriptions: string;
    data_inicio: string;
    localizacao: string;
    slug: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    imagem?: {
      data?: {
        attributes: {
          name: string;
          url: string;
        };
      }[];
    };
  };
}

// Interface para respuesta simple sin paginación
interface IStrapiGraphQLEventoSimpleResponse {
  data: {
    eventos: {
      data: IStrapiGraphQLEventoData[];
    };
  };
}