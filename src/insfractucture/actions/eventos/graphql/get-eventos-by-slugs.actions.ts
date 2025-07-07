import axios from "axios";

import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { EventoMappers } from "@/insfractucture/mappers/eventos/eventos.mappers";
import { BlogMappers } from "@/insfractucture/mappers/blogs/blogs.mappers";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

const strapiGraphQLURL = "http://localhost:1337/graphql";

// ===== EVENTOS POR SLUG =====

interface IStrapiGraphQLEventoBySlugResponse {
  data: {
    eventos: {
      data: IStrapiGraphQLEventoData[];
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

export const eventoGetBySlugGraphQLAction = async (slug: string): Promise<IEventoResponse | null> => {
  try {
    const query = `
      query GetEventoBySlug($slug: String!) {
        eventos(filters: { slug: { eq: $slug } }) {
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

    console.log('🚀 Buscando evento por slug:', slug);

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

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const eventos = response.data.data.eventos.data;
    
    if (eventos.length === 0) {
      console.log('❌ No se encontró evento con slug:', slug);
      return null;
    }

    // Usar el mapper para convertir el evento encontrado
    const mappedEvento = EventoMappers.fromStrapiGraphQLToEntity(eventos[0]);
    
    console.log('✨ Evento encontrado:', mappedEvento);
    return mappedEvento;

  } catch (error) {
    console.error("Error fetching evento by slug:", error);
    throw error;
  }
};

// ===== BLOGS POR SLUG =====

interface IStrapiGraphQLBlogBySlugResponse {
  data: {
    blogs: {
      data: IStrapiGraphQLBlogData[];
    };
  };
}

interface IStrapiGraphQLBlogData {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description: string;
    content: string;
    publishedAt: string;
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
    category?: {
      data?: {
        id: string;
        attributes: {
          name: string;
        };
      };
    };
  };
}

export const blogGetBySlugGraphQLAction = async (slug: string): Promise<IBlogResponse | null> => {
  try {
    const query = `
      query GetBlogBySlug($slug: String!) {
        blogs(filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              name
              slug
              description
              content
              publishedAt
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
              category {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    console.log('🚀 Buscando blog por slug:', slug);

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

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    const blogs = response.data.data.blogs.data;
    
    if (blogs.length === 0) {
      console.log('❌ No se encontró blog con slug:', slug);
      return null;
    }

    // Usar el mapper para convertir el blog encontrado
    const mappedBlog = BlogMappers.fromStrapiGraphQLToEntity(blogs[0]);
    
    console.log('✨ Blog encontrado:', mappedBlog);
    return mappedBlog;

  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};