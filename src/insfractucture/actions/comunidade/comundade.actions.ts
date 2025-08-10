// @/infrastructure/actions/comunidades/graphql/get-comunidades-actions.ts

import { IComunidadeResponse } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { ComunidadesMappers } from "@/insfractucture/mappers/comunidade/comunidade.mappers";
import axios from "axios";


const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface ComunidadesGraphQLProps {
  page?: number;
  pageSize?: number;
}

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
    // Query actualizada para manejar Rich Text Blocks
    const query = `
      query GetComunidades($page: Int, $pageSize: Int) {
        nossaComunidades(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              name
              slug
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

    console.log('🚀 Sending GraphQL query:', query);
    console.log('📝 Variables:', { page, pageSize });

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

    console.log('📡 Raw GraphQL response:', JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("❌ GraphQL errors:", response.data.errors);
      throw new Error(`GraphQL query failed: ${JSON.stringify(response.data.errors)}`);
    }

    if (!response.data.data) {
      console.error("❌ No data in response:", response.data);
      throw new Error("No data received from GraphQL");
    }

    const mappedResponse = ComunidadesMappers.fromStrapiGraphQLResponseToEntity(response.data);
    
    console.log('✅ Mapped response:', mappedResponse);

    return mappedResponse;
  } catch (error) {
    console.error("❌ Error fetching comunidades data from GraphQL:", error);
    if (axios.isAxiosError(error)) {
      console.error("🌐 Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
    throw error;
  }
};

export const comunidadesGetAllGraphQLSimpleAction = async (): Promise<IComunidadeResponse[]> => {
  try {
    const query = `
      query {
        nossaComunidades {
          data {
            id
            attributes {
              name
              slug
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

    console.log('🚀 Sending simple GraphQL query');

    const response = await axios.post(
      strapiGraphQLURL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log('📡 Simple query response:', JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("❌ GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const mappedComunidades = ComunidadesMappers.fromStrapiGraphQLArrayToEntity(
      response.data.data?.nossaComunidades?.data || []
    );

    console.log('✅ Simple mapped comunidades:', mappedComunidades);

    return mappedComunidades;
  } catch (error) {
    console.error("❌ Error fetching comunidades data from GraphQL:", error);
    throw error;
  }
};