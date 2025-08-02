
export interface IImagenEventoResponse {
  id: string;
  titulo: string;
  descriptions: string;
  evento: {
    id: string;
    slug: string;
  };
  imagenes: IImagenFile[];
  videosimple: IImagenFile[];
}

export interface IImagenFile {
  id: string;
  name: string;
  url: string;
}


export interface IStrapiImagenEventoGraphQL {
  id: string;
  attributes: {
    titulo: string;
    descriptions: string;
    evento: {
      data: {
        id: string;
        attributes: {
          slug: string;
        };
      };
    };
    imagenes: {
      data: Array<{
        id: string;
        attributes: {
          name: string;
          url: string;
        };
      }>;
    };
    videosimple: {
      data: Array<{
        id: string;
        attributes: {
          name: string;
          url: string;
        };
      }>;
    };
  };
}