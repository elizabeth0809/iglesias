"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Expand, Heart } from "lucide-react";

const images = [
  "/fotos/image1.jpeg",
  "/fotos/image2.jpeg",
  "/fotos/image3.jpeg",
  "/fotos/image4.jpeg",
  "/fotos/image5.jpeg",
  "/fotos/image6.jpeg",
    "/fotos/image7.jpeg",
     "/fotos/image8.jpeg",
];

type BackgroundVariant = 'light' | 'dark' | 'gradient' | 'white';

interface ImageCarouselProps {
  backgroundVariant?: BackgroundVariant;
}

export function ImageCarousel({ backgroundVariant = 'gradient' }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isDark = backgroundVariant === 'dark';

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
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < images.length - (visibleImages - 1) ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - visibleImages
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="px-4 flex-shrink-0"
            style={{ width: `${100 / visibleImages}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
              {/* Imagen principal */}
              <Image
                src={image}
                alt={`Comunidade da Igreja ${index + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                priority={index < 3}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Decoración de esquina */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-church-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                <Heart className="w-6 h-6 text-white" />
              </div>

              {/* Botón de expansión */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
                  variant="outline"
                >
                  <Expand className="w-4 h-4" />
                </Button>
              </div>

              {/* Información en hover */}
            

              {/* Border decorativo animado */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'border-church-gold-400 shadow-lg shadow-church-gold-400/25' 
                  : 'border-transparent'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación mejorados */}
      {images.length > visibleImages && (
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

      {/* Indicadores mejorados */}
      {images.length > visibleImages && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {Array.from({ length: images.length - (visibleImages - 1) }).map(
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

      {/* Número de imagen actual */}
      <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${
        isDark 
          ? 'bg-church-blue-800/80 text-church-sky-200' 
          : 'bg-white/80 text-church-blue-700'
      }`}>
        <span className="text-sm font-medium">
          {currentIndex + 1} de {images.length - (visibleImages - 1)}
        </span>
      </div>
    </div>
  );
}