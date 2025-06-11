"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ShoppingCart,
  Search,
  Filter,
  History,
  ArrowUpDown,
  Grid3X3,
  Star,
  Minus,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Home,
  Phone,
  FileText,
  Menu,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface Product {
  id: number
  name: string
  price: number
  description: string
  brand: string
  category: string
  image: string
  isFavorite: boolean
}

interface CartItem {
  product: Product
  quantity: number
}

interface FilterState {
  categories: string[]
  brands: string[]
  types: string[]
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Set de Bolígrafos Premium",
    price: 1200,
    description: "Set de bolígrafos de alta calidad con tinta gel premium para escritura suave",
    brand: "PaperMate",
    category: "premium",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Cuaderno Ejecutivo",
    price: 800,
    description: "Cuaderno estándar con buena relación calidad-precio para uso diario",
    brand: "Norma",
    category: "estandar",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Lápices Básicos Pack x12",
    price: 500,
    description: "Pack de lápices básicos para necesidades esenciales de escritura",
    brand: "Faber",
    category: "basico",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Archivador Premium",
    price: 2500,
    description: "Archivador de lujo con acabados premium y gran capacidad",
    brand: "Leitz",
    category: "premium",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Carpetas Estándar x10",
    price: 1500,
    description: "Set de carpetas estándar para organización de documentos",
    brand: "Wilson",
    category: "estandar",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: true,
  },
  {
    id: 6,
    name: "Grapadora Básica",
    price: 300,
    description: "Grapadora básica para uso cotidiano en oficina",
    brand: "Rapid",
    category: "basico",
    image: "/placeholder.svg?height=200&width=300",
    isFavorite: false,
  },
]

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [activeTab, setActiveTab] = useState<"productos" | "favoritos">("productos")
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productQuantity, setProductQuantity] = useState(1)
  const [orderNotes, setOrderNotes] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    types: [],
  })
  const [showSidebar, setShowSidebar] = useState(false)

  // Estados para colapsar/expandir secciones
  const [isProductListExpanded, setIsProductListExpanded] = useState(true)
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true)

  const categories = [
    { id: "todos", name: "Lista de Productos", icon: Grid3X3 },
    { id: "premium", name: "Producto Premium", icon: Star },
    { id: "estandar", name: "Producto Estándar", icon: Heart },
    { id: "basico", name: "Producto Básico", icon: Heart },
    { id: "especial", name: "Producto Especial", icon: Heart },
    { id: "economico", name: "Producto Económico", icon: Heart },
    { id: "exclusivo", name: "Producto Exclusivo", icon: Heart },
  ]

  const toggleFavorite = (productId: number) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, isFavorite: !product.isFavorite } : product)),
    )
  }

  const addToCart = (productId: number, quantity = 1) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existingItem = cartItems.find((item) => item.product.id === productId)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCartItems([...cartItems, { product, quantity }])
    }
  }

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(cartItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setProductQuantity(1)
    setShowProductModal(true)
  }

  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      addToCart(selectedProduct.id, productQuantity)
      setShowProductModal(false)
    }
  }

  const applyFilters = () => {
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({ categories: [], brands: [], types: [] })
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "productos" || (activeTab === "favoritos" && product.isFavorite)

    const matchesFilterCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
    const matchesFilterBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
    const productType = `Tipo${(product.id % 3) + 1}`
    const matchesFilterType = filters.types.length === 0 || filters.types.includes(productType)

    return (
      matchesCategory && matchesSearch && matchesTab && matchesFilterCategory && matchesFilterBrand && matchesFilterType
    )
  })

  const favoriteProducts = products.filter((product) => product.isFavorite)

  const getCategoryBadge = (category: string) => {
    const badges = {
      premium: { text: "Premium", className: "bg-yellow-600 text-white" },
      estandar: { text: "Estándar", className: "bg-blue-600 text-white" },
      basico: { text: "Básico", className: "bg-gray-600 text-white" },
    }
    return badges[category as keyof typeof badges] || { text: "Producto", className: "bg-gray-500 text-white" }
  }

  // Sidebar para móviles
  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:shadow-none md:w-64 md:border-r md:border-gray-200`}
    >
      <div className="p-6 space-y-6">
        {/* Lista de Productos */}
        <div>
          <button
            onClick={() => setIsProductListExpanded(!isProductListExpanded)}
            className="flex items-center gap-2 w-full text-left text-lg font-semibold mb-4 hover:text-blue-600 transition-colors text-gray-900"
          >
            <Grid3X3 className="h-4 w-4" />
            Lista de Productos
            {isProductListExpanded ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>

          {isProductListExpanded && (
            <div className="space-y-2">
              {products.length === 0 ? (
                <p className="text-gray-500 text-sm px-3 py-2">No hay productos disponibles</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="flex-shrink-0"
                        aria-label={product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <Heart
                          className={`h-4 w-4 ${product.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                        />
                      </button>

                      <span className="text-sm truncate text-gray-700">{product.name}</span>
                    </div>
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label={`Agregar ${product.name} al pedido`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Sección de Favoritos */}
        <div>
          <button
            onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
            className="flex items-center gap-2 w-full text-left text-lg font-semibold mb-4 hover:text-blue-600 transition-colors text-gray-900"
          >
            <Star className="h-4 w-4" />
            Sección de Favoritos
            {isFavoritesExpanded ? (
              <ChevronDown className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>

          {isFavoritesExpanded && (
            <div className="space-y-2">
              {favoriteProducts.length === 0 ? (
                <p className="text-gray-500 text-sm px-3 py-2">No tiene productos favoritos</p>
              ) : (
                favoriteProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="flex-shrink-0"
                        aria-label={product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      </button>

                      <span className="text-sm truncate text-gray-700">{product.name}</span>
                    </div>
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label={`Agregar ${product.name} al pedido`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>

                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setShowSidebar(!showSidebar)}
              aria-label={showSidebar ? "Cerrar menú lateral" : "Abrir menú lateral"}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
              <p className="text-gray-600 mt-1">Explore nuestra selección de productos y haga sus reservaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300 text-gray-900 w-48 md:w-64 lg:w-80"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="relative border-gray-300"
              onClick={() => setShowCart(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-600">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="icon" className="border-gray-300" onClick={() => setShowFilters(true)}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="sm:hidden relative mt-4 mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
          <Button variant="outline" className="border-gray-300 text-gray-600 text-xs sm:text-sm">
            <History className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Historial
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-600 text-xs sm:text-sm">
            <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Ordenar
          </Button>
        </div>

        {/* Pequeñas vistas de botones de la página principal */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Accesos Rápidos</h3>
          <div className="flex gap-2 min-w-max">
            <Link href="/">
              <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
                <Home className="h-3 w-3 mr-1" />
                Inicio
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
              <FileText className="h-3 w-3 mr-1" />
              Conocer más
            </Button>
            <Button size="sm" className="text-xs bg-blue-600 text-white hover:bg-blue-700">
              <Phone className="h-3 w-3 mr-1" />
              Solicitar Cotización
            </Button>
            <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
              Solicitar demostración
            </Button>
            <Button size="sm" variant="outline" className="text-xs border-gray-300 hover:bg-gray-100">
              Contactar ahora
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 bg-gray-50">
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2">
            <Button
              variant={activeTab === "productos" ? "default" : "outline"}
              onClick={() => setActiveTab("productos")}
              className={
                activeTab === "productos"
                  ? "bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
              }
            >
              Lista de Productos
            </Button>
            <Button
              variant={activeTab === "favoritos" ? "default" : "outline"}
              onClick={() => setActiveTab("favoritos")}
              className={
                activeTab === "favoritos"
                  ? "bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
              }
            >
              Sección de Favoritos
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const badge = getCategoryBadge(product.category)
              return (
                <Card
                  key={product.id}
                  className="bg-white border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div
                      className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center cursor-pointer"
                      onClick={() => openProductModal(product)}
                    >
                      <div className="text-6xl font-bold text-yellow-500 opacity-20">OFFICE</div>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover opacity-60"
                      />
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      aria-label={product.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      <Heart className={`h-4 w-4 ${product.isFavorite ? "text-red-500 fill-current" : "text-white"}`} />
                    </button>

                    <Badge className={`absolute top-3 left-3 ${badge.className}`}>{badge.text}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">${product.price}</p>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <p className="text-gray-500 text-xs mb-4">Marca: {product.brand}</p>
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Agregar al carrito
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No se encontraron productos</p>
              <p className="text-gray-500 text-sm mt-2">
                {activeTab === "favoritos"
                  ? "No tienes productos favoritos aún"
                  : "Intenta ajustar tus filtros de búsqueda"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal del Carrito */}
      {showCart && (
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Carrito de Reservación</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Productos en el carrito */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Productos en su carrito</h3>
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No hay productos en el carrito</p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-400">IMG</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-gray-600">${item.product.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-gray-300"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-gray-300"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-gray-300 text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Resumen y notas */}
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Resumen</h3>
                  <div className="space-y-2">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-sm">El carrito está vacío</p>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span>
                              {item.product.name} x{item.quantity}
                            </span>
                            <span>${item.product.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${getTotalPrice()}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Notas adicionales</h3>
                  <Textarea
                    placeholder="Agregue cualquier información adicional sobre su pedido"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="bg-gray-50 border-gray-300 text-gray-900"
                    rows={4}
                  />
                  <Button
                    className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700"
                    disabled={cartItems.length === 0}
                  >
                    Enviar pedido sugerido
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Filtros */}
      {showFilters && (
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogContent className="bg-white border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Filtros</DialogTitle>
              <p className="text-gray-600">Filtre los productos por categoría, marca y tipo</p>
            </DialogHeader>

            <div className="space-y-6">
              {/* Categorías */}
              <div>
                <h3 className="font-semibold mb-3">Categorías</h3>
                <div className="space-y-2">
                  {["premium", "estandar", "basico", "especial", "economico"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters((prev) => ({ ...prev, categories: [...prev.categories, category] }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              categories: prev.categories.filter((c) => c !== category),
                            }))
                          }
                        }}
                      />
                      <label htmlFor={category} className="text-sm capitalize">
                        {category === "estandar"
                          ? "Estándar"
                          : category === "basico"
                            ? "Básico"
                            : category === "economico"
                              ? "Económico"
                              : category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marcas */}
              <div>
                <h3 className="font-semibold mb-3">Marcas</h3>
                <div className="space-y-2">
                  {["PaperMate", "Norma", "Faber", "Leitz"].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters((prev) => ({ ...prev, brands: [...prev.brands, brand] }))
                          } else {
                            setFilters((prev) => ({ ...prev, brands: prev.brands.filter((b) => b !== brand) }))
                          }
                        }}
                      />
                      <label htmlFor={brand} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipos */}
              <div>
                <h3 className="font-semibold mb-3">Tipos</h3>
                <div className="space-y-2">
                  {["Tipo1", "Tipo2", "Tipo3"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.types.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters((prev) => ({ ...prev, types: [...prev.types, type] }))
                          } else {
                            setFilters((prev) => ({ ...prev, types: prev.types.filter((t) => t !== type) }))
                          }
                        }}
                      />
                      <label htmlFor={type} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Limpiar filtros
              </Button>
              <Button onClick={applyFilters} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                Aplicar filtros
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Producto */}
      {showProductModal && selectedProduct && (
        <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Imagen del producto */}
              <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-6xl font-bold text-yellow-500 opacity-30">OFFICE</div>
              </div>

              {/* Detalles del producto */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={getCategoryBadge(selectedProduct.category).className}>
                      {getCategoryBadge(selectedProduct.category).text}
                    </Badge>
                    <h2 className="text-2xl font-bold mt-2">{selectedProduct.name}</h2>
                    <p className="text-gray-600">Marca: {selectedProduct.brand}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label={selectedProduct.isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    <Heart
                      className={`h-5 w-5 ${selectedProduct.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                    />
                  </button>

                </div>

                <p className="text-3xl font-bold">${selectedProduct.price}</p>
                <p className="text-gray-700">{selectedProduct.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-gray-300"
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{productQuantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-gray-300"
                      onClick={() => setProductQuantity(productQuantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button onClick={handleAddToCartFromModal} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
