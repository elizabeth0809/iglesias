import axios from "axios";

import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { EventoMappers } from "@/insfractucture/mappers/eventos/eventos.mappers";
import { BlogMappers } from "@/insfractucture/mappers/blogs/blogs.mappers";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

// ===== EVENTOS POR SLUG =====




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
    
   
    return mappedBlog;

  } catch (error) {
  
    throw error;
  }
};


export const blogGetBySlugSpanishGraphQLAction = async (slug: string): Promise<IBlogResponse | null> => {
  try {
    const query = `
      query GetBlogBySlugSpanish($slug: String!) {
        blogs(locale: "es", filters: { slug: { eq: $slug } }) {
          data {
            id
            attributes {
              name
              slug
              description
              content
              locale
              publishedAt
              createdAt
              updatedAt
              localizations {
                data {
                  id
                  attributes {
                    locale
                    name
                    slug
                  }
                }
              }
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

    console.log(`🇪🇸 Cargando blog individual en español por slug: ${slug}`);

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
      console.log(`❌ No se encontró blog en español con slug: ${slug}`);
      return null;
    }

    // Usar el mapper para convertir el blog encontrado (igual que tu action actual)
    const mappedBlog = BlogMappers.fromStrapiGraphQLToEntity(blogs[0]);
            
    console.log(`✅ Blog en español encontrado: "${mappedBlog.title}"`);
    
    return mappedBlog;

  } catch (error) {
    console.error(`Error fetching Spanish blog by slug (${slug}):`, error);
    throw error;
  }
};