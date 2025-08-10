// @/infrastructure/actions/comunidades/graphql/get-comunidades-actions.ts

import { IComunidadeResponse } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { ComunidadesMappers } from "@/insfractucture/mappers/comunidade/comunidade.mappers";
import axios from "axios";


const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface ComunidadesGraphQLProps {
  page?: number;
  pageSize?: number;
}

// Respuesta del action que incluye comunidades mapeadas y paginación
interface ComunidadesGraphQLActionResponse {
  comunidades: IComunidadeResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export const comunidadesGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: ComunidadesGraphQLProps): Promise<ComunidadesGraphQLActionResponse> => {
  try {
    const query = `
      query GetComunidades($page: Int, $pageSize: Int) {
        nossaComunidades(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              name
              description
              createdAt
              updatedAt
              image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
    `;

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: {
          page,
          pageSize,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const mappedResponse = ComunidadesMappers.fromStrapiGraphQLResponseToEntity(response.data);

    return mappedResponse;
  } catch (error) {
    console.error("Error fetching comunidades data from GraphQL:", error);
    throw error;
  }
};

// Action simplificado que devuelve solo el array de comunidades (sin paginación)
export const comunidadesGetAllGraphQLSimpleAction = async (): Promise<IComunidadeResponse[]> => {
  try {
    const query = `
      query {
        nossaComunidades {
          data {
            id
            attributes {
              name
              description
              createdAt
              updatedAt
              image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      strapiGraphQLURL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    // Usar el mapper para convertir solo las comunidades
    const mappedComunidades = ComunidadesMappers.fromStrapiGraphQLArrayToEntity(response.data.data.nossaComunidades.data);

    return mappedComunidades;
  } catch (error) {
    console.error("Error fetching comunidades data from GraphQL:", error);
    throw error;
  }
};