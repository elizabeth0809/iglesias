'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, ClockIcon, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
import { useEffect, useState } from 'react';

interface EventosListComponentProps {
  eventos: IEventoResponse[];
}

export const EventosListComponent = ({ eventos }: EventosListComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
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
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-church-blue-900">Eventos Espirituais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-church-sky-100 animate-pulse">
                  <div className="w-full h-full bg-church-sky-200"></div>
                </div>
                <div className="p-5">
                  <div className="h-6 bg-church-sky-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-church-sky-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              <CalendarIcon className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-church-blue-900 mb-4">
            Eventos
            <span className="text-church-gold-500 ml-2">Espirituais</span>
          </h1>
          <p className="text-lg md:text-xl text-church-blue-600 max-w-3xl mx-auto leading-relaxed">
            Participe dos nossos encontros e eventos especiais. Uma oportunidade de crescimento espiritual e comunhão em família.
          </p>

          {/* Stats inspiracionais */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                {eventos.length}+
              </div>
              <p className="text-sm text-church-blue-600">
                Eventos Planejados
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                ∞
              </div>
              <p className="text-sm text-church-blue-600">
                Momentos Especiais
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                💝
              </div>
              <p className="text-sm text-church-blue-600">
                Feitos com Amor
              </p>
            </div>
          </div>
        </div>

        {(!eventos || eventos.length === 0) ? (
          <div className={`text-center py-16 transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-church-sky-200">
              <div className="w-20 h-20 bg-church-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="h-10 w-10 text-church-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-church-blue-900 mb-3">
                Nenhum evento disponível
              </h3>
              <p className="text-church-blue-600 leading-relaxed">
                Os próximos eventos aparecerão aqui quando estiverem disponíveis. Fique atento às nossas redes sociais!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map((evento, index) => (
              <div
                key={evento.id}
                className={`transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link
                  href={`/eventos/${evento.slug}`}
                  className="block group"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-3 border border-church-sky-200 relative">
                    {/* Línea decorativa superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
                    
                    {/* Imagen del evento */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={evento.imagem || "/placeholder.svg"}
                        alt={evento.nome}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge de estado mejorado */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                          evento.status === 'ativo' 
                            ? 'bg-church-gold-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {evento.status === 'ativo' ? '✨ Ativo' : '✅ Concluído'}
                        </span>
                      </div>

                      {/* Badge de próximo evento */}
                      {isEventUpcoming(evento.data_inicio) && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-church-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                            🔥 Próximo
                          </span>
                        </div>
                      )}

                      {/* Badge de tiempo restante */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium">Em breve</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      {/* Título */}
                      <h3 className="text-xl font-bold mb-3 text-church-blue-900 group-hover:text-church-gold-600 transition-colors duration-300 line-clamp-2 leading-tight">
                        {evento.nome}
                      </h3>

                      {/* Información con íconos mejorados */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-church-blue-600">
                          <div className="w-8 h-8 bg-church-sky-100 rounded-lg flex items-center justify-center mr-3">
                            <CalendarIcon className="h-4 w-4 text-church-blue-500" />
                          </div>
                          <span className="text-sm font-medium">
                            {formatDate(evento.data_inicio)}
                          </span>
                        </div>

                        <div className="flex items-center text-church-blue-600">
                          <div className="w-8 h-8 bg-church-gold-100 rounded-lg flex items-center justify-center mr-3">
                            <ClockIcon className="h-4 w-4 text-church-gold-600" />
                          </div>
                          <span className="text-sm font-medium">
                            {formatTime(evento.data_inicio)}
                          </span>
                        </div>

                        <div className="flex items-center text-church-blue-600">
                          <div className="w-8 h-8 bg-church-red-100 rounded-lg flex items-center justify-center mr-3">
                            <MapPinIcon className="h-4 w-4 text-church-red-500" />
                          </div>
                          <span className="text-sm font-medium line-clamp-1">
                            {evento.localizacao}
                          </span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-church-blue-700 line-clamp-3 text-sm leading-relaxed mb-4">
                        {evento.descricao}
                      </p>

                      {/* Call to action */}
                      <div className="pt-4 border-t border-church-sky-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-church-gold-600 text-sm font-semibold">
                            Ver detalhes completos
                          </span>
                          <ArrowRight className="w-4 h-4 text-church-gold-600 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};