import { IComunidadeResponse, IStrapiGraphQLComunidadeData, IStrapiGraphQLComunidadeResponse } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";

export class ComunidadesMappers {
  static fromStrapiGraphQLToEntity(result: IStrapiGraphQLComunidadeData): IComunidadeResponse {
    return {
      id: parseInt(result.id),
      name: result.attributes.name,
      slug: result.attributes.slug,
      description: result.attributes.description,
      image: result.attributes.image?.data?.attributes?.url || "",
      created_at: result.attributes.createdAt,
      updated_at: result.attributes.updatedAt,
    };
  }

  static fromStrapiGraphQLArrayToEntity(results: IStrapiGraphQLComunidadeData[]): IComunidadeResponse[] {
    return results.map(result => this.fromStrapiGraphQLToEntity(result));
  }

  static fromStrapiGraphQLResponseToEntity(response: IStrapiGraphQLComunidadeResponse): {
    comunidades: IComunidadeResponse[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  } {
    return {
      comunidades: this.fromStrapiGraphQLArrayToEntity(response.data.nossaComunidades.data),
      pagination: response.data.nossaComunidades.meta.pagination,
    };
  }
}