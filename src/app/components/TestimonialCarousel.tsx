"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Esta igreja transformou a minha vida. Encontrei uma comunidade acolhedora e um propósito maior.",
    author: "Maria González",
    role: "Membro desde 2018",
  },
  {
    quote:
      "Os sermões são inspiradores e relevantes para o meu dia a dia. Sinto-me renovado a cada semana.",
    author: "Juan Pérez",
    role: "Membro desde 2020",
  },
  {
    quote:
      "O programa juvenil tem sido uma bênção para os meus filhos. Eles cresceram muito na sua fé.",
    author: "Ana Rodríguez",
    role: "Mãe e membro desde 2015",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic">
            {testimonials[currentIndex].quote}
          </blockquote>
          <footer className="mt-4 text-right">
            <cite>
              — {testimonials[currentIndex].author},{" "}
              {testimonials[currentIndex].role}
            </cite>
          </footer>
        </CardContent>
      </Card>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
