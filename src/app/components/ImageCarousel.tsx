"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://picsum.photos/400/250?random=1",
  "https://picsum.photos/400/250?random=2",
  "https://picsum.photos/400/250?random=3",
  "https://picsum.photos/400/250?random=4",
  "https://picsum.photos/400/250?random=5",
  "https://picsum.photos/400/250?random=6",
  "https://picsum.photos/400/250?random=7",
  "https://picsum.photos/400/250?random=8",
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
      prevIndex + 1 < images.length ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`px-2 flex-shrink-0`}
            style={{ width: `${100 / visibleImages}%` }}
          >
            <Image
              src={image}
              alt={`Imagen ${index + 1}`}
              width={400}
              height={250}
              className="rounded-lg w-full"
              priority
            />
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition"
        onClick={prevImage}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition"
        onClick={nextImage}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: images.length - (visibleImages - 1) }).map(
          (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-primary" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        )}
      </div>
    </div>
  );
}
