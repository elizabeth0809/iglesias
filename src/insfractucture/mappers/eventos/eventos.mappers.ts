import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

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

export class EventoMappers {
  static fromStrapiGraphQLToEntity(result: IStrapiGraphQLEventoData): IEventoResponse {
    return {
      id: parseInt(result.id),
      nome: result.attributes.name,
      descricao: result.attributes.descriptions,
      imagem: result.attributes.imagem?.data?.[0]?.attributes?.url || null,
      data_inicio: result.attributes.data_inicio,
      data_fim: null, // No viene en la respuesta GraphQL
      localizacao: result.attributes.localizacao,
      slug: result.attributes.slug,
      status: result.attributes.status ? 'ativo' : 'inativo',
      created_at: result.attributes.createdAt,
      updated_at: result.attributes.updatedAt,
    };
  }

  static fromStrapiGraphQLArrayToEntity(results: IStrapiGraphQLEventoData[]): IEventoResponse[] {
    return results.map(result => this.fromStrapiGraphQLToEntity(result));
  }

  static fromStrapiGraphQLResponseToEntity(response: IStrapiGraphQLEventoResponse): {
    eventos: IEventoResponse[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  } {
    return {
      eventos: this.fromStrapiGraphQLArrayToEntity(response.data.eventos.data),
      pagination: response.data.eventos.meta.pagination,
    };
  }
}