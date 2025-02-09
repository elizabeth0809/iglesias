import BibliotecaMedias from "./components/BibliotecaMedias";
import SermonesRecientes from "./components/SermonesRecientes";

export default function SermonesMedias() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sermones y Medios
        </h1>
        <SermonesRecientes />
        <BibliotecaMedias />

      </div>
    </main>
  );
}
