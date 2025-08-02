import { IImagenEventoResponse } from "@/insfractucture/interfaces/eventos/imagenes-for-eventos.interfaces";
import { GetImagenEventosBySlugQuery } from "@/insfractucture/services/eventos-querys";
import { useEffect, useState } from "react";
interface ImagenEventosHooksParams {
  slug: string;
}
export const ImagenEventosHooks = (params: ImagenEventosHooksParams) => {
  const { data, error, isLoading, refetch } =
    GetImagenEventosBySlugQuery(params);
  const [imagenEventos, setImagenEventos] = useState<IImagenEventoResponse[]>();

  console.log(imagenEventos, "imagenEventos");
  useEffect(() => {
    if (data) {
      setImagenEventos(data);
    }
  }, [data, refetch]);
  console.log(data, "data");
  return {
    imagenEventos,
    error,
    isLoading,
    refetch,
  };
};
