"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/fotos/iglesia1.jpeg",
  "/fotos/iglesia2.jpeg",
  "/fotos/iglesia3.jpeg",
  "/fotos/iglesia4.jpeg",
  "/fotos/iglesia5.jpeg",
  "/fotos/iglesia6.jpeg",
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3); // Por defecto en desktop

  // Ajusta el número de imágenes visibles según el tamaño de la pantalla
  useEffect(() => {
    const updateVisibleImages = () => {
      if (window.innerWidth < 768) {
        setVisibleImages(1); // Móvil
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2); // Tablet
      } else {
        setVisibleImages(3); // Desktop
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
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
    
        
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="px-4 flex-shrink-0"
                style={{ width: `${100 / visibleImages}%` }}
              >
                <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={image}
                    alt={`Iglesia ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          {images.length > visibleImages && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white transition z-10 shadow-lg border-white/50"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white transition z-10 shadow-lg border-white/50"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Indicadores */}
          {images.length > visibleImages && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {Array.from({ length: images.length - (visibleImages - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition shadow-lg ${
                      index === currentIndex ? "bg-blue-600" : "bg-white/80"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}