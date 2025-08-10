// @/infrastructure/interfaces/comunidades/comunidades.interfaces.ts

export interface IComunidadeResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  slug : string;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

// Interfaces para la respuesta de Strapi GraphQL
export interface IStrapiGraphQLComunidadeResponse {
  data: {
    nossaComunidades: {
      data: IStrapiGraphQLComunidadeData[];
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

export interface IStrapiGraphQLComunidadeData {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    image?: {
      data?: {
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
}