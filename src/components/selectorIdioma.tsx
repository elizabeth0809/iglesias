'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LanguageSelectorProps {
  currentLocale: string;
}

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'pt', flag: '🇧🇷' },
    { code: 'es', flag: '🇪🇸' }
  ];

  // Resetear loading cuando cambie el currentLocale
  useEffect(() => {
    setIsLoading(false);
  }, [currentLocale]);

  const handleLanguageChange = async (newLocale: string) => {
    if (newLocale === currentLocale || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const params = new URLSearchParams(searchParams);
      params.set('locale', newLocale);
      
      const currentPage = searchParams.get('page');
      if (currentPage) params.set('page', currentPage);
      
      router.push(`?${params.toString()}`);
      
      // Timeout de seguridad
      setTimeout(() => setIsLoading(false), 2000);
    } catch (error) {
      console.error('Error al cambiar idioma:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            disabled={isLoading}
            className={`
              relative flex items-center justify-center w-8 h-8 rounded-full text-lg transition-all duration-200
              ${currentLocale === language.code
                ? 'bg-church-blue-500 shadow-sm transform scale-110'
                : 'hover:bg-gray-100'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={language.code === 'pt' ? 'Português' : 'Español'}
          >
            <span className={`transition-transform duration-200 ${
              currentLocale === language.code ? 'scale-110' : ''
            }`}>
              {language.flag}
            </span>
            
            {/* Spinner overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-full">
                <div className="w-3 h-3 border border-church-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}