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

  useEffect(() => {
    if (data) {
      setImagenEventos(data);
    }
  }, [data, refetch]);

  return {
    imagenEventos,
    error,
    isLoading,
    refetch,
  };
};
