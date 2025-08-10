// @/app/comunidades/components/NossaComunidadesComponent.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Users, ArrowRight, Heart, Sparkles, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IComunidadeResponse } from '@/insfractucture/interfaces/comunidade/comunidades.interfaces';

interface NossaComunidadesComponentProps {
  comunidades: IComunidadeResponse[];
}

export const NossaComunidadesComponent = ({ comunidades }: NossaComunidadesComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return '';
        
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Erro ao formatar a data:", error);
      return 'Data inválida';
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="h-12 bg-church-sky-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-church-sky-100 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-56 bg-church-sky-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-church-sky-200 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-church-sky-100 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-3/4 animate-pulse"></div>
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-blue-500 rounded-full p-4 shadow-xl">
              <Users className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-red-500 rounded-full flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-church-blue-900 mb-4">
            Nossa{' '}
            <span className="text-church-blue-500">Comunidade</span>
          </h1>
          
          <p className="text-lg md:text-xl text-church-blue-600 max-w-3xl mx-auto leading-relaxed">
            Conheça os diferentes grupos e ministérios que fazem parte da nossa família espiritual
          </p>

          {/* Stats inspiracionais */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                {comunidades?.length || 0}+
              </div>
              <p className="text-sm text-church-blue-600">
                Comunidades Ativas
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                ✨
              </div>
              <p className="text-sm text-church-blue-600">
                Unidos em Fé
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                🤝
              </div>
              <p className="text-sm text-church-blue-600">
                Crescendo Juntos
              </p>
            </div>
          </div>
        </div>

        {(!comunidades || comunidades.length === 0) ? (
          <div className={`text-center py-16 transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-church-sky-200">
              <div className="w-20 h-20 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-church-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-church-blue-900 mb-3">
                Nenhuma comunidade disponível
              </h3>
              <p className="text-church-blue-600 leading-relaxed">
                As informações sobre nossas comunidades aparecerão aqui em breve. Fique atento!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comunidades.map((comunidade, index) => (
              <div
                key={comunidade.id}
                className={`transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={`/comunidade/${comunidade.slug}`} className="block group cursor-pointer">
                  <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-3 border border-church-sky-200 relative">
                    {/* Línea decorativa superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400"></div>
                    
                    {/* Imagen de la comunidad */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={comunidade.image || "/placeholder.svg"}
                        alt={comunidade.name || "Comunidade"}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge de comunidad */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-church-blue-500 text-white shadow-lg backdrop-blur-sm">
                          👥 Comunidade
                        </span>
                      </div>

                      {/* Members badge */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          <Users className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium">Ativa</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido de la comunidad */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-church-blue-900 group-hover:text-church-blue-500 transition-colors duration-300 line-clamp-2 leading-tight">
                        {comunidade.name || "Nome não disponível"}
                      </h3>
                      
                      {/* Fecha con ícono mejorado */}
                      <div className="flex items-center mb-4 text-church-blue-600">
                        <div className="w-8 h-8 bg-church-gold-100 rounded-lg flex items-center justify-center mr-3">
                          <CalendarIcon className="h-4 w-4 text-church-gold-600" />
                        </div>
                        <span className="text-sm font-medium">
                          Desde {formatDate(comunidade.created_at)}
                        </span>
                      </div>

                      {/* Descripción */}
                      <p className="text-church-blue-700 line-clamp-3 leading-relaxed mb-4">
                        {comunidade.description || "Descrição não disponível"}
                      </p>

                      {/* Call to action */}
                      <div className="pt-4 border-t border-church-sky-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-church-blue-500 font-medium text-sm">
                            Conhecer mais
                          </span>
                          <ArrowRight className="w-4 h-4 text-church-blue-500 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Decoración flotante */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-8 h-8 bg-church-gold-500 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};