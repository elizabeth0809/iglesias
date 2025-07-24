"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink, Heart, Compass, Phone } from 'lucide-react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: zoom,
      interactive: false, // Deshabilitamos toda interacción
      attributionControl: false,
      scrollZoom: false, // Deshabilitamos zoom con scroll
      boxZoom: false, // Deshabilitamos box zoom
      dragRotate: false, // Deshabilitamos rotación
      dragPan: false, // Deshabilitamos arrastrar
      keyboard: false, // Deshabilitamos controles de teclado
      doubleClickZoom: false, // Deshabilitamos doble click zoom
      touchZoomRotate: false, // Deshabilitamos gestos táctiles
    });

    // NO agregamos controles de navegación para mantener el mapa fijo

    // Adicionar marcador simple y centrado (como el original)
    const marker = new mapboxgl.Marker({
      color: '#FFB300', // Color dorado iglesia
      scale: 1.3
    })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    // Adicionar popup estilizado
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: false,
      className: 'custom-popup'
    })
      .setLngLat([longitude, latitude])
      .setHTML(`
        <div style="
          padding: 16px; 
          text-align: center; 
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          color: white;
          border-radius: 12px;
          min-width: 200px;
        ">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
            <div style="
              width: 32px; 
              height: 32px; 
              background: #FFB300; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              margin-right: 8px;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
            </div>
            <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${title}</h3>
          </div>
          <p style="margin: 0 0 8px 0; font-size: 12px; opacity: 0.9;">${address}</p>
          <div style="
            background: rgba(255, 255, 255, 0.2); 
            padding: 8px; 
            border-radius: 8px;
            font-size: 11px;
          ">
            ✨ ${description}
          </div>
        </div>
      `);

    marker.setPopup(popup);

    // Agregar CSS para animaciones (simplificado)
    const style = document.createElement('style');
    style.textContent = `
      .custom-popup .mapboxgl-popup-content {
        background: transparent !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        border-radius: 12px !important;
        padding: 0 !important;
      }
      .custom-popup .mapboxgl-popup-tip {
        border-top-color: #1e40af !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
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
      <div className={`relative ${className} transition-all duration-700 ease-out ${
        isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
      }`}>
        <div
          ref={mapContainer}
          style={{ height }}
          className="w-full rounded-xl overflow-hidden shadow-2xl border-2 border-church-gold-200"
        />
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-church-sky-50 ${className} transition-all duration-700 ease-out ${
      isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
    }`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-church-blue-500 to-church-gold-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">{title}</CardTitle>
            {description && (
              <CardDescription className="text-white/90 text-base mt-1">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Mapa */}
        <div className="relative">
          <div
            ref={mapContainer}
            style={{ height }}
            className="w-full"
          />
          
          {/* Badge decorativo */}
          <div className="absolute top-4 right-4 bg-church-gold-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
            <Heart className="w-4 h-4 inline mr-1" />
            Nossa Casa
          </div>
        </div>

        {/* Botões de ação melhorados */}
        <div className="p-6 bg-gradient-to-r from-church-sky-50 to-white border-t border-church-sky-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={getDirections}
              className="group bg-church-blue-500 hover:bg-church-blue-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              size="sm"
            >
              <Navigation className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Como Chegar
            </Button>
            
            <Button
              onClick={openInGoogleMaps}
              variant="outline"
              className="group border-church-gold-300 text-church-gold-600 hover:bg-church-gold-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              Google Maps
            </Button>
            
            <Button
              onClick={openInWaze}
              variant="outline"
              className="group border-church-red-300 text-church-red-600 hover:bg-church-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              size="sm"
            >
              <Compass className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Waze
            </Button>
          </div>

       
        </div>
      </CardContent>
    </Card>
  );
};

// Componente exemplo de uso mejorado
export const ChurchLocationMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header mejorado */}
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="flex justify-center mb-6">
              <div className="relative bg-church-red-500 rounded-full p-4 shadow-xl">
                <MapPin className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-church-blue-900">
              Nossa Localização
            </h2>
            <p className="text-lg md:text-xl text-church-blue-600 max-w-2xl mx-auto">
              Encontre-nos facilmente e venha nos visitar. Nossa casa está sempre aberta para você!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações melhoradas */}
            <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-8 opacity-0'
            }`}>
              <Card className="bg-white/80 backdrop-blur-sm border border-church-sky-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-church-blue-500 to-church-gold-500 text-white">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <MapPin className="h-6 w-6" />
                    Endereço Completo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-church-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-church-blue-900 mb-1">Nossa Casa</p>
                        <p className="text-church-blue-700">Rua Luis Gomes Pain, nº 300</p>
                        <p className="text-church-blue-700">Jardim Marek, Santo André - SP</p>
                        <p className="text-church-blue-700">CEP: 09111-580</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-church-sky-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-church-gold-500 to-church-blue-500 text-white">
                  <CardTitle className="text-white">Facilidades</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "🚗", text: "Estacionamento gratuito" },
                      { icon: "♿", text: "Acesso para cadeirantes" },
                      { icon: "🚌", text: "Transporte público próximo" },
                      { icon: "☕", text: "Recepção acolhedora" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-church-blue-700">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mapa */}
            <div className={`transition-all duration-1000 ease-out delay-500 ${
              isLoaded ? 'transform translate-x-0 opacity-100' : 'transform translate-x-8 opacity-0'
            }`}>
              <MapboxLocation
                latitude={-23.6743587}
                longitude={-46.4922899}
                title="Igreja Batista Renovada Sonho de Deus"
                description="Venha nos conhecer!"
                address="Rua Luis Gomes Pain, nº 300 - Jardim Marek, Santo André - SP"
                zoom={16}
                height="600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};