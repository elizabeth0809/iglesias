import axios from "axios";
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import { SermonMappers } from "@/insfractucture/mappers/sermones/sermones.mapers";


const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface SermonGraphQLProps {
  page?: number;
  pageSize?: number;
}

// Respuesta del action que incluye sermones mapeados y paginación
interface SermonGraphQLActionResponse {
  sermones: SermonResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export const sermonGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: SermonGraphQLProps): Promise<SermonGraphQLActionResponse> => {
  try {
    const query = `
      query GetSermones($page: Int, $pageSize: Int) {
        sermones(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              titulo
              url_youtube
              url_facebook
              type
              descriptions
              activo
              createdAt
              updatedAt
              publishedAt
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

    const mappedResponse = SermonMappers.fromStrapiGraphQLResponseToEntity(response.data);
    


    return mappedResponse;
  } catch (error) {
    console.error("Error fetching sermon data from GraphQL:", error);
    throw error;
  }
};

// Action simplificado que devuelve solo el array de sermones (sin paginación)
export const sermonGetAllGraphQLSimpleAction = async (): Promise<SermonResponse[]> => {
  try {
    const query = `
      query {
        sermones {
          data {
            id
            attributes {
              titulo
              url_youtube
              url_facebook
              type
              descriptions
              activo
              createdAt
              updatedAt
              publishedAt
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

    // Usar el mapper para convertir solo los sermones
    const mappedSermones = SermonMappers.fromStrapiGraphQLArrayToEntity(response.data.data.sermones.data);

    return mappedSermones;
  } catch (error) {
    console.error("Error fetching sermon data from GraphQL:", error);
    throw error;
  }
};

// Action para obtener sermón por ID
export const sermonGetByIdGraphQLAction = async (id: string): Promise<SermonResponse | null> => {
  try {
    const query = `
      query GetSermonById($id: ID!) {
        sermon(id: $id) {
          data {
            id
            attributes {
              titulo
              url_youtube
              url_facebook
              type
              descriptions
              activo
              createdAt
              updatedAt
              publishedAt
            }
          }
        }
      }
    `;

    console.log('🚀 Buscando sermón por ID:', id);

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

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const sermon = response.data.data.sermon.data;
    
    if (!sermon) {
      console.log('❌ No se encontró sermón con ID:', id);
      return null;
    }

    // Usar el mapper para convertir el sermón encontrado
    const mappedSermon = SermonMappers.fromStrapiGraphQLToEntity(sermon);
    
    console.log('✨ Sermón encontrado:', mappedSermon);
    return mappedSermon;

  } catch (error) {
    console.error("Error fetching sermon by ID:", error);
    throw error;
  }
};