import { IImagenEventoResponse, IImagenFile, IStrapiImagenEventoGraphQL } from "@/insfractucture/interfaces/eventos/imagenes-for-eventos.interfaces";

export class ImagenEventoMappers {
  static fromStrapiGraphQLToEntity(strapiData: IStrapiImagenEventoGraphQL): IImagenEventoResponse {
    return {
      id: strapiData.id,
      titulo: strapiData.attributes.titulo,
      descriptions: strapiData.attributes.descriptions,
      evento: {
        id: strapiData.attributes.evento.data.id,
        slug: strapiData.attributes.evento.data.attributes.slug,
      },
      imagenes: strapiData.attributes.imagenes.data.map((imagen): IImagenFile => ({
        id: imagen.id,
        name: imagen.attributes.name,
        url: imagen.attributes.url,
      })),
    };
  }
}