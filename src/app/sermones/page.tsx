// import BibliotecaMedias from "./components/BibliotecaMedias";
// import SermonesRecientes from "./components/SermonesRecientes";

// export default function SermonesMedias() {
//   return (
//     <main className="min-h-screen bg-white">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center">
//           Sermones y Medios
//         </h1>
//         <SermonesRecientes />
//         <BibliotecaMedias />

//       </div>
//     </main>
//   );
// }
import { Metadata } from 'next';
import { getAllSermonsAction } from '@/insfractucture/actions/sermones/get-all-sermones.actions';
import { SermonResponse } from '@/insfractucture/interfaces/sermones/sermones.interfaces';
import { SermonesListComponent } from './components/SermonesList';
 // Asume que existe esta interfaz

// Esta función se ejecuta en el servidor
async function getSermones(): Promise<{ sermones: SermonResponse[]; error?: string }> {
  try {
    const sermonesData = await getAllSermonsAction();
    
    // Manejar diferentes formatos de respuesta
    const sermones = Array.isArray(sermonesData[0]) ? sermonesData[0] : sermonesData;
    
    return { sermones: Array.isArray(sermones) ? sermones : [] };
  } catch (error) {
    console.error('Error fetching sermones:', error);
    return {
      sermones: [],
      error: 'Error al cargar los sermones'
    };
  }
}

interface SermonesPageProps {
  searchParams: Promise<{ page?: string }>; // Para paginación futura
}

export default async function SermonesPage({ searchParams }: SermonesPageProps) {

  console.log('SermonesPage rendered', searchParams);
  const { sermones, error } = await getSermones();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <SermonesListComponent sermones={sermones} />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Sermones | Nossa Igreja',
  description: 'Escucha nuestros sermones y predicas espirituales. Encuentra inspiración y enseñanzas bíblicas.',
  keywords: 'sermones, predicas, igreja, biblia, enseñanzas, espiritual',
  openGraph: {
    title: 'Sermones | Nossa Igreja',
    description: 'Escucha nuestros sermones y predicas espirituales. Encuentra inspiración y enseñanzas bíblicas.',
    type: 'website',
    url: '/sermones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sermones | Nossa Igreja',
    description: 'Escucha nuestros sermones y predicas espirituales.',
  },
};