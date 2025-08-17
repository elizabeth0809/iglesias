'use client';

import Image from 'next/image';
import { Heart, QrCode, DollarSign, Gift,  CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormularioDoacaoComponent } from './FormularioDoacaoComponent';
import { toast } from 'sonner';

export const NossaDoacoesComponent = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="h-12 bg-church-sky-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-church-sky-100 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-church-sky-200 rounded-xl mb-8 animate-pulse"></div>
            <div className="h-96 bg-church-sky-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              <Heart className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-red-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-church-blue-900 mb-4">
            Suas{' '}
            <span className="text-church-gold-500">Doações</span>
          </h1>
          
          <p className="text-lg md:text-xl text-church-blue-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Contribua para a obra de Deus e faça parte desta família espiritual
          </p>

          {/* Versículo bíblico */}
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 ease-out delay-200 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="bg-church-blue-50 border-l-4 border-church-gold-500 rounded-lg p-6 shadow-lg">
                <blockquote className="text-lg md:text-xl font-medium text-church-blue-800 italic text-center leading-relaxed">
  &ldquo;Que cada um <span className="font-bold text-church-gold-600">dê</span> como propôs em seu coração, não de mala gana nem por obrigação, porque <span className="font-bold text-church-blue-600">Deus ama ao dador alegre</span>.&rdquo;
</blockquote>
              <cite className="block text-center mt-4 text-church-blue-600 font-semibold">
                2 Coríntios 9:7
              </cite>
            </div>
          </div>

          {/* Stats inspiracionais */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                💝
              </div>
              <p className="text-sm text-church-blue-600">
                Generosidade
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                🙏
              </div>
              <p className="text-sm text-church-blue-600">
                Gratidão
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-church-blue-900 mb-1">
                ✨
              </div>
              <p className="text-sm text-church-blue-600">
                Bênçãos
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className={`max-w-2xl mx-auto mb-16 transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-church-sky-200 text-center relative overflow-hidden">
            {/* Linha decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
            
            <div className="flex justify-center mb-6">
              <div className="bg-church-gold-100 rounded-full p-3 shadow-lg">
                <QrCode className="w-8 h-8 text-church-gold-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-church-blue-900 mb-4">
              Escaneie o QR Code
            </h2>
            
            <p className="text-church-blue-600 mb-8">
              Use qualquer aplicativo de pagamento para fazer sua doação
            </p>

            {/* QR Code e informações PIX */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-church-gold-200">
                <Image
                  src="/pix.png" // Sua imagem QR do PIX
                  alt="QR Code PIX para doações"
                  width={250}
                  height={250}
                  className="rounded-lg"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyMiuXPzUvLjSZiMTB2Vu8BQ9W8KHu7K8LnOl+89j3ZudKpPJu0YNABd0DYjSgGXdKQFaxjLg5Gw=="
                />
              </div>
            </div>

            {/* Informações PIX para copiar */}
            <div className="space-y-4">
              {/* Chave PIX */}
              <div className="bg-church-blue-50 border border-church-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-church-blue-700 mb-1">Chave PIX (CNPJ):</p>
                    <p className="text-lg font-mono font-bold text-church-blue-900" id="pix-key">
                      60.165.460.0001-00
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('60.165.460.0001-00');
                      toast.success('Chave PIX copiada!');
                    }}
                    className="ml-4 bg-church-blue-500 hover:bg-church-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar</span>
                  </button>
                </div>
              </div>

              {/* Nome do beneficiário */}
              <div className="bg-church-gold-50 border border-church-gold-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-church-gold-700 mb-1">Beneficiário:</p>
                    <p className="text-lg font-semibold text-church-gold-900" id="beneficiary-name">
                      IGREJA BATISTA RENOVADA SONHO DE DEUS
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('IGREJA BATISTA RENOVADA SONHO DE DEUS');
                      toast.success('Nome copiado!');
                    }}
                    className="ml-4 bg-church-gold-500 hover:bg-church-gold-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copiar</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-church-blue-600">
              <p className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2 text-church-green-500" />
                PIX, Transferência
              </p>
              <p className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2 text-church-green-500" />
                Seguro e instantâneo
              </p>
            </div>
          </div>
        </div>

        {/* Formulário de reportar pagamento */}
        <FormularioDoacaoComponent />

        {/* Call to action final */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-900 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-church-gold-50 border border-church-gold-200">
            <Heart className="w-5 h-5 text-church-gold-500" />
            <p className="text-sm font-medium text-church-gold-700">
              &ldquo;Cada doação é uma semente plantada no Reino de Deus&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};