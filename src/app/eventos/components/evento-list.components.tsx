'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
import { useEffect, useState } from 'react';

interface EventosListComponentProps {
  eventos: IEventoResponse[];
}

export const EventosListComponent = ({ eventos }: EventosListComponentProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return '';
        
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    if (!mounted) return '';
        
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventUpcoming = (dateString: string) => {
    if (!mounted) return false;
    return new Date(dateString) > new Date();
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Eventos Espirituais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={evento.imagem || "/placeholder.svg"}
                  alt={evento.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {evento.nome}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {evento.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Eventos Espirituais</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Participe dos nossos encontros e eventos especiais. Uma oportunidade de crescimento espiritual e comunhão.
        </p>
      </div>

      {(!eventos || eventos.length === 0) ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum evento disponível
            </h3>
            <p className="text-gray-500">
              Os próximos eventos aparecerão aqui quando estiverem disponíveis.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <Link
              key={evento.id}
              href={`/eventos/${evento.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Imagen del evento */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={evento.imagem || "/placeholder.svg"}
                    alt={evento.nome}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Badge de estado */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      evento.status === 'ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {evento.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>

                  {/* Badge de próximo evento */}
                  {isEventUpcoming(evento.data_inicio) && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Próximo
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Título */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {evento.nome}
                  </h3>

                  {/* Fecha y hora */}
                  <div className="flex items-center text-gray-500 mb-3">
                    <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {formatDate(evento.data_inicio)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 mb-3">
                    <ClockIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {formatTime(evento.data_inicio)}
                    </span>
                  </div>

                  {/* Localización */}
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">
                      {evento.localizacao}
                    </span>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {evento.descricao}
                  </p>

                  {/* Call to action */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};