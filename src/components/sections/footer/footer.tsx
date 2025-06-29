import Link from "next/link";
import Image from "next/image";
import { MapPin,  Clock, Facebook, Instagram } from "lucide-react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/eventos", label: "Atividades" },
  { href: "/blog", label: "Blogs" },
  { href: "/sermones", label: "Sermões" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Igreja Batista Renovada Sonho de Deus</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Um lugar de fé, esperança e amor. Venha fazer parte da nossa 
              família e crescer espiritualmente conosco.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/share/19RS1iXiJo/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </Link>
              <Link 
                href="https://www.instagram.com/ibr_sonhodedeus?igsh=MXY0OWx3Nzk1dGo1NA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </Link>
              
            </div>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navegação</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Rua Luis Gomes Pain, nº 300</p>
                  <p>Jardim Marek, Santo André - SP</p>
                  <p>CEP: 09111-580</p>
                </div>
              </div>
              
              {/* Telefone - Comentado para futuras atualizações */}
              {/*
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>(11) 9999-9999</p>
                  <p>(11) 9999-9999 (WhatsApp)</p>
                </div>
              </div>
              */}
              
              {/* Email - Comentado para futuras atualizações */}
              {/*
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">contato@igreja.com</p>
              </div>
              */}
            </div>
          </div>

          {/* Horários */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horários dos Cultos</h3>
            <div className="flex items-start space-x-3">
              <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300 space-y-1">
                <p><span className="font-medium">Domingo:</span></p>
                <p className="ml-2">8h (Consagração)</p>
                <p className="ml-2">9h (EBD)</p>
                <p className="ml-2">18h (Culto)</p>
                
                <p className="pt-2"><span className="font-medium">Durante a semana:</span></p>
                <p className="ml-2">Segunda: 19h30 (Estudo Bíblico)</p>
                <p className="ml-2">Quarta: 19h30 (Culto)</p>
                <p className="ml-2">Sexta: 19h30 (Culto)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Igreja Batista Renovada Sonho de Deus. Todos os direitos reservados.
            </p>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              {/* <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Termos de Uso
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Versão mais simples do footer
export function SimpleFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-3">
              <Image 
                src="/logo.jpg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-bold">Igreja Batista Renovada Sonho de Deus</span>
            </Link>
          </div>

          {/* Navegação */}
          <div className="text-center">
            <h3 className="font-semibold mb-3">Links Rápidos</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-3">Contato</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>(11) 9999-9999</p>
              <p>contato@igreja.com</p>
              <p>São Paulo - SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Igreja Batista Renovada Sonho de Deus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}