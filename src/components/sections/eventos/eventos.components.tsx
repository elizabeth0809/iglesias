"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin } from "lucide-react";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

interface EventosCarouselProps {
  eventos: IEventoResponse[];
}

export function EventosCarousel({ eventos }: EventosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < eventos.length - (visibleItems - 1) ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : eventos.length - visibleItems
    );
  };

  if (!eventos || eventos.length === 0) {
    return (
      <section className="py-16 bg-white container mx-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Próximos Eventos</h2>
          
          <div className="text-center text-gray-500">
            Nenhum evento programado
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Próximos Eventos</h2>
          <Link href="/eventos" className="text-blue-600 hover:text-blue-800 font-medium">
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
            {eventos.map((evento) => (
              <Link
                href={`/eventos/${evento.id}`}
                key={evento.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border">
                    <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                      <Image
                        src={evento.imagem || "/placeholder.svg"}
                        alt={evento.nome}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Badge de status */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                            evento.status === "ativo"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {evento.status === "ativo" ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {evento.nome}
                      </h3>
                      
                      {/* Data e hora */}
                      <div className="flex items-center text-gray-500 mb-2">
                        <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          {formatDate(evento.data_inicio)}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-500 mb-3">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          {formatTime(evento.data_inicio)}
                        </span>
                      </div>

                      {/* Localização */}
                      {evento.localizacao && (
                        <div className="flex items-center text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {evento.localizacao}
                          </span>
                        </div>
                      )}
                      
                      {/* Descrição */}
                      {evento.descricao && (
                        <p className="text-gray-600 line-clamp-3">
                          {evento.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {eventos.length > visibleItems && (
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
          {eventos.length > visibleItems && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: eventos.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex ? "bg-blue-600" : "bg-gray-400"
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
