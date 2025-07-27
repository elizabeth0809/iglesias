"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Calendar, ChevronLeft, ChevronRight, Expand, ImageIcon } from "lucide-react";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";
import { ImagenEventosHooks } from "@/hooks/getImagenEventos.hooks";

interface ImagenEventoGaleriaProps extends BackgroundVariantProps {
  eventoSlug: string;
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-church-blue-900">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 text-church-blue-800">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-medium mb-2 text-church-blue-700">{children}</h3>,
  p: ({ children }) => <p className="mb-4 text-church-blue-600 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-church-blue-600">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-church-blue-600">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-church-blue-800">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-church-gold-400 pl-4 italic my-4 text-church-blue-700 bg-church-gold-50 py-2 rounded-r">
      {children}
    </blockquote>
  ),
};

export const ImagenEventoGaleria = ({ 
  eventoSlug,
  backgroundVariant = 'gradient' 
}: ImagenEventoGaleriaProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImagenEvento, setCurrentImagenEvento] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { background, text, subtext, isDark, overlay } = getVariantClasses(backgroundVariant);
  const { imagenEventos, error, isLoading } = ImagenEventosHooks({ slug: eventoSlug });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const nextImagenEvento = () => {
    if (imagenEventos && currentImagenEvento < imagenEventos.length - 1) {
      setCurrentImagenEvento(currentImagenEvento + 1);
      setCurrentImageIndex(0);
    }
  };

  const prevImagenEvento = () => {
    if (currentImagenEvento > 0) {
      setCurrentImagenEvento(currentImagenEvento - 1);
      setCurrentImageIndex(0);
    }
  };

  const nextImage = () => {
    const currentImages = imagenEventos?.[currentImagenEvento]?.imagenes || [];
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < currentImages.length - (visibleImages - 1) ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    const currentImages = imagenEventos?.[currentImagenEvento]?.imagenes || [];
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : currentImages.length - visibleImages
    );
  };

  if (isLoading) {
    return (
      <section className={`py-20 ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-gold-500 mx-auto mb-4"></div>
            <p className={`${subtext}`}>Carregando galeria...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-church-red-600" />
            </div>
            <p className="text-church-red-600 text-lg">
              Erro ao carregar a galeria de imagens.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!imagenEventos || imagenEventos.length === 0) {
    return (
      <section className={`py-20 ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-church-blue-600" />
            </div>
            <p className="text-church-blue-600 text-lg">
              Não há imagens disponíveis para este evento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentImagenEventoData = imagenEventos[currentImagenEvento];
  const currentImages = currentImagenEventoData?.imagenes || [];

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoração de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-gold-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-blue-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              <Camera className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            Galeria do Evento
            <br />
            <span className="text-church-gold-500">{currentImagenEventoData.titulo}</span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${subtext}`}>
            Momentos especiais capturados durante este evento de fé e comunhão
          </p>

          {/* Navegación entre ImagenEventos */}
          {imagenEventos.length > 1 && (
            <div className={`flex justify-center items-center space-x-4 mt-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <Button
                variant="outline"
                size="sm"
                onClick={prevImagenEvento}
                disabled={currentImagenEvento === 0}
                className={`${isDark ? 'border-church-sky-400 text-church-sky-200' : 'border-church-blue-400'}`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              
              <div className={`px-4 py-2 rounded-full ${overlay}`}>
                <span className="text-sm font-medium">
                  {currentImagenEvento + 1} de {imagenEventos.length} coleções
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextImagenEvento}
                disabled={currentImagenEvento === imagenEventos.length - 1}
                className={`${isDark ? 'border-church-sky-400 text-church-sky-200' : 'border-church-blue-400'}`}
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Descripción del ImagenEvento actual */}
        {currentImagenEventoData.descriptions && (
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className={`rounded-2xl p-8 ${overlay} shadow-lg`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {typeof currentImagenEventoData.descriptions === 'string' 
                  ? currentImagenEventoData.descriptions 
                  : JSON.stringify(currentImagenEventoData.descriptions)
                }
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Carousel de imágenes */}
        {currentImages.length > 0 && (
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
          }`}>
            <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentImageIndex * (100 / visibleImages)}%)`,
                }}
              >
                {currentImages.map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className="px-4 flex-shrink-0"
                    style={{ width: `${100 / visibleImages}%` }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
                      <Image
                        src={imagen.url}
                        alt={imagen.name || `Imagem ${index + 1} - ${currentImagenEventoData.titulo}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        priority={index < 3}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute top-4 left-4 w-12 h-12 bg-church-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="icon"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
                          variant="outline"
                        >
                          <Expand className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                          <h3 className="font-semibold text-church-blue-900 mb-1">
                            {currentImagenEventoData.titulo}
                          </h3>
                          
                        </div>
                      </div>

                      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                        hoveredIndex === index 
                          ? 'border-church-gold-400 shadow-lg shadow-church-gold-400/25' 
                          : 'border-transparent'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navegación de imágenes */}
              {currentImages.length > visibleImages && (
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
              {currentImages.length > visibleImages && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {Array.from({ length: currentImages.length - (visibleImages - 1) }).map(
                    (_, index) => (
                      <button
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                          index === currentImageIndex 
                            ? "bg-church-gold-500 scale-125 shadow-church-gold-500/50" 
                            : isDark 
                              ? "bg-church-blue-300 hover:bg-church-gold-400" 
                              : "bg-church-sky-300 hover:bg-church-gold-400"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    )
                  )}
                </div>
              )}

              {/* Contador de imágenes */}
              <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${
                isDark 
                  ? 'bg-church-blue-800/80 text-church-sky-200' 
                  : 'bg-white/80 text-church-blue-700'
              }`}>
                <span className="text-sm font-medium">
                  {currentImageIndex + 1} de {currentImages.length - (visibleImages - 1)} grupos
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${overlay}`}>
            <Calendar className={`w-5 h-5 ${
              isDark ? 'text-church-sky-300' : 'text-church-blue-600'
            }`} />
            <p className={`text-sm font-medium ${subtext}`}>
              Momentos eternos de nossa jornada de fé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};