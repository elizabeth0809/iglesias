'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

export interface ShareButtonProps {
  // Datos para compartir
  title?: string;
  text?: string;
  url?: string;
  
  // Configuración de textos
  shareText?: string;
  copyText?: string;
  loadingText?: string;
  successText?: string;
  toastMessage?: string;
  
  // Configuración visual
  variant?: 'primary' | 'secondary' | 'floating' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  
  // Configuración de comportamiento
  showToast?: boolean;
  toastDuration?: number;
  onSuccess?: (shared: boolean) => void; // true si se compartió, false si se copió
  onError?: (error: Error) => void;
  
  // Opciones avanzadas
  shareOnlyUrl?: boolean; // Si true, solo comparte/copia la URL
  customIcon?: React.ReactNode;
  disabled?: boolean;
}

export const ShareButton = ({
  title,
  text,
  url = typeof window !== 'undefined' ? window.location.href : '',
  shareText = 'Compartilhar',
  copyText = 'Copiar Link',
  loadingText = 'Copiando...',
  toastMessage,
  variant = 'primary',
  size = 'md',
  className = '',
  showToast = true,
  toastDuration = 3000,
  onSuccess,
  onError,
  shareOnlyUrl = false,
  customIcon,
  disabled = false
}: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);

  // Función para detectar si es dispositivo móvil
  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
  };

  // Función auxiliar para copiar al clipboard
  const copyToClipboard = async (textToCopy: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      // Fallback para navegadores más antiguos o contextos no seguros
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  };

  // Función para mostrar toast de éxito
  const showSuccessToast = (shared: boolean) => {
    if (!showToast) return;

    const message = toastMessage || (shared 
      ? 'Compartilhado com sucesso!' 
      : 'Link copiado para área de transferência!');

    toast.success(message, {
      duration: toastDuration,
      position: 'top-left',
      icon: <Check className="w-4 h-4" />,
    });
  };

  // Función para mostrar toast de error
  const showErrorToast = (error: Error) => {
    if (!showToast) return;

    toast.error('Erro ao compartilhar. Tente novamente.', {
      duration: toastDuration,
      position: 'top-left',
      description: error.message,
    });
  };

  // Función principal de compartir
  const handleShare = async () => {
    if (isSharing || disabled) return;

    setIsSharing(true);

    // Toast de loading
    const loadingToastId = showToast ? toast.loading(loadingText, {
      position: 'top-left',
    }) : null;

    try {
      const shareUrl = url || window.location.href;
      let shared = false;

      // En dispositivos móviles, intentar usar Web Share API
      if (isMobileDevice() && navigator.share && !shareOnlyUrl) {
        const shareData: ShareData = {
          title: title,
          text: text,
          url: shareUrl
        };

        // Limpiar datos undefined
        Object.keys(shareData).forEach(key => {
          if (shareData[key as keyof ShareData] === undefined) {
            delete shareData[key as keyof ShareData];
          }
        });

        try {
          await navigator.share(shareData);
          shared = true;
        } catch (shareError: unknown) {
          if (
            typeof shareError === 'object' &&
            shareError !== null &&
            'name' in shareError &&
            (shareError as { name?: string }).name === 'AbortError'
          ) {
            console.log('Share cancelado pelo usuário');
            // Dismiss loading toast sin mostrar error
            if (loadingToastId) toast.dismiss(loadingToastId);
            return;
          }
          await copyToClipboard(shareUrl);
          shared = false;
        }
      } else {
        // En PC o si shareOnlyUrl es true, solo copiar la URL
        await copyToClipboard(shareUrl);
        shared = false;
      }

      // Dismiss loading toast
      if (loadingToastId) toast.dismiss(loadingToastId);
      
      // Mostrar toast de éxito
      showSuccessToast(shared);
      onSuccess?.(shared);

    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      
      // Dismiss loading toast
      if (loadingToastId) toast.dismiss(loadingToastId);
      
      const errorObj = error instanceof Error ? error : new Error(String(error));
      showErrorToast(errorObj);
      onError?.(errorObj);
      
      // Fallback final: copiar solo la URL
      try {
        await copyToClipboard(url || window.location.href);
        showSuccessToast(false);
        onSuccess?.(false);
      } catch (clipboardError) {
        console.error('Erro ao copiar para clipboard:', clipboardError);
        const clipboardErrorObj = clipboardError instanceof Error ? clipboardError : new Error(String(clipboardError));
        showErrorToast(clipboardErrorObj);
        onError?.(clipboardErrorObj);
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Configuración de estilos según variante
  const getVariantStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg';
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-church-red-500 hover:bg-church-red-600 text-white rounded-lg`;
      case 'secondary':
        return `${baseStyles} bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg`;
      case 'floating':
        return `${baseStyles} bg-church-blue-500/80 backdrop-blur-sm hover:bg-church-blue-600 text-white rounded-full`;
      case 'minimal':
        return `${baseStyles} bg-transparent hover:bg-gray-100 text-church-blue-600 border border-church-blue-300 rounded-lg`;
      default:
        return `${baseStyles} bg-church-red-500 hover:bg-church-red-600 text-white rounded-lg`;
    }
  };

  // Configuración de tamaños
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return variant === 'floating' ? 'p-2' : 'px-4 py-2 text-sm';
      case 'md':
        return variant === 'floating' ? 'p-3' : 'px-6 py-3';
      case 'lg':
        return variant === 'floating' ? 'p-4' : 'px-8 py-4 text-lg';
      default:
        return variant === 'floating' ? 'p-3' : 'px-6 py-3';
    }
  };

  // Obtener textos dinámicos
  const getButtonText = () => {
    if (isSharing) return loadingText;
    return isMobileDevice() ? shareText : copyText;
  };

  // Obtener ícono
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    
    if (isSharing) {
      return (
        <div className={`border-2 border-current border-t-transparent rounded-full animate-spin ${iconSize}`} />
      );
    }
    
    return isMobileDevice() ? <Share2 className={iconSize} /> : <Copy className={iconSize} />;
  };

  const buttonStyles = `
    ${getVariantStyles()} 
    ${getSizeStyles()} 
    ${isSharing || disabled ? 'cursor-not-allowed opacity-70' : ''} 
    ${className}
  `;

  return (
    <button
      onClick={handleShare}
      disabled={isSharing || disabled}
      className={buttonStyles}
      title={getButtonText()}
    >
      <span className={variant === 'floating' ? '' : 'mr-2'}>
        {getIcon()}
      </span>
      {variant !== 'floating' && (
        <span>{getButtonText()}</span>
      )}
    </button>
  );
};


export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);

  const share = async (options: Omit<ShareButtonProps, 'children'> & { 
    showToast?: boolean;
    toastDuration?: number;
  }) => {
    setIsSharing(true);
    
    const showToast = options.showToast ?? true;
    const toastDuration = options.toastDuration ?? 3000;
    
    // Toast de loading
    const loadingToastId = showToast ? toast.loading('Copiando...', {
      position: 'top-left',
    }) : null;
    
    try {
      const shareUrl = options.url || window.location.href;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      let shared = false;
      
      if (isMobile && navigator.share && !options.shareOnlyUrl) {
        const shareData: ShareData = {
          title: options.title,
          text: options.text,
          url: shareUrl
        };

        Object.keys(shareData).forEach(key => {
          if (shareData[key as keyof ShareData] === undefined) {
            delete shareData[key as keyof ShareData];
          }
        });

        try {
          await navigator.share(shareData);
          shared = true;
        } catch (shareError: unknown) {
          if (
            typeof shareError === 'object' &&
            shareError !== null &&
            'name' in shareError &&
            (shareError as { name?: string }).name === 'AbortError'
          ) {
            if (loadingToastId) toast.dismiss(loadingToastId);
            return { success: false, cancelled: true };
          }
          // Fallback a copy
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareUrl);
          } else {
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
          }
          shared = false;
        }
      } else {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareUrl);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        shared = false;
      }
      
      // Dismiss loading toast
      if (loadingToastId) toast.dismiss(loadingToastId);
      
      // Show success toast
      if (showToast) {
        const message = options.toastMessage || (shared 
          ? 'Compartilhado com sucesso!' 
          : 'Link copiado para área de transferência!');
          
        toast.success(message, {
          duration: toastDuration,
          position: 'top-left',
          icon: <Check className="w-4 h-4" />,
        });
      }
      
      return { success: true, shared };
    } catch (error) {
      // Dismiss loading toast
      if (loadingToastId) toast.dismiss(loadingToastId);
      
      // Show error toast
      if (showToast) {
        toast.error('Erro ao compartilhar. Tente novamente.', {
          duration: toastDuration,
          position: 'top-left',
          description: error instanceof Error ? error.message : String(error),
        });
      }
      
      return { success: false, error };
    } finally {
      setIsSharing(false);
    }
  };

  return { share, isSharing };
};