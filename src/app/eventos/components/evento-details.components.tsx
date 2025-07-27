// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { CalendarIcon, MapPinIcon, ArrowLeftIcon, ClockIcon, Sparkles, Heart, Phone, Share2, Check, Copy } from 'lucide-react';
// import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
// import { useEffect, useState } from 'react';

// interface EventoDetailComponentProps {
//   evento: IEventoResponse;
// }

// export const EventoDetailComponent = ({ evento }: EventoDetailComponentProps) => {
//   const [mounted, setMounted] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isSharing, setIsSharing] = useState(false);
//   const [shareSuccess, setShareSuccess] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     setTimeout(() => setIsLoaded(true), 100);
//   }, []);

//   const isMobileDevice = () => {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
//            (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
//   };

//   // Función para compartir el evento
//   const handleShareEvent = async () => {
//     if (isSharing) return;

//     setIsSharing(true);

//     try {
//       // Obtener la URL actual
//       const currentUrl = window.location.href;
      
//       // En dispositivos móviles, intentar usar Web Share API
//       if (isMobileDevice() && navigator.share) {
//         const shareData = {
//           title: `${evento.nome} - Evento da Igreja`,
//           text: `Participe do evento "${evento.nome}" em ${evento.localizacao}. Data: ${formatDatetime(evento.data_inicio)}`,
//           url: currentUrl
//         };

//         try {
//           await navigator.share(shareData);
//           setShareSuccess(true);
//         } catch (shareError) {
//           if (
//             typeof shareError === 'object' &&
//             shareError !== null &&
//             'name' in shareError &&
//             (shareError as { name?: unknown }).name === 'AbortError'
//           ) {
//             console.log('Share cancelado pelo usuário');
//           }
//           await copyToClipboard(currentUrl);
//         }
//       } else {
//         // En PC o si no hay Web Share API, solo copiar la URL
//         await copyToClipboard(currentUrl);
//       }
//     } catch (error) {
//       console.error('Erro ao compartilhar:', error);
//       // Fallback final: copiar solo la URL
//       try {
//         await copyToClipboard(window.location.href);
//       } catch (clipboardError) {
//         console.error('Erro ao copiar para clipboard:', clipboardError);
//       }
//     } finally {
//       setIsSharing(false);
      
//       // Resetar o estado de sucesso após 3 segundos
//       setTimeout(() => setShareSuccess(false), 3000);
//     }
//   };

//   // Función auxiliar para copiar al clipboard
//   const copyToClipboard = async (text: string) => {
//     if (navigator.clipboard && window.isSecureContext) {
//       await navigator.clipboard.writeText(text);
//     } else {
//       // Fallback para navegadores más antiguos o contextos no seguros
//       const textArea = document.createElement('textarea');
//       textArea.value = text;
//       textArea.style.position = 'fixed';
//       textArea.style.left = '-999999px';
//       textArea.style.top = '-999999px';
//       document.body.appendChild(textArea);
//       textArea.focus();
//       textArea.select();
//       document.execCommand('copy');
//       textArea.remove();
//     }
//     setShareSuccess(true);
//   };

//   const formatDate = (dateString: string) => {
//     if (!mounted) return '';
    
//     return new Date(dateString).toLocaleDateString('pt-BR', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatTime = (dateString: string) => {
//     if (!mounted) return '';
    
//     return new Date(dateString).toLocaleTimeString('pt-BR', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatDatetime = (dateString: string) => {
//     if (!mounted) return '';
    
//     return new Date(dateString).toLocaleDateString('pt-BR', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatDescription = (description: string | null) => {
//     if (!description) return '';
    
//     // Formatear texto que venga después de "tema :" o "TEMA :" en negrita
//     const formattedText = description
//       .replace(/(tema\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Tema:</strong> <strong class="text-church-blue-800">$2</strong>$3')
//       .replace(/(TEMA\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">TEMA:</strong> <strong class="text-church-blue-800">$2</strong>$3')
//       // También formatear otras palabras clave comunes
//       .replace(/(horário\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Horário:</strong> <span class="text-church-blue-700">$2</span>$3')
//       .replace(/(local\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Local:</strong> <span class="text-church-blue-700">$2</span>$3')
//       .replace(/(data\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Data:</strong> <span class="text-church-blue-700">$2</span>$3')
//       // Preservar saltos de línea
//       .replace(/\r?\n/g, '<br>');
    
//     return formattedText;
//   };

//   const isEventUpcoming = () => {
//     if (!mounted) return false;
//     return new Date(evento.data_inicio) > new Date();
//   };

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
//         <div className="container mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-church-sky-300 rounded w-1/4 mb-8"></div>
//             <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden">
//               <div className="h-96 bg-church-sky-200"></div>
//               <div className="p-8">
//                 <div className="h-8 bg-church-sky-200 rounded w-3/4 mb-4"></div>
//                 <div className="h-4 bg-church-sky-100 rounded w-1/2 mb-6"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-church-sky-100 rounded w-full"></div>
//                   <div className="h-4 bg-church-sky-100 rounded w-5/6"></div>
//                   <div className="h-4 bg-church-sky-100 rounded w-4/6"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
//       {/* Decoración de fondo */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
//         <div className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
//       </div>

//       <div className="container mx-auto px-4 py-12 relative z-10">
//         {/* Botón de regreso mejorado */}
//         <div className={`mb-8 transition-all duration-1000 ease-out ${
//           isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
//         }`}>
//           <Link 
//             href="/eventos" 
//             className="group inline-flex items-center px-4 py-2 bg-church-blue-500 text-white rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
//             Voltar aos eventos
//           </Link>
//         </div>

//         {/* Card principal del evento */}
//         <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-church-sky-200 transition-all duration-1000 ease-out delay-200 ${
//           isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
//         }`}>
//           {/* Línea decorativa superior */}
//           <div className="h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
          
//           {/* Imagen del evento */}
//           <div className="relative w-full">
//             <div className="relative overflow-hidden">
//               <Image
//                 src={evento.imagem || "/placeholder.svg"}
//                 alt={evento.nome}
//                 width={1200}
//                 height={600}
//                 className="w-full h-auto max-h-[600px] object-cover"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
//                 priority
//               />
//               {/* Overlay gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
//             </div>
            
//             {/* Overlay con estado del evento */}
//             <div className="absolute top-6 right-6">
//               <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
//                 evento.status === 'ativo' 
//                   ? 'bg-church-gold-500 text-white' 
//                   : 'bg-gray-500 text-white'
//               }`}>
//                 {evento.status === 'ativo' ? '✨ Evento Ativo' : '⏸️ Evento Inativo'}
//               </span>
//             </div>

//             {/* Badge de próximo evento */}
//             {isEventUpcoming() && (
//               <div className="absolute top-6 left-6">
//                 <span className="bg-church-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm animate-pulse">
//                   🔥 Evento Próximo
//                 </span>
//               </div>
//             )}

//             {/* Botón de compartir mejorado */}
//             <div className="absolute bottom-6 right-6">
//               <button 
//                 onClick={handleShareEvent}
//                 disabled={isSharing}
//                 className={`backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
//                   shareSuccess 
//                     ? 'bg-green-500/80 hover:bg-green-600' 
//                     : 'bg-church-blue-500/80 hover:bg-church-blue-600'
//                 } ${isSharing ? 'cursor-not-allowed opacity-70' : ''}`}
//                 title={shareSuccess ? (isMobileDevice() ? 'Compartilhado!' : 'Link copiado!') : (isMobileDevice() ? 'Compartilhar evento' : 'Copiar link do evento')}
//               >
//                 {isSharing ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : shareSuccess ? (
//                   <Check className="w-5 h-5" />
//                 ) : (
//                   <Share2 className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Contenido del evento */}
//           <div className="p-8 md:p-12">
//             {/* Título con decoración */}
//             <div className="text-center mb-8">
//               <div className="flex justify-center mb-4">
//                 <div className="relative bg-church-gold-500 rounded-full p-3 shadow-lg">
//                   <Sparkles className="w-6 h-6 text-white" />
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-red-500 rounded-full flex items-center justify-center">
//                     <Heart className="w-2 h-2 text-white" />
//                   </div>
//                 </div>
//               </div>
//               <h1 className="text-3xl md:text-5xl font-bold text-church-blue-900 mb-4 leading-tight">
//                 {evento.nome}
//               </h1>
//               <div className="w-24 h-1 bg-church-gold-500 mx-auto rounded-full"></div>
//             </div>

//             {/* Información del evento con cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//               {/* Fecha y hora */}
//               <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-church-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <CalendarIcon className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-church-blue-900 mb-2 text-lg">Data e Horário</h3>
//                     <p className="text-church-blue-700 capitalize font-medium mb-2">
//                       {formatDatetime(evento.data_inicio)}
//                     </p>
//                     <div className="flex items-center text-church-blue-600">
//                       <ClockIcon className="h-4 w-4 mr-2" />
//                       <span className="font-medium">{formatTime(evento.data_inicio)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Localización */}
//               <div className="bg-church-red-50 rounded-xl p-6 border border-church-red-200">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-church-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <MapPinIcon className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-church-blue-900 mb-2 text-lg">Local do Evento</h3>
//                     <p className="text-church-blue-700 font-medium">
//                       {evento.localizacao}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Descripción mejorada */}
//             <div className="mb-12">
//               <div className="bg-white/80 rounded-xl p-8 border border-church-gold-200 shadow-lg">
//                 <h3 className="text-2xl font-bold text-church-blue-900 mb-6 flex items-center">
//                   <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center mr-3">
//                     <Heart className="w-4 h-4 text-white" />
//                   </div>
//                   Sobre o Evento
//                 </h3>
//                 <div className="prose max-w-none">
//                   <div 
//                     className="text-church-blue-700 leading-relaxed text-lg"
//                     dangerouslySetInnerHTML={{ 
//                       __html: formatDescription(evento.descricao) 
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {evento.status === 'ativo' && (
//               <div className="bg-gradient-to-r from-church-gold-500 to-church-blue-500 p-8 rounded-xl text-white shadow-xl mb-8">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
//                     <Sparkles className="w-6 h-6 mr-2" />
//                     Interessado em participar?
//                   </h3>
//                   <p className="text-lg mb-6 opacity-90">
//                     Entre em contato conosco para mais informações sobre este evento especial.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link
//                       href="/contato"
//                       className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-blue-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
//                     >
//                       <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
//                       Entre em Contato
//                     </Link>
//                     <button 
//                       onClick={handleShareEvent}
//                       disabled={isSharing}
//                       className={`group inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
//                         shareSuccess 
//                           ? 'bg-green-500 hover:bg-green-600' 
//                           : 'bg-church-red-500 hover:bg-church-red-600'
//                       } text-white ${isSharing ? 'cursor-not-allowed opacity-70' : ''}`}
//                     >
//                       {isSharing ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                           Copiando...
//                         </>
//                       ) : shareSuccess ? (
//                         <>
//                           <Check className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
//                           {isMobileDevice() ? 'Compartilhado!' : 'Link Copiado!'}
//                         </>
//                       ) : (
//                         <>
//                           <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
//                           {isMobileDevice() ? 'Compartilhar Evento' : 'Copiar Link'}
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Información adicional */}
//             <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
//               <h4 className="font-semibold text-church-blue-900 mb-4">Informações do Sistema</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-church-blue-600">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-church-gold-500 rounded-full mr-2"></div>
//                   <span className="font-medium">Criado em:</span>
//                   <span className="ml-1">{formatDate(evento.created_at)}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-church-blue-500 rounded-full mr-2"></div>
//                   <span className="font-medium">Atualizado em:</span>
//                   <span className="ml-1">{formatDate(evento.updated_at)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Toast de notificación */}
//       {shareSuccess && (
//         <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
//           <div className="flex items-center">
//             <Check className="w-5 h-5 mr-2" />
//             {isMobileDevice() ? 'Evento compartilhado!' : 'Link copiado para área de transferência!'}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, ClockIcon, Sparkles, Heart, Phone } from 'lucide-react';
import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
import { useEffect, useState } from 'react';
import { ShareButton } from '@/app/components/shareButton';

interface EventoDetailComponentProps {
  evento: IEventoResponse;
}

export const EventoDetailComponent = ({ evento }: EventoDetailComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return '';
    
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    if (!mounted) return '';
    
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDatetime = (dateString: string) => {
    if (!mounted) return '';
    
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDescription = (description: string | null) => {
    if (!description) return '';
    
    // Formatear texto que venga después de "tema :" o "TEMA :" en negrita
    const formattedText = description
      .replace(/(tema\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Tema:</strong> <strong class="text-church-blue-800">$2</strong>$3')
      .replace(/(TEMA\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">TEMA:</strong> <strong class="text-church-blue-800">$2</strong>$3')
      // También formatear otras palabras clave comunes
      .replace(/(horário\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Horário:</strong> <span class="text-church-blue-700">$2</span>$3')
      .replace(/(local\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Local:</strong> <span class="text-church-blue-700">$2</span>$3')
      .replace(/(data\s*:\s*)(.*?)(\r?\n|$)/gi, '<strong class="text-church-gold-600">Data:</strong> <span class="text-church-blue-700">$2</span>$3')
      // Preservar saltos de línea
      .replace(/\r?\n/g, '<br>');
    
    return formattedText;
  };

  const isEventUpcoming = () => {
    if (!mounted) return false;
    return new Date(evento.data_inicio) > new Date();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-church-sky-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-church-sky-200"></div>
              <div className="p-8">
                <div className="h-8 bg-church-sky-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-church-sky-100 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-church-sky-100 rounded w-full"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-5/6"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Botón de regreso mejorado */}
        <div className={`mb-8 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <Link 
            href="/eventos" 
            className="group inline-flex items-center px-4 py-2 bg-church-blue-500 text-white rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar aos eventos
          </Link>
        </div>

        {/* Card principal del evento */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-church-sky-200 transition-all duration-1000 ease-out delay-200 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          {/* Línea decorativa superior */}
          <div className="h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
          
          {/* Imagen del evento */}
          <div className="relative w-full">
            <div className="relative overflow-hidden">
              <Image
                src={evento.imagem || "/placeholder.svg"}
                alt={evento.nome}
                width={1200}
                height={600}
                className="w-full h-auto max-h-[600px] object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            {/* Overlay con estado del evento */}
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                evento.status === 'ativo' 
                  ? 'bg-church-gold-500 text-white' 
                  : 'bg-gray-500 text-white'
              }`}>
                {evento.status === 'ativo' ? '✨ Evento Ativo' : '⏸️ Evento Inativo'}
              </span>
            </div>

            {/* Badge de próximo evento */}
            {isEventUpcoming() && (
              <div className="absolute top-6 left-6">
                <span className="bg-church-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm animate-pulse">
                  🔥 Evento Próximo
                </span>
              </div>
            )}

            {/* Botón de compartir flotante - USANDO SHAREBUTTON */}
            <div className="absolute bottom-6 right-6">
              <ShareButton
                title={`${evento.nome} - Evento da Igreja`}
                text={`Participe do evento "${evento.nome}" em ${evento.localizacao}. Data: ${formatDatetime(evento.data_inicio)}`}
                variant="floating"
                size="md"
                toastMessage="Link do evento copiado para a área de transferência!"
                onSuccess={(shared) => {
                  console.log(shared ? 'Evento compartilhado via aplicativo' : 'Link copiado para área de transferência');
                }}
              />
            </div>
          </div>

          {/* Contenido del evento */}
          <div className="p-8 md:p-12">
            {/* Título con decoración */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative bg-church-gold-500 rounded-full p-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-church-blue-900 mb-4 leading-tight">
                {evento.nome}
              </h1>
              <div className="w-24 h-1 bg-church-gold-500 mx-auto rounded-full"></div>
            </div>

            {/* Información del evento con cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Fecha y hora */}
              <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-church-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-church-blue-900 mb-2 text-lg">Data e Horário</h3>
                    <p className="text-church-blue-700 capitalize font-medium mb-2">
                      {formatDatetime(evento.data_inicio)}
                    </p>
                    <div className="flex items-center text-church-blue-600">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">{formatTime(evento.data_inicio)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localización */}
              <div className="bg-church-red-50 rounded-xl p-6 border border-church-red-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-church-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-church-blue-900 mb-2 text-lg">Local do Evento</h3>
                    <p className="text-church-blue-700 font-medium">
                      {evento.localizacao}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción mejorada */}
            <div className="mb-12">
              <div className="bg-white/80 rounded-xl p-8 border border-church-gold-200 shadow-lg">
                <h3 className="text-2xl font-bold text-church-blue-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  Sobre o Evento
                </h3>
                <div className="prose max-w-none">
                  <div 
                    className="text-church-blue-700 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ 
                      __html: formatDescription(evento.descricao) 
                    }}
                  />
                </div>
              </div>
            </div>

            {evento.status === 'ativo' && (
              <div className="bg-gradient-to-r from-church-gold-500 to-church-blue-500 p-8 rounded-xl text-white shadow-xl mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Interessado em participar?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Entre em contato conosco para mais informações sobre este evento especial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contato"
                      className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-blue-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Entre em Contato
                    </Link>
                    
                    {/* Botão principal de compartir - USANDO SHAREBUTTON */}
                    <ShareButton
                      title={`${evento.nome} - Evento da Igreja`}
                      text={`Participe do evento "${evento.nome}" em ${evento.localizacao}. Data: ${formatDatetime(evento.data_inicio)}`}
                      shareText="Compartilhar Evento"
                      copyText="Copiar Link do Evento"
                      loadingText="Compartilhando..."
                      successText="Evento Compartilhado!"
                      toastMessage="Link do evento copiado para a área de transferência!"
                      variant="primary"
                      size="md"
                      className="bg-church-red-500 hover:bg-church-red-600 group"
                      onSuccess={(shared) => {
                        console.log(shared ? 'Evento compartilhado via aplicativo nativo' : 'Link copiado para área de transferência');
                      }}
                      onError={(error) => {
                        console.error('Erro ao compartilhar evento:', error);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
              <h4 className="font-semibold text-church-blue-900 mb-4">Informações do Sistema</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-church-blue-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-gold-500 rounded-full mr-2"></div>
                  <span className="font-medium">Criado em:</span>
                  <span className="ml-1">{formatDate(evento.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Atualizado em:</span>
                  <span className="ml-1">{formatDate(evento.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};