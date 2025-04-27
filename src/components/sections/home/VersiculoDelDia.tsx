import React from "react";

export const VersiculoDelDia = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Versículo del Día</h2>
        <blockquote className="text-2xl italic mb-4">
          Porque de tal manera amó Dios al mundo, que ha dado a su Hijo
          unigénito, para que todo aquel que en él cree, no se pierda, mas tenga
          vida eterna.
        </blockquote>
        <cite>— Juan 3:16</cite>
      </div>
    </section>
  );
};
