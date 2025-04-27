import { ImageCarousel } from "@/app/components/ImageCarousel";
import React from "react";

export const CarruselImagenComponents = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
        Um Olhar Sobre Nossa Comunidade
        </h2>
        <ImageCarousel />
      </div>
    </section>
  );
};
