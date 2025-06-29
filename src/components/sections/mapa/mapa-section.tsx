import { MapPin } from "lucide-react";
import { MapboxLocation } from "./mapa";


export const LocationSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Encontre-nos
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <MapboxLocation
            latitude={-23.6743587}
            longitude={-46.4922899}
            title="Igreja Batista Renovada Sonho de Deus"
            description="Estamos esperando sua visita"
            address="São Paulo - SP"
            zoom={15}
            height="450px"
          />
        </div>
      </div>
    </section>
  );
};

// Versão com informações adicionais e melhor responsividade
export const LocationSectionComplete = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Localização</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre-nos facilmente e venha nos visitar. Estamos esperando você!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Informações da Igreja */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  Endereço
                </h3>
                <div className="text-sm ">
  <p>Rua Luis Gomes Pain, nº 300</p>
  <p>Jardim Marek - Santo André, SP</p>
  <p>CEP: 09111-580</p>
</div>

                
               <div>
                    <h4 className="font-medium text-gray-900 mb-1">Horários de Cultos:</h4>
                    <p className="text-gray-600">
                      • Domingo: 8h (Consagração)<br />
                      • Domingo: 9h (EBD)<br />
                      • Domingo: 18h (Culto)<br />
                      • Segunda-feira: 19h30 (Estudo Bíblico)<br />
                      • Quarta-feira: 19h30 (Culto)<br />
                      • Sexta-feira: 19h30 (Culto)
                    </p>
                  </div>
              </div>

            

              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Contato</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Telefone:</strong> (11) 9999-9999</p>
                  <p><strong>WhatsApp:</strong> (11) 9999-9999</p>
                  <p><strong>Email:</strong> contato@igreja.com</p>
                </div>
              </div> */}
            </div>

            {/* Mapa */}
            <div className="order-1 lg:order-2">
              <MapboxLocation
                latitude={-23.6743587}
                longitude={-46.4922899}
                title="Igreja Batista Renovada Sonho de Deus"
                description="Venha nos conhecer!"
                address="São Paulo - SP"
                zoom={16}
                height="500px"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};