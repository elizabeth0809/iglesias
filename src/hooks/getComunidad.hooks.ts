// @/infrastructure/hooks/comunidade/imagenes-comunidades.hooks.ts

import { IComunidadeResponse } from "@/insfractucture/interfaces/comunidade/comunidades.interfaces";
import { GetAllImagenComunidadesQuery } from "@/insfractucture/services/comunidade.query";

import { useEffect, useState } from "react";

interface ImagenComunidadesHooksParams {
  page?: number;
  pageSize?: number;
}

export const ImagenComunidadesHooks = (params: ImagenComunidadesHooksParams = { page: 1, pageSize: 10 }) => {
  const { data, error, isLoading, refetch } = GetAllImagenComunidadesQuery(params);
  const [imagenComunidades, setImagenComunidades] = useState<IComunidadeResponse[]>([]);

  console.log('🖼️ All Imagen Comunidades Hook:', {
    page: params.page,
    pageSize: params.pageSize,
    dataLength: data?.comunidades?.length || 0,
    isLoading,
    error: error?.message
  });

  useEffect(() => {
    if (data?.comunidades) {
      setImagenComunidades(data.comunidades);
      console.log('✅ All comunidades loaded:', data.comunidades.length, 'total comunidades');
    }
  }, [data]);

  return {
    imagenComunidades,
    error,
    isLoading,
    refetch,
    hasImages: (imagenComunidades?.length || 0) > 0
  };
};