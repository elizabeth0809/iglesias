// @/infrastructure/actions/comunidades/graphql/get-single-comunidade-action.ts

import { IComunidadeResponse } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { ComunidadesMappers } from "@/insfractucture/mappers/comunidade/comunidade.mappers";
import axios from "axios";

const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface SingleComunidadeResponse {
  comunidade: IComunidadeResponse | null;
  error?: string;
}

export const getComunidadeBySlugAction = async (slug: string): Promise<SingleComunidadeResponse> => {
  try {
    const query = `
      query GetComunidadeBySlug($slug: String!) {
        nossaComunidades(filters: { slug: { eq: $slug } }) {
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

    console.log('🔍 Searching comunidade by slug:', slug);

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: { slug },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log('📡 Single comunidade response:', JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("❌ GraphQL errors:", response.data.errors);
      return {
        comunidade: null,
        error: `GraphQL query failed: ${JSON.stringify(response.data.errors)}`
      };
    }

    const comunidades = response.data.data?.nossaComunidades?.data || [];
    
    if (comunidades.length === 0) {
      console.warn('⚠️ No comunidade found with slug:', slug);
      return {
        comunidade: null,
        error: 'Comunidade não encontrada'
      };
    }

    // Tomar la primera (debería ser única por slug)
    const comunidadeData = comunidades[0];
    const mappedComunidade = ComunidadesMappers.fromStrapiGraphQLToEntity(comunidadeData);
    
    console.log('✅ Mapped single comunidade:', mappedComunidade);

    return {
      comunidade: mappedComunidade
    };

  } catch (error) {
    console.error("❌ Error fetching single comunidade:", error);
    return {
      comunidade: null,
      error: 'Error al cargar la comunidade'
    };
  }
};

export const getComunidadeByIdAction = async (id: string): Promise<SingleComunidadeResponse> => {
  try {
    // Intentar usar la query singular si está disponible
    const query = `
      query GetSingleComunidade($id: ID!) {
        nossaComunidade(id: $id) {
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

    console.log('🔍 Searching comunidade by ID:', id);

    const response = await axios.post(
      strapiGraphQLURL,
      {
        query,
        variables: { id },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log('📡 Single comunidade by ID response:', JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("❌ GraphQL errors:", response.data.errors);
      return {
        comunidade: null,
        error: `GraphQL query failed: ${JSON.stringify(response.data.errors)}`
      };
    }

    const comunidadeData = response.data.data?.nossaComunidade?.data;
    
    if (!comunidadeData) {
      console.warn('⚠️ No comunidade found with ID:', id);
      return {
        comunidade: null,
        error: 'Comunidade não encontrada'
      };
    }

    const mappedComunidade = ComunidadesMappers.fromStrapiGraphQLToEntity(comunidadeData);
    
    console.log('✅ Mapped single comunidade by ID:', mappedComunidade);

    return {
      comunidade: mappedComunidade
    };

  } catch (error) {
    console.error("❌ Error fetching single comunidade by ID:", error);
    
    // Fallback: intentar con la query plural usando filtros
    console.log('🔄 Trying fallback with plural query...');
    
    try {
      const fallbackQuery = `
        query GetComunidadeById($id: ID!) {
          nossaComunidades(filters: { id: { eq: $id } }) {
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

      const fallbackResponse = await axios.post(
        strapiGraphQLURL,
        {
          query: fallbackQuery,
          variables: { id },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (fallbackResponse.data.errors) {
        throw new Error('Fallback query also failed');
      }

      const comunidades = fallbackResponse.data.data?.nossaComunidades?.data || [];
      
      if (comunidades.length === 0) {
        return {
          comunidade: null,
          error: 'Comunidade não encontrada'
        };
      }

      const mappedComunidade = ComunidadesMappers.fromStrapiGraphQLToEntity(comunidades[0]);
      
      return {
        comunidade: mappedComunidade
      };

    } catch (fallbackError) {
      console.error("❌ Fallback also failed:", fallbackError);
      return {
        comunidade: null,
        error: 'Error al cargar la comunidade'
      };
    }
  }
};