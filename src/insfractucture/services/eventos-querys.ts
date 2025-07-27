import { useQuery } from "@tanstack/react-query";
import { imagenEventoGetBySlugGraphQLAction } from "../actions/eventos/graphql/get-imagens-do-eventos-for-slug.actions";

interface ImagenEventosQueryParams {
  slug: string;
}

export const GetImagenEventosBySlugQuery = (
  params: ImagenEventosQueryParams
) => {
  const query = useQuery({
    queryKey: ["imagenEventos", params.slug],
    queryFn: () => imagenEventoGetBySlugGraphQLAction(params.slug),
    staleTime: 1000 * 60 * 5, 
    enabled: !!params.slug, 
  });
  return query;
};
