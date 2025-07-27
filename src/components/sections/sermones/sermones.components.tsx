"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Play, Volume2, Heart, Users, ArrowRight, Video } from "lucide-react";
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";

interface SermonesCarouselProps extends BackgroundVariantProps {
  sermones: SermonResponse[];
}

export function SermonesCarousel({ sermones, backgroundVariant = 'gradient' }: SermonesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);

  const { background, text, subtext, isDark, buttons, card } = getVariantClasses(backgroundVariant);

  useEffect(() => {
    setIsLoaded(true);
    
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para verificar si la thumbnail es válida
  const hasValidThumbnail = (thumbnailUrl: string | null | undefined): boolean => {
    return !!(thumbnailUrl && thumbnailUrl.trim() !== '');
  };

  // Función para generar thumbnail por defecto basada en el título
  // const generateDefaultThumbnail = (title: string): string => {
  //   // Podrías usar un servicio como placeholder.com o crear una imagen dinámica
  //   const encodedTitle = encodeURIComponent(title.substring(0, 50));
  //   return `https://via.placeholder.com/640x480/1e40af/ffffff?text=${encodedTitle}`;
  // };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < sermones.length - (visibleItems - 1) ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : sermones.length - visibleItems
    );
  };

  if (!sermones || sermones.length === 0) {
    return (
      <section className={`py-20 ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-church-red-100 rounded-full mb-4">
              <Volume2 className="w-8 h-8 text-church-red-600" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${text}`}>Últimos Sermões</h2>
            <p className={`text-lg ${subtext}`}>
              Nenhum sermão disponível no momento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-red-400 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-church-gold-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-blue-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header mejorado */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="relative bg-church-red-500 rounded-full p-4 shadow-xl">
              <Volume2 className="w-8 h-8 text-white" />
              {/* Decoraciones flotantes */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Play className="w-3 h-3 text-white fill-current" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold ${text}`}>
                Últimos
                <span className="text-church-red-500 ml-2">Sermões</span>
              </h2>
              <p className={`text-lg ${subtext} mt-2`}>
                Mensagens que transformam vidas e fortalecem a fé
              </p>
            </div>
          </div>
          
          <Link 
            href="/sermones" 
            className={`group relative px-6 py-3 ${buttons.primary} font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
          >
            <span className="relative z-10 flex items-center">
              Ver todos
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        {/* Stats inspiracionais */}
        <div className={`flex justify-center items-center space-x-8 mb-16 transition-all duration-1000 ease-out delay-300 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-church-red-600' : 'bg-church-red-200'
            }`}>
              <Volume2 className={`w-6 h-6 ${
                isDark ? 'text-white' : 'text-church-red-600'
              }`} />
            </div>
            <p className={`text-sm font-medium ${subtext}`}>
              Palavra Viva
            </p>
          </div>

          <div className="w-px h-12 bg-church-gold-300"></div>

          <div className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-church-gold-600' : 'bg-church-gold-200'
            }`}>
              <Play className={`w-6 h-6 ${
                isDark ? 'text-white' : 'text-church-gold-600'
              } fill-current`} />
            </div>
            <p className={`text-sm font-medium ${subtext}`}>
              Sempre Disponível
            </p>
          </div>

          <div className="w-px h-12 bg-church-gold-300"></div>

          <div className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-church-blue-600' : 'bg-church-blue-200'
            }`}>
              <Users className={`w-6 h-6 ${
                isDark ? 'text-white' : 'text-church-blue-600'
              }`} />
            </div>
            <p className={`text-sm font-medium ${subtext}`}>
              Para Toda Família
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {sermones.map((sermon, index) => (
              <div
                key={sermon.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className={`transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${card} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border group relative`}>
                    {/* Línea decorativa superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-red-400 via-church-gold-400 to-church-red-400"></div>
                    
                    {/* Thumbnail do vídeo */}
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
                      {hasValidThumbnail(sermon.youtube_thumbnail) ? (
                        <Image
                          src={sermon.youtube_thumbnail}
                          alt={sermon.titulo}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onError={(e) => {
                            // Si la imagen falla al cargar, mostrar el placeholder
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentNode?.querySelector('.fallback-thumbnail');
                            if (fallback) {
                              (fallback as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback cuando no hay thumbnail o falla la carga */}
                      <div 
                        className={`fallback-thumbnail absolute inset-0 bg-gradient-to-br from-church-blue-600 to-church-red-600 flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:scale-110 ${
                          hasValidThumbnail(sermon.youtube_thumbnail) ? 'hidden' : 'flex'
                        }`}
                      >
                        <Video className="w-16 h-16 mb-4 opacity-80" />
                        <h4 className="text-lg font-bold text-center px-4 leading-tight">
                          {sermon.titulo}
                        </h4>
                        <p className="text-sm opacity-75 mt-2">
                          Clique para assistir
                        </p>
                      </div>
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Botão de play central */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <a
                          href={sermon.url_youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-church-red-500 hover:bg-church-red-600 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 shadow-2xl backdrop-blur-sm"
                        >
                          <Play className="h-8 w-8 fill-current ml-1" />
                        </a>
                      </div>
                      
                      {/* Badge de status */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                            sermon.activo
                              ? "bg-church-gold-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {sermon.activo ? "🔴 Ao Vivo" : "⏸️ Arquivado"}
                        </span>
                      </div>

                      {/* Duração estimada */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          <Play className="w-3 h-3 text-white fill-current" />
                          {/* <span className="text-xs text-white font-medium">~45 min</span> */}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do card */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-church-blue-900'
                      } group-hover:text-church-red-500 transition-colors duration-300 line-clamp-2 leading-tight`}>
                        {sermon.titulo}
                      </h3>
                      
                      {/* Data com ícone melhorado */}
                      <div className={`flex items-center mb-4 ${
                        isDark ? 'text-church-sky-300' : 'text-church-blue-600'
                      }`}>
                        <div className="flex items-center justify-center w-8 h-8 bg-church-red-100 rounded-lg mr-3">
                          <CalendarIcon className="h-4 w-4 text-church-red-600" />
                        </div>
                        <span className="text-sm font-medium">
                          {formatDate(sermon.created_at)}
                        </span>
                      </div>
                      
                      {/* Descrição */}
                      <p className={`${
                        isDark ? 'text-church-sky-200' : 'text-church-blue-700'
                      } line-clamp-3 leading-relaxed mb-4`}>
                        {sermon.descripcion}
                      </p>
                      
                      {/* Call to action */}
                      <div className="pt-4 border-t border-church-sky-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={sermon.url_youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-church-red-500 hover:text-church-red-600 font-medium transition-colors duration-300 group/link"
                        >
                          <div className="w-8 h-8 bg-church-red-100 rounded-lg flex items-center justify-center mr-2 group-hover/link:bg-church-red-200 transition-colors duration-300">
                            <Play className="h-4 w-4 text-church-red-600 fill-current" />
                          </div>
                          <span>Assistir no YouTube</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          {sermones.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-all duration-300 shadow-xl z-10 ${buttons.outline}`}
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 shadow-xl z-10 ${buttons.outline}`}
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicadores mejorados */}
          {sermones.length > visibleItems && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {Array.from({ length: sermones.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-church-red-500 scale-125 shadow-lg shadow-church-red-500/50" 
                        : isDark 
                          ? "bg-church-sky-400 hover:bg-church-red-400" 
                          : "bg-church-sky-300 hover:bg-church-red-400"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Stats del sermón */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                {sermones.length}+
              </div>
              <p className={`text-sm ${subtext}`}>
                Sermões Disponíveis
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                🎥
              </div>
              <p className={`text-sm ${subtext}`}>
                Qualidade HD
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                24/7
              </div>
              <p className={`text-sm ${subtext}`}>
                Sempre Disponível
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}