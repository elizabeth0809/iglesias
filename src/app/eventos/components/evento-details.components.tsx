'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';

interface EventoDetailComponentProps {
  evento: IEventoResponse;
}

export const EventoDetailComponent = ({ evento }: EventoDetailComponentProps) => {
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

  const formatDatetime = (dateString: string) => {
    if (!mounted) return '';
    
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-300"></div>
              <div className="p-8">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <Link 
          href="/eventos" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Voltar aos eventos
        </Link>

        {/* Card principal del evento */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen del evento */}
          <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
            <Image
              src={evento.imagem || "/placeholder.svg"}
              alt={evento.nome}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Overlay con estado del evento */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                evento.status === 'ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {evento.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>

          {/* Contenido del evento */}
          <div className="p-8">
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {evento.nome}
            </h1>

            {/* Información del evento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Fecha y hora */}
              <div className="flex items-start space-x-3">
                <CalendarIcon className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Data e Horário</h3>
                  <p className="text-gray-600 capitalize">
                    {formatDatetime(evento.data_inicio)}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {formatTime(evento.data_inicio)}
                  </div>
                </div>
              </div>

              {/* Localización */}
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Local</h3>
                  <p className="text-gray-600">
                    {evento.localizacao}
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sobre o Evento</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {evento.descricao}
                </p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Criado em:</span> {formatDate(evento.created_at)}
                </div>
                <div>
                  <span className="font-medium">Atualizado em:</span> {formatDate(evento.updated_at)}
                </div>
              </div>
            </div>

            {/* Call to action (opcional) */}
            {evento.status === 'ativo' && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Interessado em participar?
                </h3>
                <p className="text-blue-700 mb-4">
                  Entre em contato conosco para mais informações sobre este evento.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Entre em Contato
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};