import { Toaster } from 'sonner';

export function CustomToaster() {
  return (
    <Toaster 
      position="bottom-left"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          // Personalizar por tipo
          success: 'group-[.toaster]:bg-church-blue-500 group-[.toaster]:text-white group-[.toaster]:border-church-blue-600',
          error: 'group-[.toaster]:bg-church-red-500 group-[.toaster]:text-white group-[.toaster]:border-church-red-600',
          warning: 'group-[.toaster]:bg-church-gold-500 group-[.toaster]:text-white group-[.toaster]:border-church-gold-600',
          info: 'group-[.toaster]:bg-church-sky-300 group-[.toaster]:text-white group-[.toaster]:border-church-sky-400',
        },
      }}
      theme="light" 
      richColors={false} // Desactivar colores por defecto para usar los nuestros
    />
  );
}