import axios from "axios";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { BlogMappers } from "@/insfractucture/mappers/blogs/blogs.mappers";

const strapiGraphQLURL = process.env.NEXT_PUBLIC_API_URL_GRAPHQL || "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

interface BlogGraphQLProps {
  page?: number;
  pageSize?: number;
}

// Respuesta del action que incluye blogs mapeados y paginación
interface BlogGraphQLActionResponse {
  blogs: IBlogResponse[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export const blogGetSpanishGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: BlogGraphQLProps): Promise<BlogGraphQLActionResponse> => {
  try {
    const query = `
      query GetBlogsInSpanish($page: Int, $pageSize: Int) {
        blogs(locale: "es", pagination: { page: $page, pageSize: $pageSize }) {
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

    console.log('🇪🇸 Cargando blogs en español...');

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

    console.log('✅ Blogs en español cargados:', response.data.data.blogs.data.length);

    const mappedResponse = BlogMappers.fromStrapiGraphQLResponseToEntity(response.data);
    return mappedResponse;
  } catch (error) {
    console.error("Error fetching Spanish blog data from GraphQL:", error);
    throw error;
  }
};


export const blogGetAllGraphQLAction = async ({
  page = 1,
  pageSize = 10,
}: BlogGraphQLProps): Promise<BlogGraphQLActionResponse> => {
  try {
    const query = `
      query GetBlogs($page: Int, $pageSize: Int) {
        blogs(pagination: { page: $page, pageSize: $pageSize }) {
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

 
    const mappedResponse = BlogMappers.fromStrapiGraphQLResponseToEntity(response.data);
    
  

    return mappedResponse;
  } catch (error) {
    console.error("Error fetching blog data from GraphQL:", error);
    throw error;
  }
};
export const blogGetBySlugSpanishGraphQLAction = async ({
  slug
}: { slug: string }): Promise<BlogGraphQLActionResponse> => {
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
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("GraphQL query failed");
    }

    // Verificar si encontró el blog
    if (!response.data.data.blogs.data.length) {
      throw new Error(`Blog en español con slug "${slug}" no encontrado`);
    }

    console.log(`✅ Blog en español encontrado: "${response.data.data.blogs.data[0].attributes.name}"`);

    const mappedResponse = BlogMappers.fromStrapiGraphQLResponseToEntity(response.data);
    return mappedResponse;
  } catch (error) {
    console.error(`Error fetching Spanish blog by slug (${slug}):`, error);
    throw error;
  }
};


// Action simplificado que devuelve solo el array de blogs (sin paginación)
export const blogGetAllGraphQLSimpleAction = async (): Promise<IBlogResponse[]> => {
  try {
    const query = `
      query {
        blogs {
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

    // Usar el mapper para convertir solo los blogs
    const mappedBlogs = BlogMappers.fromStrapiGraphQLArrayToEntity(response.data.data.blogs.data);

    return mappedBlogs;
  } catch (error) {
    console.error("Error fetching blog data from GraphQL:", error);
    throw error;
  }
};