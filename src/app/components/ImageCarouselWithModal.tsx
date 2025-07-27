import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Expand, X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

interface ImageCarouselWithModalProps {
  currentImages: any[];
  currentImagenEventoData: any;
  visibleImages: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isDark: boolean;
  nextImage: () => void;
  prevImage: () => void;
}

export const ImageCarouselWithModal = ({
  currentImages,
  currentImagenEventoData,
  visibleImages,
  hoveredIndex,
  setHoveredIndex,
  currentImageIndex,
  setCurrentImageIndex,
  isDark,
  nextImage,
  prevImage
}: ImageCarouselWithModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex > 0 ? selectedImageIndex - 1 : currentImages.length - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex < currentImages.length - 1 ? selectedImageIndex + 1 : 0
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const handleDownload = async () => {
    if (selectedImageIndex !== null) {
      const imageUrl = currentImages[selectedImageIndex].url;
      const imageName = currentImages[selectedImageIndex].name || `imagem-${selectedImageIndex + 1}`;
      
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${imageName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao baixar imagem:', error);
      }
    }
  };

  const handleShare = async () => {
    if (selectedImageIndex !== null && navigator.share) {
      try {
        await navigator.share({
          title: currentImages[selectedImageIndex].name || 'Imagem do evento',
          text: `Confira esta imagem do evento: ${currentImagenEventoData.titulo}`,
          url: currentImages[selectedImageIndex].url,
        });
      } catch (error) {
        console.log('Compartilhamento cancelado ou não suportado');
      }
    } else {
      if (selectedImageIndex !== null) {
        navigator.clipboard.writeText(currentImages[selectedImageIndex].url);
        alert('Link da imagem copiado para área de transferência!');
      }
    }
  };

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * (100 / visibleImages)}%)`,
          }}
        >
          {currentImages.map((imagen, index) => (
            <div
              key={imagen.id}
              className="px-4 flex-shrink-0"
              style={{ width: `${100 / visibleImages}%` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
                <Image
                  src={imagen.url}
                  alt={imagen.name || `Imagem ${index + 1} - ${currentImagenEventoData.titulo}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  priority={index < 3}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4 w-12 h-12 bg-church-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30 text-white"
                    variant="outline"
                    onClick={() => openModal(index)}
                  >
                    <Expand className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold text-church-blue-900 mb-1">
                      {imagen.name || `Imagem ${index + 1}`}
                    </h3>
                    <p className="text-church-blue-600 text-sm">
                      {currentImagenEventoData.titulo}
                    </p>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'border-church-gold-400 shadow-lg shadow-church-gold-400/25' 
                    : 'border-transparent'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navegación de imágenes */}
        {currentImages.length > visibleImages && (
          <>
            <Button
              variant="outline"
              size="icon"
              className={`absolute top-1/2 left-2 transform -translate-y-1/2 transition-all duration-300 z-10 shadow-xl ${
                isDark 
                  ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
                  : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
              }`}
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`absolute top-1/2 right-2 transform -translate-y-1/2 transition-all duration-300 z-10 shadow-xl ${
                isDark 
                  ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
                  : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
              }`}
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Indicadores */}
        {currentImages.length > visibleImages && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {Array.from({ length: currentImages.length - (visibleImages - 1) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                    index === currentImageIndex 
                      ? "bg-church-gold-500 scale-125 shadow-church-gold-500/50" 
                      : isDark 
                        ? "bg-church-blue-300 hover:bg-church-gold-400" 
                        : "bg-church-sky-300 hover:bg-church-gold-400"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              )
            )}
          </div>
        )}

        {/* Contador de imágenes */}
        <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${
          isDark 
            ? 'bg-church-blue-800/80 text-church-sky-200' 
            : 'bg-white/80 text-church-blue-700'
        }`}>
          <span className="text-sm font-medium">
            {currentImageIndex + 1} de {currentImages.length - (visibleImages - 1)} grupos
          </span>
        </div>
      </div>

      {/* Modal de imagen en pantalla completa */}
      {isModalOpen && selectedImageIndex !== null && currentImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Botón de cerrar */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={closeModal}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Controles de navegación */}
          {currentImages.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Controles adicionales */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Contador de imágenes */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            {selectedImageIndex + 1} / {currentImages.length}
          </div>

          {/* Imagen principal */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full">
              <Image
                src={currentImages[selectedImageIndex].url}
                alt={currentImages[selectedImageIndex].name || `Imagem ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Información de la imagen */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm">
            <h3 className="font-semibold mb-1">
              {currentImages[selectedImageIndex].name || `Imagem ${selectedImageIndex + 1}`}
            </h3>
            <p className="text-sm text-white/80">
              {currentImagenEventoData.titulo}
            </p>
          </div>

          {/* Miniaturas en la parte inferior */}
          {currentImages.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex space-x-2 max-w-full overflow-x-auto px-4">
              {currentImages.map((img, idx) => (
                <button
                  key={img.id}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    idx === selectedImageIndex 
                      ? 'ring-2 ring-church-gold-400 scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(idx);
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.name || `Miniatura ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};