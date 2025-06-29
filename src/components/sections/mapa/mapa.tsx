"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface MapboxLocationProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  address?: string;
  zoom?: number;
  showCard?: boolean;
  height?: string;
  className?: string;
}

export const MapboxLocation: React.FC<MapboxLocationProps> = ({
  latitude,
  longitude,
  title = "Nossa Localização",
  description = "Venha nos visitar",
  address = "Endereço não informado",
  zoom = 15,
  showCard = true,
  height = "400px",
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Configurar token do Mapbox
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (!mapboxgl.accessToken) {
      console.error('Token do Mapbox não encontrado. Configure NEXT_PUBLIC_MAPBOX_TOKEN no seu .env.local');
      return;
    }

    if (map.current || !mapContainer.current) return;

    // Inicializar mapa
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Estilo do mapa
      center: [longitude, latitude],
      zoom: zoom,
      interactive: false, // Desabilita interação (não pode mover, zoom, etc.)
      attributionControl: false, // Remove controles de atribuição
    });

    // Adicionar marcador personalizado
    const marker = new mapboxgl.Marker({
      color: '#2563eb', // Cor azul
      scale: 1.2
    })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Adicionar popup opcional
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat([longitude, latitude])
      .setHTML(`
        <div style="padding: 8px; text-align: center;">
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${title}</h3>
          <p style="margin: 0; font-size: 12px; color: #666;">${address}</p>
        </div>
      `);

    marker.setPopup(popup);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, title, address, zoom]);

  // Funções para abrir em outros mapas
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const openInWaze = () => {
    const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    window.open(url, '_blank');
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  if (!showCard) {
    return (
      <div className={`relative ${className}`}>
        <div
          ref={mapContainer}
          style={{ height }}
          className="w-full rounded-lg overflow-hidden shadow-md"
        />
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        {description && (
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Mapa */}
        <div className="relative">
          <div
            ref={mapContainer}
            style={{ height }}
            className="w-full"
          />
          
          {/* Overlay com informações */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
            <p className="text-sm font-medium text-gray-900 mb-1">{address}</p>
            <p className="text-xs text-gray-600">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={getDirections}
              size="sm"
              className="w-full sm:flex-1"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Como Chegar
            </Button>
            
            <Button
              onClick={openInGoogleMaps}
              variant="outline"
              size="sm"
              className="w-full sm:flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Google Maps
            </Button>
            
            <Button
              onClick={openInWaze}
              variant="outline"
              size="sm"
              className="w-full sm:flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Waze
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente exemplo de uso
export const ChurchLocationMap = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
            <p className="text-lg text-gray-600">
              Encontre-nos facilmente e venha nos visitar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Rua das Flores, 123<br />
                    Bairro Centro<br />
                    São Paulo - SP, 01234-567
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Horários de Funcionamento:</strong></p>
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 12h</p>
                    <p>Domingo: Cultos às 9h e 19h</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Adicionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Estacionamento gratuito disponível</li>
                    <li>• Acesso para cadeirantes</li>
                    <li>• Próximo ao metrô Sé</li>
                    <li>• Várias opções de transporte público</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Mapa */}
            <div>
              <MapboxLocation
                latitude={-23.5505}  // Coordenadas de exemplo (São Paulo)
                longitude={-46.6333}
                title="Nossa Igreja"
                description="Venha nos conhecer!"
                address="Rua das Flores, 123 - Centro, São Paulo - SP"
                zoom={16}
                height="500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};