"use client";
import { Calendar, Clock, Heart, MapPin, NavigationIcon } from "lucide-react";
import { MapboxLocation } from "./mapa";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";
import { useEffect, useState } from "react";

type LocationSectionProps = BackgroundVariantProps;

export const LocationSectionComplete = ({ 
  backgroundVariant = 'light' 
}: LocationSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { background, text, subtext, isDark, card, overlay } = getVariantClasses(backgroundVariant);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-red-400 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-church-gold-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-blue-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
                <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                  <NavigationIcon className="w-2 h-2 text-white" />
                </div>
              </div>
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
              Nossa Localização
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${subtext}`}>
              Encontre-nos facilmente e venha nos visitar. Nossa casa está sempre aberta para você!
            </p>

            {/* Stats rápidos */}
            <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
            }`}>
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-church-red-600' : 'bg-church-red-200'
                }`}>
                  <MapPin className={`w-6 h-6 ${
                    isDark ? 'text-white' : 'text-church-red-600'
                  }`} />
                </div>
                <p className={`text-sm font-medium ${subtext}`}>
                  Fácil Localização
                </p>
              </div>

              <div className="w-px h-12 bg-church-gold-300"></div>

              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-church-gold-600' : 'bg-church-gold-200'
                }`}>
                  <Clock className={`w-6 h-6 ${
                    isDark ? 'text-white' : 'text-church-gold-600'
                  }`} />
                </div>
                <p className={`text-sm font-medium ${subtext}`}>
                  Horários Flexíveis
                </p>
              </div>

              <div className="w-px h-12 bg-church-gold-300"></div>

              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-church-blue-600' : 'bg-church-blue-200'
                }`}>
                  <Heart className={`w-6 h-6 ${
                    isDark ? 'text-white' : 'text-church-blue-600'
                  }`} />
                </div>
                <p className={`text-sm font-medium ${subtext}`}>
                  Sempre Bem-vindo
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Informações da Igreja */}
            <div className={`space-y-6 order-2 lg:order-1 transition-all duration-1000 ease-out delay-500 ${
              isLoaded ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-12 opacity-0'
            }`}>
              {/* Card de Endereço */}
              <div className={`${card} rounded-xl shadow-lg p-6 border`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-church-red-500 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${text}`}>
                    Endereço
                  </h3>
                </div>
                
                <div className={`space-y-2 ${subtext} mb-6`}>
                  <p className="font-medium">Rua Luis Gomes Pain, nº 300</p>
                  <p>Jardim Marek - Santo André, SP</p>
                  <p>CEP: 09111-580</p>
                </div>

                {/* Facilidades */}
               
              </div>

              {/* Card de Horários */}
              <div className={`${card} rounded-xl shadow-lg p-6 border`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-church-gold-500 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${text}`}>
                    Horários dos Cultos
                  </h3>
                </div>
                
                <div className={`space-y-3 ${subtext}`}>
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">🌅 Domingo (Consagração)</span>
                      <span className="text-church-gold-600 font-bold">8h</span>
                    </div>
                  </div>
                  
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">📚 Domingo (EBD)</span>
                      <span className="text-church-gold-600 font-bold">9h</span>
                    </div>
                  </div>
                  
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">⛪ Domingo (Culto)</span>
                      <span className="text-church-gold-600 font-bold">18h</span>
                    </div>
                  </div>
                  
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">📖 Segunda (Estudo)</span>
                      <span className="text-church-gold-600 font-bold">19h30</span>
                    </div>
                  </div>
                  
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">🙏 Quarta (Culto)</span>
                      <span className="text-church-gold-600 font-bold">19h30</span>
                    </div>
                  </div>
                  
                  <div className={`${overlay} rounded-lg p-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">✨ Sexta (Culto)</span>
                      <span className="text-church-gold-600 font-bold">19h30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className={`order-1 lg:order-2 transition-all duration-1000 ease-out delay-700 ${
              isLoaded ? 'transform translate-x-0 opacity-100' : 'transform translate-x-12 opacity-0'
            }`}>
              <div className="relative">
                <MapboxLocation
                  latitude={-23.6743587}
                  longitude={-46.4922899}
                  title="Igreja Batista Renovada Sonho de Deus"
                  description="Venha nos conhecer!"
                  address="Rua Luis Gomes Pain, nº 300 - Jardim Marek, Santo André - SP"
                  zoom={16}
                  height="600px"
                  className="h-full rounded-xl overflow-hidden shadow-2xl"
                />
                
            
              </div>
            </div>
          </div>

          {/* Call to action final */}
          <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-900 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${overlay}`}>
              <Calendar className={`w-5 h-5 ${
                isDark ? 'text-church-sky-300' : 'text-church-blue-600'
              }`} />
              <p className={`text-sm font-medium ${subtext}`}>
                &ldquo;Venha como você está, saia transformado pelo amor de Deus&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};