import axios from "axios";

import { EventoMappers } from "@/insfractucture/mappers/eventos/eventos.mappers";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface EventoGraphQLProps {
  page?: number;
  pageSize?: number;
}

// Respuesta del action que incluye eventos mapeados y paginación
interface EventoGraphQLActionResponse {
  eventos: IEventoResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export const eventoGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: EventoGraphQLProps): Promise<EventoGraphQLActionResponse> => {
  try {
    const query = `
      query GetEventos($page: Int, $pageSize: Int) {
        eventos(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              name
              descriptions
              data_inicio
              localizacao
              slug
              status
              createdAt
              updatedAt
              publishedAt
              imagem {
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


    // Verificar si hay errores en la respuesta GraphQL
    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    // Usar el mapper para convertir la respuesta
    const mappedResponse = EventoMappers.fromStrapiGraphQLResponseToEntity(response.data);
    


    return mappedResponse;
  } catch (error) {
    console.error("Error fetching evento data from GraphQL:", error);
    throw error;
  }
};

// Action simplificado que devuelve solo el array de eventos (sin paginación)
export const eventoGetAllGraphQLSimpleAction = async (): Promise<IEventoResponse[]> => {
  try {
    const query = `
      query {
        eventos {
          data {
            id
            attributes {
              name
              descriptions
              data_inicio
              localizacao
              slug
              status
              createdAt
              updatedAt
              publishedAt
              imagem {
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

    // Usar el mapper para convertir solo los eventos
    const mappedEventos = EventoMappers.fromStrapiGraphQLArrayToEntity(response.data.data.eventos.data);

    return mappedEventos;
  } catch (error) {
    console.error("Error fetching evento data from GraphQL:", error);
    throw error;
  }
};