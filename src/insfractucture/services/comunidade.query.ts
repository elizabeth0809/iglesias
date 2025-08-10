// @/infrastructure/services/comunidades-querys.ts

import { useQuery } from "@tanstack/react-query";
import { comunidadesGetAllGraphQLAction } from "../actions/comunidade/comundade.actions";

interface ImagenComunidadesQueryParams {
  page?: number;
  pageSize?: number;
}

export const GetAllImagenComunidadesQuery = (
  params: ImagenComunidadesQueryParams = { page: 1, pageSize: 10 }
) => {
  const query = useQuery({
    queryKey: ["allImagenComunidades", params.page, params.pageSize],
    queryFn: () => comunidadesGetAllGraphQLAction({
      page: params.page,
      pageSize: params.pageSize
    }),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
  return query;
};