// @/components/ImageCarousel.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight,  Heart, Play, Users, Loader2, ExternalLink } from "lucide-react";
import { ImagenComunidadesHooks } from "@/hooks/getComunidad.hooks";
import Link from "next/link";

type BackgroundVariant = 'light' | 'dark' | 'gradient' | 'white';

interface ImagenComunidadeGaleriaProps {
  backgroundVariant?: BackgroundVariant;
  page?: number;
  pageSize?: number;
}

export function ImageCarousel({ 
  backgroundVariant = 'gradient',
  page = 1,
  pageSize = 10
}: ImagenComunidadeGaleriaProps) {
  const { imagenComunidades, isLoading, error, hasImages } = ImagenComunidadesHooks({ 
    page, 
    pageSize 
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isDark = backgroundVariant === 'dark';

  // Función para detectar si es video
  const isVideoFile = (url: string) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.m4v', '.3gp'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext));
  };

  useEffect(() => {
    const updateVisibleImages = () => {
      if (window.innerWidth < 768) {
        setVisibleImages(1);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2);
      } else {
        setVisibleImages(3);
      }
    };

    updateVisibleImages();
    window.addEventListener("resize", updateVisibleImages);
    return () => window.removeEventListener("resize", updateVisibleImages);
  }, []);

  const nextImage = () => {
    if (imagenComunidades && imagenComunidades.length > visibleImages) {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < imagenComunidades.length - (visibleImages - 1) ? prevIndex + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (imagenComunidades && imagenComunidades.length > visibleImages) {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : imagenComunidades.length - visibleImages
      );
    }
  };

  // Estado de loading
  if (isLoading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto py-16">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Loader2 className="w-5 h-5 animate-spin text-church-blue-600" />
            <span className="text-church-blue-700 font-medium">Carregando galeria...</span>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto py-16">
        <div className="text-center">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-church-red-200">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-church-red-600" />
            </div>
            <h3 className="text-lg font-bold text-church-red-600 mb-2">
              Erro ao carregar galeria
            </h3>
            <p className="text-church-blue-600 text-sm">
              Não foi possível carregar as imagens das comunidades.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Estado sem imagens
  if (!hasImages || !imagenComunidades || imagenComunidades.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto py-16">
        <div className="text-center">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-church-sky-200">
            <div className="w-16 h-16 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-church-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-church-blue-900 mb-2">
              Galeria em breve
            </h3>
            <p className="text-church-blue-600 text-sm">
              As imagens das nossas comunidades aparecerão aqui em breve.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-8">
      {/* Header da galeria */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-church-blue-900 mb-2">
          Galeria das Comunidades
        </h2>
        <p className="text-church-blue-600">
          {imagenComunidades.length} {imagenComunidades.length === 1 ? 'imagem' : 'imagens'} de todas as nossas comunidades
        </p>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
        }}
      >
        {imagenComunidades.map((comunidade, index) => (
          <div
            key={comunidade.id}
            className="px-4 flex-shrink-0"
            style={{ width: `${100 / visibleImages}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={`/comunidade/${comunidade.slug}`} className="block">
              <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl group cursor-pointer">
                {isVideoFile(comunidade.image) ? (
                  // Renderizar video con estilo YouTube - Solo fondo de color
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                    {/* Patrón de fondo sutil */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-transparent"></div>
                    </div>
                    
                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Botão de play estilo YouTube */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                        <Play className="w-16 h-16 text-white ml-2" fill="currentColor" />
                      </div>
                    </div>

                    {/* Barra de duração falsa estilo YouTube */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/60 h-1 rounded-full">
                        <div className="bg-red-600 h-1 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000"></div>
                      </div>
                    </div>

                    {/* Badge de duração */}
                    <div className="absolute bottom-6 right-6">
                      <span className="bg-black/80 text-white px-3 py-2 rounded text-sm font-medium">
                        📹 Vídeo
                      </span>
                    </div>

                    {/* Overlay com mensagem em português */}
                    <div className="absolute top-6 left-6 right-6">
                      <div className="bg-red-600/95 backdrop-blur-sm rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm text-center">
                          🎬 Clique para assistir o vídeo completo
                        </p>
                      </div>
                    </div>

                    {/* Ícones decorativos no fundo */}
                    <div className="absolute inset-0 pointer-events-none opacity-5">
                      <div className="absolute top-1/4 left-1/4 transform -rotate-12">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 transform rotate-12">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute top-1/3 right-1/3 transform rotate-45">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Renderizar imagen normal
                  <Image
                    src={comunidade.image || "/placeholder.svg"}
                    alt={comunidade.name || `Imagem da comunidade ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    priority={index < 3}
                  />
                )}

                {/* Overlay gradient (solo para imágenes) */}
                {!isVideoFile(comunidade.image) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                {/* Badge de comunidad */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-church-blue-500 text-white shadow-lg backdrop-blur-sm">
                    👥 {comunidade.name}
                  </span>
                </div>

                {/* Badge de tipo de archivo - Solo para imágenes */}
                {!isVideoFile(comunidade.image) && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-church-gold-500 text-white shadow-lg backdrop-blur-sm">
                      <span className="flex items-center space-x-1">
                        <span>📸</span>
                        <span className="hidden sm:inline">Foto</span>
                      </span>
                    </span>
                  </div>
                )}

                {/* Información del contenido */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                      {comunidade.name}
                    </h3>
                    {comunidade.description && (
                      <p className="text-white/90 text-xs line-clamp-2">
                        {comunidade.description.slice(0, 100)}...
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-church-gold-400 text-xs font-medium">
                        Ver detalhes
                      </span>
                      <ExternalLink className="w-3 h-3 text-church-gold-400" />
                    </div>
                  </div>
                </div>

                {/* Border decorativo animado */}
                <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'border-church-gold-400 shadow-lg shadow-church-gold-400/25' 
                    : 'border-transparent'
                }`}></div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {imagenComunidades.length > visibleImages && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-1/2 left-2 transform -translate-y-1/2 transition-all duration-300 z-10 shadow-xl ${
              isDark 
                ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
                : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
            }`}
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-1/2 right-2 transform -translate-y-1/2 transition-all duration-300 z-10 shadow-xl ${
              isDark 
                ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
                : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
            }`}
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicadores */}
      {imagenComunidades.length > visibleImages && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {Array.from({ length: imagenComunidades.length - (visibleImages - 1) }).map(
            (_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                  index === currentIndex 
                    ? "bg-church-gold-500 scale-125 shadow-church-gold-500/50" 
                    : isDark 
                      ? "bg-church-blue-300 hover:bg-church-gold-400" 
                      : "bg-church-sky-300 hover:bg-church-gold-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            )
          )}
        </div>
      )}

      {/* Contador de imágenes */}
      <div className={`absolute bottom-6 right-6 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${
        isDark 
          ? 'bg-church-blue-800/80 text-church-sky-200' 
          : 'bg-white/80 text-church-blue-700'
      }`}>
        <span className="text-sm font-medium">
          {currentIndex + 1} de {imagenComunidades.length}
        </span>
      </div>
    </div>
  );
}