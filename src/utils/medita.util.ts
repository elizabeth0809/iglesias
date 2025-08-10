// @/lib/utils/media-utils.ts

/**
 * Detecta si una URL corresponde a un archivo de video
 * @param url - URL del archivo a verificar
 * @returns boolean - true si es video, false si no
 */
export const isVideoFile = (url: string): boolean => {
  if (!url) return false;
  
  const videoExtensions = [
    '.mp4', '.webm', '.ogg', '.avi', '.mov', 
    '.wmv', '.flv', '.mkv', '.m4v', '.3gp', '.ogv'
  ];
  
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.includes(ext));
};

/**
 * Detecta si una URL corresponde a un archivo de imagen
 * @param url - URL del archivo a verificar
 * @returns boolean - true si es imagen, false si no
 */
export const isImageFile = (url: string): boolean => {
  if (!url) return false;
  
  const imageExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', 
    '.svg', '.bmp', '.ico', '.tiff', '.tif'
  ];
  
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext));
};

/**
 * Detecta si una URL corresponde a un archivo de audio
 * @param url - URL del archivo a verificar
 * @returns boolean - true si es audio, false si no
 */
export const isAudioFile = (url: string): boolean => {
  if (!url) return false;
  
  const audioExtensions = [
    '.mp3', '.wav', '.ogg', '.aac', '.flac', 
    '.m4a', '.wma', '.opus'
  ];
  
  const lowerUrl = url.toLowerCase();
  return audioExtensions.some(ext => lowerUrl.includes(ext));
};

/**
 * Obtiene el tipo de media basado en la URL
 * @param url - URL del archivo a verificar
 * @returns 'video' | 'image' | 'audio' | 'unknown'
 */
export const getMediaType = (url: string): 'video' | 'image' | 'audio' | 'unknown' => {
  if (isVideoFile(url)) return 'video';
  if (isImageFile(url)) return 'image';
  if (isAudioFile(url)) return 'audio';
  return 'unknown';
};

/**
 * Obtiene el tipo MIME basado en la extensión del archivo
 * @param url - URL del archivo
 * @returns string - Tipo MIME o cadena vacía si no se puede determinar
 */
export const getMimeType = (url: string): string => {
  if (!url) return '';
  
  const extension = url.toLowerCase().split('.').pop();
  
  const mimeTypes: Record<string, string> = {
    // Video
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'mkv': 'video/x-matroska',
    'm4v': 'video/x-m4v',
    '3gp': 'video/3gpp',
    'ogv': 'video/ogg',
    
    // Imagen
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'ico': 'image/x-icon',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'aac': 'audio/aac',
    'flac': 'audio/flac',
    'm4a': 'audio/mp4',
    'wma': 'audio/x-ms-wma',
    'opus': 'audio/opus',
  };
  
  return mimeTypes[extension || ''] || '';
};

/**
 * Componente React para renderizar media de forma inteligente
 */
interface SmartMediaProps {
  src: string;
  alt: string;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  fallbackSrc?: string;
}

export const SmartMedia: React.FC<SmartMediaProps> = ({
  src,
  alt,
  className = "",
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  poster,
  fallbackSrc = "/placeholder.svg"
}) => {
  const mediaType = getMediaType(src);
  const mimeType = getMimeType(src);
  
  switch (mediaType) {
    case 'video':
      return (
        <video
          className={className}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          poster={poster || fallbackSrc}
          preload="metadata"
        >
          <source src={src} type={mimeType || 'video/mp4'} />
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          <source src={src} type="video/ogg" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      );
      
    case 'audio':
      return (
        <audi
          className={className}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload="metadata"
        >
          <source src={src} type={mimeType || 'audio/mpeg'} />
          <source src={src} type="audio/mp3" />
          <source src={src} type="audio/wav" />
          <source src={src} type="audio/ogg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      );
      
    case 'image':
    default:
      return (
        <img
          src={src || fallbackSrc}
          alt={alt}
          className={className}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackSrc) {
              target.src = fallbackSrc;
            }
          }}
        />
      );
  }
};