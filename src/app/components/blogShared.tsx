'use client';

import { ShareButton } from "./shareButton";

interface BlogShareWrapperProps {
  title: string;
  description?: string;
  slug?: string; // Añadimos el slug como prop
  variant?: 'floating' | 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  shareText?: string;
  copyText?: string;
  loadingText?: string;
  successText?: string;
  toastMessage?: string;
}

export const BlogShareWrapper = ({
  title,
  description,
  slug, // Recibimos el slug
  variant = 'floating',
  size = 'md',
  className = '',
  shareText = 'Compartilhar Reflexão',
  copyText = 'Copiar Link do Blog',
  loadingText = 'Compartilhando...',
  successText = 'Blog Compartilhado!',
  toastMessage = 'Link da reflexão copiado para a área de transferência!',
}: BlogShareWrapperProps) => {
  // Construir la URL completa
  const getCompleteUrl = () => {
    if (typeof window === 'undefined') return '';
    
    const baseUrl = window.location.origin;
    
    // Si tenemos slug, construir la URL completa
    if (slug) {
      return `${baseUrl}/blog/${slug}`;
    }
    
    // Fallback a la URL actual
    return window.location.href;
  };

  // Event handlers del lado del cliente
  const handleSuccess = (shared: boolean) => {
    console.log(shared ? 'Reflexão compartilhada via aplicativo nativo' : 'Link copiado para área de transferência');
  };

  const handleError = (error: Error) => {
    console.error('Erro ao compartilhar reflexão:', error);
  };

  return (
    <ShareButton
      title={`${title} - Blog Espiritual`}
      text={`Leia esta reflexão espiritual: "${title}". ${description || 'Uma inspiração para sua jornada de fé.'}`}
      url={getCompleteUrl()} // Pasamos la URL construida
      shareText={shareText}
      copyText={copyText}
      loadingText={loadingText}
      successText={successText}
      toastMessage={toastMessage}
      variant={variant}
      size={size}
      className={className}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};