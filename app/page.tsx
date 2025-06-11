import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, FileText, Briefcase, Package, Truck, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">OfficeSupply</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Productos
            </Link>
            <Link href="/catalogo" className="text-sm font-medium hover:text-blue-600">
              Catálogos
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Distribución
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Contacto
            </Link>
          </nav>
          <Button>Solicitar Cotización</Button>
        </div>
      </header>

      <main>
        {/* Sección Hero */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Distribución Eficiente de Material de Oficina
              </h1>
              <p className="text-gray-600 max-w-md">
                Optimice su cadena de suministro con nuestro sistema integral de distribución de material de escritorio
                para empresas de todos los tamaños.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg">Conocer más</Button>
                <Link href="/catalogo">
                  <Button variant="outline" size="lg">
                    Ver catálogo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sistema de distribución"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sección de servicios */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
              <p className="text-gray-600">
                Ofrecemos soluciones completas para la gestión y distribución de material de escritorio, adaptadas a las
                necesidades específicas de su empresa.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Pencil className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Material de Escritura</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 p-4 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Papelería</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Organización</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Distribución</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <span className="font-medium">Soporte</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de características */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Sistema de Gestión Integral</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Control de inventario en tiempo real para optimizar sus pedidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Entregas programadas según las necesidades de su empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Reportes detallados de consumo y proyecciones de demanda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Plataforma digital para realizar pedidos de forma sencilla</span>
                </li>
              </ul>
              <Button className="mt-4">Solicitar demostración</Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden border">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Sistema de gestión"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sección de productos */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Catálogo de Productos</h2>
              <p className="text-gray-600">
                Descubra nuestra amplia gama de productos de oficina de alta calidad para satisfacer todas sus
                necesidades.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 pt-8">
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=300" alt="Papelería" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Papelería</h3>
                  <p className="text-sm text-gray-600">Papel, cuadernos, libretas</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=300" alt="Escritura" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Escritura</h3>
                  <p className="text-sm text-gray-600">Bolígrafos, lápices, marcadores</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=300" alt="Organización" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Organización</h3>
                  <p className="text-sm text-gray-600">Archivadores, carpetas, separadores</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=200&width=300" alt="Accesorios" fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Accesorios</h3>
                  <p className="text-sm text-gray-600">Grapadoras, tijeras, pegamento</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sección de testimonios */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Nuestros Clientes</h2>
              <p className="text-gray-600">
                Empresas que confían en nuestro sistema de distribución de material de escritorio.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 pt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="font-medium text-blue-600">AC</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Acme Corp</h4>
                    <p className="text-sm text-gray-600">Sector Tecnológico</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "El sistema de distribución ha mejorado significativamente nuestra gestión de inventario de oficina."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="font-medium text-blue-600">GI</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Global Inc</h4>
                    <p className="text-sm text-gray-600">Sector Financiero</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Hemos reducido costos y optimizado nuestros procesos de compra de material de oficina."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="font-medium text-blue-600">TS</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Tech Solutions</h4>
                    <p className="text-sm text-gray-600">Sector Consultoría</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "La plataforma digital es intuitiva y nos permite realizar pedidos de forma rápida y eficiente."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="font-medium text-blue-600">ME</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Mega Enterprises</h4>
                    <p className="text-sm text-gray-600">Sector Retail</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "El servicio de distribución es puntual y el soporte técnico siempre está disponible para ayudarnos."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">¿Listo para optimizar su distribución?</h2>
                <p className="text-gray-600">Contáctenos hoy para una consulta personalizada sobre nuestro sistema.</p>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg">Contactar ahora</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">OfficeSupply</span>
              </div>
              <p className="text-sm">Soluciones integrales para la distribución de material de escritorio y oficina.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Productos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Papelería
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Escritura
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Organización
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Accesorios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Distribución
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Gestión de inventario
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Plataforma digital
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Soporte técnico
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>info@officesupply.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Calle Principal, Ciudad</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © {new Date().getFullYear()} OfficeSupply. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
