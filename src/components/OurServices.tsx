import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, FileSearch } from "lucide-react";
import Link from "next/link";

export default function OurServices() {
  return (
    <section className="bg-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-400 text-lg font-medium mb-4">
            Nuestros Servicios
          </h2>
          <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Recursos Legales Integrales
          </h3>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            Descubre las herramientas y recursos diseñados para mejorar tu
            práctica legal y proporcionarte la información más actualizada.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Legal Library Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Biblioteca Jurídica
                </h4>
                <BookOpen className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" />
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Accede a miles de documentos legales, leyes y decretos
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Nuestra colección integral incluye los documentos legales más
                recientes, organizados y de fácil acceso.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
                asChild
              >
                <Link href="/collections">
                  Explorar Biblioteca
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Legal Updates Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Actualizaciones Legales
                </h4>
                {/* <FileText className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" /> */}
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Mantente informado con los últimos desarrollos legales
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Recibe actualizaciones oportunas sobre nuevas leyes, enmiendas y
                cambios legales importantes que afectan tu práctica.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
              >
                Ver Actualizaciones
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Document Search Card */}
          <Card className="bg-transparent border-none shadow-none group hover:bg-white transition-all duration-300 ease-in-out">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-between">
                <h4 className="text-white group-hover:text-slate-800 text-2xl font-bold mb-4 transition-colors duration-300">
                  Búsqueda de Documentos
                </h4>

                <FileSearch className="w-12 h-12 text-white group-hover:text-slate-800 transition-colors duration-300" />
              </div>

              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Encuentra documentos legales específicos de forma rápida y
                eficiente
              </p>
              <p className="text-gray-300 group-hover:text-gray-600 text-lg font-medium mb-6 transition-colors duration-300">
                Nuestras potentes herramientas de búsqueda te ayudan a localizar
                exactamente lo que necesitas dentro de nuestra amplia colección.
              </p>
              <Button
                variant="outline"
                className="bg-white rounded-full text-slate-800 border-white hover:bg-slate-100 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300"
                asChild
              >
                <Link href="/collections">
                  Explorar Biblioteca
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
