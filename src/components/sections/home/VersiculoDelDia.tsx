import React from "react";

export const VersiculoDelDia = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Versículo do Dia</h2>
        <blockquote className="text-2xl italic mb-4">
          Pois Deus amou o mundo de tal maneira que deu o seu único Filho,
          para que todo aquele que nele crê não morra, mas tenha a vida eterna.
        </blockquote>
        <cite>— João 3:16</cite>
      </div>
    </section>
  );
};
