// @/app/comunidades/[slug]/components/SingleComunidadeComponent.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, Heart, Share2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IComunidadeResponse } from '@/insfractucture/interfaces/comunidade/comunidades.interfaces';


interface SingleComunidadeComponentProps {
  comunidade: IComunidadeResponse;
}

export const SingleComunidadeComponent = ({ comunidade }: SingleComunidadeComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Función para detectar si el archivo es video
  const isVideoFile = (url: string) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext));
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return '';
    
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: comunidade.name,
          text: comunidade.description.slice(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar URL al clipboard
      navigator.clipboard.writeText(window.location.href);
      // Aquí podrías mostrar un toast de "Link copiado"
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-church-sky-200 rounded w-32 mb-8 animate-pulse"></div>
            <div className="h-96 bg-church-sky-200 rounded-2xl mb-8 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-church-sky-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-church-sky-100 rounded animate-pulse"></div>
              <div className="h-4 bg-church-sky-100 rounded w-5/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Botão Voltar */}
          <div className={`mb-8 transition-all duration-1000 ease-out ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <Link
              href="/comunidades"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white text-church-blue-700 hover:text-church-blue-900 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-church-sky-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar às Comunidades</span>
            </Link>
          </div>

          {/* Imagem/Video Principal */}
          <div className={`relative mb-8 transition-all duration-1000 ease-out delay-200 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {isVideoFile(comunidade.image) ? (
                // Renderizar video si es un archivo de video
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/placeholder.svg" // Imagen placeholder mientras carga el video
                  preload="metadata"
                >
                  <source src={comunidade.image} type="video/mp4" />
                  <source src={comunidade.image} type="video/webm" />
                  <source src={comunidade.image} type="video/ogg" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                // Renderizar imagen si no es video
                <Image
                  src={comunidade.image || "/placeholder.svg"}
                  alt={comunidade.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              )}
              
              {/* Overlay gradient (solo para imágenes, no para videos) */}
              {!isVideoFile(comunidade.image) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              )}
              
              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-church-blue-500/90 text-white shadow-lg backdrop-blur-sm">
                  {isVideoFile(comunidade.image) ? '🎥 Vídeo da Comunidade' : '👥 Nossa Comunidade'}
                </span>
              </div>

              {/* Botão de Compartir */}
              <div className="absolute top-6 right-6">
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Compartilhar"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Indicador de video no canto inferior esquerdo */}
              {isVideoFile(comunidade.image) && (
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/70 text-white shadow-lg backdrop-blur-sm">
                    🎬 Conteúdo em Vídeo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-church-sky-200 transition-all duration-1000 ease-out delay-400 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-church-blue-900 mb-4 leading-tight">
                {comunidade.name}
              </h1>
              
              {/* Meta informações */}
              <div className="flex flex-wrap items-center gap-6 text-church-blue-600">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-church-gold-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-church-gold-600" />
                  </div>
                  <span className="text-sm font-medium">
                    Criado em {formatDate(comunidade.created_at)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-church-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-church-blue-600" />
                  </div>
                  <span className="text-sm font-medium">
                    Comunidade Ativa
                  </span>
                </div>

                {comunidade.updated_at !== comunidade.created_at && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-church-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-church-red-600" />
                    </div>
                    <span className="text-sm font-medium">
                      Atualizado em {formatDate(comunidade.updated_at)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Separador decorativo */}
            <div className="w-24 h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400 rounded-full mb-8"></div>

            {/* Descrição */}
            <div className="prose prose-lg max-w-none">
              <div className="text-church-blue-800 leading-relaxed whitespace-pre-line text-lg">
                {comunidade.description}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t border-church-sky-200">
              <div className="bg-gradient-to-r from-church-blue-50 to-church-sky-50 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-church-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-church-blue-900 mb-2">
                    Faça Parte da Nossa Comunidade
                  </h3>
                  <p className="text-church-blue-600 mb-6">
                    Venha conhecer mais sobre nossa comunidade e participe conosco!
                  </p>
                  <Link
                    href="/contato"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span>Entre em Contato</span>
                    <Heart className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação para outras comunidades */}
          <div className={`mt-8 text-center transition-all duration-1000 ease-out delay-600 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <Link
              href="/comunidades"
              className="inline-flex items-center space-x-2 text-church-blue-600 hover:text-church-blue-800 font-medium transition-colors duration-300"
            >
              <Users className="w-4 h-4" />
              <span>Ver todas as comunidades</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};