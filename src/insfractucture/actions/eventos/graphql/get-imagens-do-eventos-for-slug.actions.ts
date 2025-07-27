import { IImagenEventoResponse, IStrapiImagenEventoGraphQL } from "@/insfractucture/interfaces/eventos/imagenes-for-eventos.interfaces";
import { ImagenEventoMappers } from "@/insfractucture/mappers/eventos/imagenes-for-eventos.mappers";
import axios from "axios";

const strapiGraphQLURL =
  process.env.NEXT_PUBLIC_API_URL_GRAPHQL ||
  "http://strapi-strapibackend-qgcuz6-1680e6-31-97-168-219.traefik.me/graphql";

export const imagenEventoGetBySlugGraphQLAction = async (
  slug: string
): Promise<IImagenEventoResponse[] | null> => {
  try {
    const query = `
      query GetImagenEventosByEventoSlug($slug: String!) {
        imagenEventos(filters: { evento: { slug: { eq: $slug } } }) {
          data {
            id
            attributes {
              titulo
              descriptions
              evento {
                data {
                  id
                  attributes {
                    slug
                  }
                }
              }
              imagenes {
                data {
                  id
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

    const imagenEventos = response.data.data.imagenEventos.data;

    if (imagenEventos.length === 0) {
      console.log("❌ No se encontraron imágenes de evento con slug:", slug);
      return null;
    }
    const mappedImagenEventos = imagenEventos.map((imagenEvento: IStrapiImagenEventoGraphQL) =>
      ImagenEventoMappers.fromStrapiGraphQLToEntity(imagenEvento)
    );

    console.log("✨ Imágenes de evento encontradas:", mappedImagenEventos);
    return mappedImagenEventos;
  } catch (error) {
    console.error("Error fetching imagen eventos by slug:", error);
    throw error;
  }
};
