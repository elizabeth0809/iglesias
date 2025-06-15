
"use client"
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Play } from "lucide-react";
import { SermonsResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";

interface SermonesCarouselProps {
  sermones: SermonsResponse[];
}

export function SermonesCarousel({ sermones }: SermonesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1); // Móvil
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet
      } else {
        setVisibleItems(3); // Desktop
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Últimos Sermones</h2>
          <div className="text-center text-gray-500">
            No hay sermones disponibles
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimos Sermones</h2>
          <Link href="/sermones" className="text-red-600 hover:text-red-800 font-medium">
            Ver todos →
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {sermones.map((sermon ) => (
              <div
                key={sermon.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  {/* Thumbnail del video de YouTube */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={sermon.youtube_thumbnail}
                      alt={sermon.titulo}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    
                    {/* Overlay con botón de play */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={sermon.url_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-colors duration-300"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </a>
                    </div>
                    
                    {/* Badge de estado */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                          sermon.activo
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {sermon.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido del card */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {sermon.titulo}
                    </h3>
                    
                    <div className="flex items-center text-gray-500 mb-3">
                      <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {formatDate(sermon.created_at)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {sermon.descripcion}
                    </p>
                    
                    {/* Acciones */}
                    <div className="flex items-center justify-between">
                      <a
                        href={sermon.url_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-300"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Ver en YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          {sermones.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicadores */}
          {sermones.length > visibleItems && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: sermones.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex ? "bg-red-600" : "bg-gray-400"
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