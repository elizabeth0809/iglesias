"use client";

import { CalendarIcon, Play, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Interface para sermões (ajuste conforme sua estrutura de dados)
interface ISermonResponse {
  id: number;
  titulo: string;
  descripcion: string;
  url_youtube: string;
  youtube_thumbnail: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  slug?: string; // Se você tem slug para URLs amigáveis
}

interface SermonesListComponentProps {
  sermones: ISermonResponse[];
}

export function SermonesListComponent({ sermones }: SermonesListComponentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = extractYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/placeholder.svg';
  };

  if (!sermones || sermones.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sermões
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre inspiração e ensinamentos bíblicos através dos nossos sermões
            </p>
          </div>

          {/* Estado vazio */}
          <div className="text-center py-12">
            <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum sermão disponível
            </h3>
            <p className="text-gray-500">
              Os sermões aparecerão aqui quando estiverem disponíveis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sermões
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre inspiração e ensinamentos bíblicos através dos nossos sermões
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {sermones.length} sermã{sermones.length !== 1 ? 'o' : 'o'} disponível{sermones.length !== 1 ? 'eis' : ''}
            </span>
          </div>
        </div>

        {/* Grid de sermões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sermones.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              {/* Thumbnail do vídeo */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={sermon.youtube_thumbnail || getYouTubeThumbnail(sermon.url_youtube)}
                  alt={sermon.titulo}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                
                {/* Overlay com botão de play */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                  <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                
                {/* Badge de status */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                      sermon.activo
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {sermon.activo ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                  {sermon.titulo}
                </h3>
                
                <div className="flex items-center text-gray-500 mb-3">
                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">
                    {formatDate(sermon.created_at)}
                  </span>
                </div>
                
                {sermon.descripcion && (
                  <p className="text-gray-600 line-clamp-3 mb-4 text-sm min-h-[4.5rem]">
                    {sermon.descripcion}
                  </p>
                )}
                
                {/* Ações */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a
                    href={sermon.url_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-300 group/link"
                  >
                    <Play className="h-4 w-4 mr-1 group-hover/link:scale-110 transition-transform" />
                    Ver sermão
                  </a>
                  
                  <a
                    href={sermon.url_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    title="Abrir no YouTube"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Gostaria de receber notificações?
            </h3>
            <p className="text-gray-600 mb-6">
              Inscreva-se para receber notificações quando publicarmos novos sermões
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}