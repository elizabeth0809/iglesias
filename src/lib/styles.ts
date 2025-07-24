// lib/styles/background-variants.ts

export type BackgroundVariant = 'light' | 'dark' | 'gradient' | 'white';

export interface BackgroundVariantProps {
  backgroundVariant?: BackgroundVariant;
}

export const backgroundClasses: Record<BackgroundVariant, string> = {
  light: 'bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50',
  dark: 'bg-gradient-to-br from-church-blue-800 to-church-blue-900',
  gradient: 'bg-gradient-to-br from-church-gold-100 via-church-sky-50 to-church-blue-100',
  white: 'bg-white'
};

export const textClasses: Record<BackgroundVariant, string> = {
  light: 'text-church-blue-900',
  dark: 'text-white',
  gradient: 'text-church-blue-900',
  white: 'text-church-blue-900'
};

export const subtextClasses: Record<BackgroundVariant, string> = {
  light: 'text-church-blue-600',
  dark: 'text-church-sky-200',
  gradient: 'text-church-blue-700',
  white: 'text-church-blue-600'
};

// Función helper para determinar si es tema oscuro
export const isDarkVariant = (variant: BackgroundVariant): boolean => {
  return variant === 'dark';
};

// Clases para botones según la variante
export const buttonClasses: Record<BackgroundVariant, {
  primary: string;
  secondary: string;
  outline: string;
}> = {
  light: {
    primary: 'bg-church-gold-500 hover:bg-church-gold-600 text-white',
    secondary: 'bg-church-blue-500 hover:bg-church-blue-600 text-white',
    outline: 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
  },
  dark: {
    primary: 'bg-church-gold-500 hover:bg-church-gold-600 text-white',
    secondary: 'bg-church-sky-500 hover:bg-church-sky-600 text-white',
    outline: 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm'
  },
  gradient: {
    primary: 'bg-church-gold-500 hover:bg-church-gold-600 text-white',
    secondary: 'bg-church-blue-500 hover:bg-church-blue-600 text-white',
    outline: 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
  },
  white: {
    primary: 'bg-church-gold-500 hover:bg-church-gold-600 text-white',
    secondary: 'bg-church-blue-500 hover:bg-church-blue-600 text-white',
    outline: 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
  }
};

// Clases para cards según la variante
export const cardClasses: Record<BackgroundVariant, string> = {
  light: 'bg-white/90 backdrop-blur-sm border-church-sky-200',
  dark: 'bg-church-blue-800/80 backdrop-blur-sm border-church-blue-600',
  gradient: 'bg-white/90 backdrop-blur-sm border-church-gold-200',
  white: 'bg-white border-church-sky-200'
};

// Clases para overlays/containers según la variante
export const overlayClasses: Record<BackgroundVariant, string> = {
  light: 'bg-white/60 border border-church-gold-200 backdrop-blur-sm',
  dark: 'bg-church-blue-700/50 border border-church-blue-600 backdrop-blur-sm',
  gradient: 'bg-white/70 border border-church-gold-200 backdrop-blur-sm',
  white: 'bg-gray-50 border border-church-sky-200'
};

// Helper function para obtener todas las clases de una variante
export const getVariantClasses = (variant: BackgroundVariant) => ({
  background: backgroundClasses[variant],
  text: textClasses[variant],
  subtext: subtextClasses[variant],
  isDark: isDarkVariant(variant),
  buttons: buttonClasses[variant],
  card: cardClasses[variant],
  overlay: overlayClasses[variant]
});