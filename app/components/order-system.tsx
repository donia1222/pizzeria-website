"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Check, Loader2, X, AlertTriangle } from "lucide-react"
import { cn } from "../lib/utils"

// Interfaces
export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  popular?: boolean
  vegan?: boolean
  vegetarian?: boolean
  spicy?: boolean
  category: string
  subcategory?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

// Componentes auxiliares
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  [key: string]: any
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-green-800 text-white hover:bg-green-900",
    outline: "border border-white text-white hover:bg-white/10",
    ghost: "text-white hover:bg-gray-800",
    link: "text-[#8c9a56] underline-offset-4 hover:underline",
    icon: "p-0",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({
  className = "",
  type = "text",
  id,
  placeholder,
  required = false,
  ...props
}: {
  className?: string
  type?: string
  id?: string
  placeholder?: string
  required?: boolean
  [key: string]: any
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      required={required}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

const Textarea = ({
  className = "",
  id,
  placeholder,
  rows = 4,
  required = false,
  ...props
}: {
  className?: string
  id?: string
  placeholder?: string
  rows?: number
  required?: boolean
  [key: string]: any
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={cn(
        "flex w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

const Label = ({
  children,
  htmlFor,
  className = "",
  ...props
}: {
  children: React.ReactNode
  htmlFor?: string
  className?: string
  [key: string]: any
}) => {
  return (
    <label htmlFor={htmlFor} className={cn("text-sm font-medium text-gray-300", className)} {...props}>
      {children}
    </label>
  )
}

const Badge = ({
  children,
  variant = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
  [key: string]: any
}) => {
  const variants = {
    default: "bg-green-800 text-white",
    outline: "bg-transparent border border-current",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

const Dialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  )
}

const DialogContent = ({
  children,
  className = "",
  onClose,
  ...props
}: {
  children: React.ReactNode
  className?: string
  onClose?: () => void
  [key: string]: any
}) => {
  return (
    <div
      className={cn(
        "relative z-50 max-w-lg w-full bg-gray-900 border border-gray-800 p-6 shadow-lg rounded-lg max-h-[90vh] overflow-auto",
        className,
      )}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      )}
      {children}
    </div>
  )
}

const DialogHeader = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
}

const DialogTitle = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <h2 className={cn("text-xl font-semibold text-white", className)} {...props}>
      {children}
    </h2>
  )
}

const DialogDescription = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <p className={cn("text-sm text-gray-400", className)} {...props}>
      {children}
    </p>
  )
}

const DialogFooter = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div className={cn("mt-6 flex justify-end", className)} {...props}>
      {children}
    </div>
  )
}

// Componente de elemento del menú
export const MenuItem = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    onAddToCart(item)

    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <motion.div
      className="group relative overflow-hidden bg-gray-900 border border-gray-800 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className={cn(
            "object-cover w-full h-full transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>

        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {item.popular && (
            <Badge variant="default" className="bg-green-800 text-white border-none">
              Beliebt
            </Badge>
          )}
          {item.vegetarian && (
            <Badge variant="outline" className="bg-white text-green-600 border-green-600">
              Vegetarisch
            </Badge>
          )}
          {item.vegan && (
            <Badge variant="outline" className="bg-white text-green-600 border-green-600">
              Vegan
            </Badge>
          )}
          {item.spicy && (
            <Badge variant="outline" className="bg-red-900/50 text-red-400 border-red-700">
              Scharf
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-white">{item.name}</h3>
          <span className="text-[#8c9a56] font-semibold">CHF {item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

        <motion.button
          onClick={handleAddToCart}
          className={cn(
            "w-full py-2 px-4 flex items-center justify-center transition-colors rounded-md",
            isAdded ? "bg-green-700 text-white" : "bg-green-800 text-white hover:bg-green-900",
          )}
          whileTap={{ scale: 0.95 }}
          disabled={isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Hinzugefügt
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4 mr-2" />
              In den Warenkorb
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

// Componente de botón de carrito
export const CartButton = ({ onClick, itemCount }: { onClick: () => void; itemCount: number }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <ShoppingBag className="h-6 w-6 text-white" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-[#8c9a56] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount}
        </span>
      )}
    </motion.button>
  )
}

// Función para obtener las horas disponibles según el día de la semana
function getAvailableHours(): string[] {
  const date = new Date()
  const day = date.getDay() // 0 = domingo, 1 = lunes, ..., 6 = sábado

  // Domingo (0) y Lunes (1) están cerrados
  if (day === 0 || day === 1) {
    return []
  }

  // Horarios para cada día
  const lunchHours = ["11:30", "12:00", "12:30", "13:00", "13:30"]

  // Horarios de cena según el día
  let dinnerHours = []
  if (day === 5 || day === 6) {
    // Viernes y sábado
    dinnerHours = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"]
  } else {
    // Martes, miércoles y jueves
    dinnerHours = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
  }

  return [...lunchHours, ...dinnerHours]
}

// Función para verificar si el restaurante está abierto
function isRestaurantOpen(): boolean {
  return getAvailableHours().length > 0
}

// Función para crear el enlace mailto con los detalles del pedido
function createOrderMailtoLink(
  cartItems: CartItem[],
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    postalCode?: string
    city?: string
    notes?: string
    deliveryType: string
    pickupTime?: string
    deliveryTime?: string
  },
  totals: {
    subtotal: number
    tax: number
    total: number
  },
): string {
  // Formatear la lista de artículos
  const itemsList = cartItems
    .map((item) => `${item.quantity}x ${item.name} - CHF ${(item.price * item.quantity).toFixed(2)}`)
    .join("\n")

  // Crear el asunto del correo
  const subject = encodeURIComponent(`Neue Bestellung von ${customerInfo.name}`)

  // Format the complete address if delivery is selected
  const formattedAddress =
    customerInfo.deliveryType === "delivery" && customerInfo.address
      ? `Adresse: ${customerInfo.address}, ${customerInfo.postalCode || ""} ${customerInfo.city || ""}\n`
      : ""

  // Crear el cuerpo del correo
  const body = encodeURIComponent(
    `NEUE BESTELLUNG\n\n` +
      `Kundeninformationen:\n` +
      `Name: ${customerInfo.name}\n` +
      `E-Mail: ${customerInfo.email}\n` +
      `Telefon: ${customerInfo.phone}\n` +
      `Lieferart: ${customerInfo.deliveryType === "pickup" ? "Abholung" : "Lieferung"}\n` +
      (customerInfo.deliveryType === "pickup" && customerInfo.pickupTime
        ? `Abholzeit: ${customerInfo.pickupTime} Uhr\n`
        : "") +
      (customerInfo.deliveryType === "delivery" && customerInfo.deliveryTime
        ? `Lieferzeit: ${customerInfo.deliveryTime} Uhr\n`
        : "") +
      formattedAddress +
      (customerInfo.notes ? `Anmerkungen: ${customerInfo.notes}\n` : "") +
      `\n` +
      `Bestellte Artikel:\n${itemsList}\n\n` +
      `Zwischensumme: CHF ${totals.subtotal.toFixed(2)}\n` +
      `Steuer (8%): CHF ${totals.tax.toFixed(2)}\n` +
      `Gesamtsumme: CHF ${totals.total.toFixed(2)}\n\n` +
      `Diese Bestellung wurde über die Website gesendet.`,
  )

  return `mailto:info@bouquetmediterraneo.ch?subject=${subject}&body=${body}`
}

// Componente de diálogo de pedido
export const OrderDialog = ({
  open,
  onOpenChange,
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart, // Nueva prop para limpiar el carrito
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  cartItems: CartItem[]
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void // Función para vaciar el carrito
}) => {
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deliveryType, setDeliveryType] = useState("pickup")
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [pickupTime, setPickupTime] = useState<string>("")
  const [deliveryTime, setDeliveryTime] = useState<string>("")
  const [showClosedAlert, setShowClosedAlert] = useState(false)
  const restaurantOpen = isRestaurantOpen()

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    notes: "",
  })

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Calcular total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const taxAmount = cartTotal * 0.08
  const totalWithTax = cartTotal + taxAmount

  // Obtener horas disponibles al cargar el componente
  useEffect(() => {
    const hours = getAvailableHours()
    setAvailableHours(hours)
    if (hours.length > 0) {
      setPickupTime(hours[0])
      setDeliveryTime(hours[0])
    }
  }, [])

  // Limpiar el carrito cuando se cierra el diálogo
  useEffect(() => {
    if (!open && orderSuccess) {
      clearCart()
    }
  }, [open, orderSuccess, clearCart])

  // Manejar envío de pedido
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) return

    // Verificar si el restaurante está abierto
    if (!restaurantOpen) {
      setShowClosedAlert(true)
      return
    }

    // Verificar que se haya seleccionado una hora
    if ((deliveryType === "pickup" && !pickupTime) || (deliveryType === "delivery" && !deliveryTime)) {
      alert("Bitte wählen Sie eine Zeit aus.")
      return
    }

    // Recopilar información del cliente
    const customerInfo = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      postalCode: formData.postalCode,
      city: formData.city,
      notes: formData.notes,
      deliveryType: deliveryType,
      pickupTime: deliveryType === "pickup" ? pickupTime : undefined,
      deliveryTime: deliveryType === "delivery" ? deliveryTime : undefined,
    }

    // Calcular totales
    const totals = {
      subtotal: cartTotal,
      tax: taxAmount,
      total: totalWithTax,
    }

    try {
      setIsSubmitting(true)

      // Crear y abrir el enlace mailto
      const mailtoLink = createOrderMailtoLink(cartItems, customerInfo, totals)
      window.location.href = mailtoLink

      // Mostrar mensaje de éxito
      setTimeout(() => {
        setIsSubmitting(false)
        setOrderSuccess(true)

        // Vaciar el carrito
        clearCart()

        // Resetear formulario y cerrar diálogo después del éxito
        setTimeout(() => {
          onOpenChange(false)
          setOrderSuccess(false)
          // Resetear el formulario
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            postalCode: "",
            city: "",
            notes: "",
          })
          // Reset delivery type and times
          setDeliveryType("pickup")
          if (availableHours.length > 0) {
            setPickupTime(availableHours[0])
            setDeliveryTime(availableHours[0])
          }
        }, 2000)
      }, 1000)
    } catch (error) {
      setIsSubmitting(false)
      console.error("Error al procesar el pedido:", error)
    }
  }

  // Manejar cierre del diálogo
  const handleDialogClose = () => {
    if (orderSuccess) {
      clearCart()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="sm:max-w-[500px] max-w-[90vw] bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-auto flex flex-col"
        onClose={handleDialogClose}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-[#8c9a56]">Ihre Bestellung</DialogTitle>
          <DialogDescription className="text-gray-300">
            Überprüfen Sie Ihre Artikel und schließen Sie Ihre Bestellung ab.
          </DialogDescription>
        </DialogHeader>

        {orderSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-[#8c9a56]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#8c9a56]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Bestellung bestätigt!</h3>
            <p className="text-gray-300">
              Wir haben eine Bestätigung an Ihre E-Mail gesendet. Ihr Essen wird zur gewählten Zeit
              {deliveryType === "pickup" ? " zur Abholung bereit sein." : " geliefert."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-white">Ihr Warenkorb ist leer</h3>
                <p className="text-gray-400 mb-4">Fügen Sie einige köstliche Gerichte aus unserer Speisekarte hinzu!</p>
                <Button onClick={() => onOpenChange(false)} className="bg-green-800 text-white hover:bg-green-900">
                  Speisekarte durchsuchen
                </Button>
              </div>
            ) : (
              <>
                {showClosedAlert && (
                  <div className="bg-amber-900/30 border border-amber-700 rounded-md p-4 mb-4 flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-500 font-medium mb-1">Restaurant geschlossen</h4>
                      <p className="text-amber-300 text-sm">
                        Unser Restaurant ist heute geschlossen. Bitte besuchen Sie uns zu unseren Öffnungszeiten.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-amber-700 text-amber-400 hover:bg-amber-900/50"
                        onClick={() => setShowClosedAlert(false)}
                      >
                        Verstanden
                      </Button>
                    </div>
                  </div>
                )}

                <div className="max-h-[30vh] md:max-h-[300px] overflow-y-auto pr-2 flex-grow">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 py-3 border-b border-gray-800"
                    >
                      <div className="h-12 w-12 sm:h-16 sm:w-16 overflow-hidden flex-shrink-0 rounded-md">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm sm:text-base truncate">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">CHF {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 sm:h-8 sm:w-8 border-gray-700 text-white hover:bg-gray-800"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-4 sm:w-6 text-center text-white text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 sm:h-8 sm:w-8 border-gray-700 text-white hover:bg-gray-800"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-right w-16 sm:w-20 ml-auto">
                        <div className="text-white text-sm sm:text-base">
                          CHF {(item.price * item.quantity).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 sm:h-8 px-1 sm:px-2 text-xs sm:text-sm text-[#8c9a56] hover:text-[#8c9a56] hover:bg-gray-800"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Entfernen
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Zwischensumme</span>
                    <span className="text-white">CHF {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Steuer</span>
                    <span className="text-white">CHF {taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-white">Gesamtsumme</span>
                    <span className="text-[#8c9a56]">CHF {totalWithTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4"></div>

                <div className="space-y-3 sm:space-y-4 overflow-y-auto flex-shrink-0">
                  <div>
                    <Label className="text-base font-medium text-white">Abholung oder Lieferung</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="pickup"
                          name="delivery-type"
                          value="pickup"
                          defaultChecked
                          className="h-4 w-4 text-[#8c9a56] border-gray-700 focus:ring-[#8c9a56]"
                          onChange={(e) => setDeliveryType(e.target.value)}
                        />
                        <Label htmlFor="pickup" className="text-gray-300">
                          Abholung
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="delivery"
                          name="delivery-type"
                          value="delivery"
                          className="h-4 w-4 text-[#8c9a56] border-gray-700 focus:ring-[#8c9a56]"
                          onChange={(e) => setDeliveryType(e.target.value)}
                        />
                        <Label htmlFor="delivery" className="text-gray-300">
                          Lieferung (45-60 Min.)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {deliveryType === "pickup" && (
                    <div className="space-y-2">
                      <Label htmlFor="pickup-time" className="text-gray-300">
                        Abholzeit wählen
                      </Label>
                      <select
                        id="pickup-time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-700"
                        required
                      >
                        {availableHours.length > 0 ? (
                          availableHours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour} Uhr
                            </option>
                          ))
                        ) : (
                          <option value="">Heute geschlossen</option>
                        )}
                      </select>
                      <p className="text-xs text-gray-400 mt-1">
                        Öffnungszeiten:
                        <br />
                        Dienstag - Donnerstag: 11:30–13:30, 17:30–21:00 Uhr
                        <br />
                        Freitag - Samstag: 11:30–13:30, 17:30–22:00 Uhr
                        <br />
                        Sonntag, Montag: Geschlossen
                      </p>
                    </div>
                  )}

                  {deliveryType === "delivery" && (
                    <div className="space-y-2">
                      <Label htmlFor="delivery-time" className="text-gray-300">
                        Lieferzeit wählen
                      </Label>
                      <select
                        id="delivery-time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-700"
                        required
                      >
                        {availableHours.length > 0 ? (
                          availableHours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour} Uhr
                            </option>
                          ))
                        ) : (
                          <option value="">Heute geschlossen</option>
                        )}
                      </select>
                      <p className="text-xs text-gray-400 mt-1">Lieferzeiten entsprechen den Öffnungszeiten.</p>
                    </div>
                  )}

                  {deliveryType === "delivery" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="street-address" className="text-gray-300">
                          Straße und Hausnummer
                        </Label>
                        <Input
                          id="street-address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Straße und Hausnummer"
                          required={deliveryType === "delivery"}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postal-code" className="text-gray-300">
                            Postleitzahl
                          </Label>
                          <Input
                            id="postal-code"
                            name="postalCode"
                            value={formData.postalCode || ""}
                            onChange={handleInputChange}
                            placeholder="PLZ"
                            required={deliveryType === "delivery"}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-gray-300">
                            Ort
                          </Label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city || ""}
                            onChange={handleInputChange}
                            required={deliveryType === "delivery"}
                            className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-700"
                          >
                            <option value="" disabled>
                              Ort auswählen
                            </option>
                            <option value="Sevelen">Sevelen</option>
                            <option value="Buchs">Buchs</option>
                            <option value="Gams">Gams</option>
                            <option value="Trüpach">Trüpach</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ihr Name"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ihre Telefonnummer"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      E-Mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ihre E-Mail"
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-300">
                      Besondere Anweisungen (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Besondere Wünsche oder Hinweise"
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-800 text-white hover:bg-green-900"
                    disabled={isSubmitting || !restaurantOpen}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verarbeitung...
                      </>
                    ) : !restaurantOpen ? (
                      "Heute geschlossen"
                    ) : (
                      "Bestellung aufgeben"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}


