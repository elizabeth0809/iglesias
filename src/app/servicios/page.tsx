import HorariosMisas from "@/components/Horarios";
import Ministerios from "@/components/Ministerio";
import ProgramasEspeciales from "@/components/Programa";

export default function ServiciosActividades() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Servicios y Actividades
        </h1>
        <HorariosMisas />
        <ProgramasEspeciales />
        <Ministerios />
      </div>
    </main>
  );
}
