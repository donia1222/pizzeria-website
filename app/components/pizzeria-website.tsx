"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu,
  X,
  Phone,
  Clock,
  Calendar,
  ShoppingBag,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Check,
  Loader2,
  ArrowRight,
  Pizza,
  Users,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { MediterraneanBackground } from "./mediterranean-background"

// Interfaces
interface MenuItem {
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
}

interface CartItem extends MenuItem {
  quantity: number
}

// Menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Classica",
    description: "Tomatensoße, Mozzarella und frisches Basilikum auf knusprigem Teig",
    price: 10.95,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 2,
    name: "Diavola Piccante",
    description: "Scharfe Salami, Jalapenos, Tomatensoße und Mozzarella",
    price: 13.95,
    image: "/baking-delicious-pizza-with-wood-fired-oven_23-2150134263.jpg",
    spicy: true,
    category: "pizzas",
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    description: "Vier-Käse-Traum mit Mozzarella, Gorgonzola, Parmesan und Ricotta",
    price: 14.95,
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 4,
    name: "Prosciutto e Funghi",
    description: "Schinken, frische Champignons, Mozzarella und Tomatensoße",
    price: 13.95,
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "pizzas",
  },
  {
    id: 5,
    name: "Vegetariana",
    description: "Buntes Gemüse der Saison, Mozzarella und Tomatensoße",
    price: 12.95,
    image: "/mix-pizza-with-tomato-slices-mushroom-olive_140725-185-1.jpg",
    vegetarian: true,
    vegan: true,
    category: "pizzas",
  },
  {
    id: 6,
    name: "Caprese Salat",
    description: "Tomaten, Mozzarella di Bufala, Basilikum und Balsamico-Creme",
    price: 8.95,
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "starters",
  },
  {
    id: 7,
    name: "Bruschetta Trio",
    description: "Drei Bruschetta mit verschiedenen Toppings: Tomate-Basilikum, Olive-Feta, Prosciutto-Rucola",
    price: 9.95,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200&auto=format&fit=crop",
    category: "starters",
  },
  {
    id: 8,
    name: "Tiramisu",
    description: "Klassisches italienisches Dessert mit Mascarpone und Espresso",
    price: 6.95,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 9,
    name: "Panna Cotta",
    description: "Cremiges Dessert mit Vanille und Beerensoße",
    price: 5.95,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 10,
    name: "Italienischer Wein",
    description: "Hausgemachte Auswahl an erstklassigen italienischen Weinen",
    price: 6.95,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 11,
    name: "Aperol Spritz",
    description: "Erfrischender Aperitif mit Aperol, Prosecco und Soda",
    price: 7.95,
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf16?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "drinks",
  },
  {
    id: 12,
    name: "Hausgemachte Limonade",
    description: "Frisch gepresst mit Zitronen, Minze und Agavensirup",
    price: 4.95,
    image: "https://images.unsplash.com/photo-1621267860478-dbdec434c203?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
]

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    text: "Die beste Pizza außerhalb Italiens! Der knusprige Teig und die frischen Zutaten erinnern mich an meine Heimat.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    position: "Italienischer Chef",
  },
  {
    id: 2,
    name: "Laura Schmidt",
    text: "Die gemütliche Atmosphäre und der freundliche Service machen jeden Besuch zu einem besonderen Erlebnis. Die Pizza Diavola ist unglaublich!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    position: "Food Bloggerin",
  },
  {
    id: 3,
    name: "Thomas Meyer",
    text: "Wir bestellen jede Woche zum Filmabend und die Pizza kommt immer heiß und perfekt an. Ein absolutes Muss für Pizzaliebhaber!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    position: "Stammkunde",
  },
]

// Gallery images
const galleryImages = [
  "/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg",
  "/table-arrangement-luxury-restaurant_23-2150598334.jpg",
  "video",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=300&auto=format&fit=crop",
]

// Utility function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Add scrollbar utility class
const scrollbarHideClass = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

// Custom Button Component
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

// Custom Input Component
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

// Custom Textarea Component
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

// Custom Label Component
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

// Custom Badge Component
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

// Custom Dialog Components
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

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn("mr-0.5", i < rating ? "text-[#8c9a56] fill-[#8c9a56]" : "text-gray-300")}
        />
      ))}
    </div>
  )
}

// Menu item component
const MenuItem = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
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
            <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
              Vegetarisch
            </Badge>
          )}
          {item.vegan && (
            <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
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

// Image carousel component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length, isPlaying])

  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt="Galeriebild"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-[#8c9a56] w-6" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Animated number component
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now()
    const endValue = value

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const currentValue = Math.floor(progress * endValue)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(updateCount)
  }, [value, isInView])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function PizzeriaWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [reservationSuccess, setReservationSuccess] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeCategory, setActiveCategory] = useState("pizzas")
  const [showButton, setShowButton] = useState(true)

  // Ref para el contenedor de testimonios
  const testimonialsContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialsContainerRef.current) {
        testimonialsContainerRef.current.scrollBy({
          left: 370, // Width of one testimonial card + margin
          behavior: "smooth",
        })

        // Check if we've reached the end, if so, scroll back to start
        const container = testimonialsContainerRef.current
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 100) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          })
        }
      }
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Form state for reservation
  const [reservationDate, setReservationDate] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [reservationGuests, setReservationGuests] = useState("")
  const [reservationName, setReservationName] = useState("")
  const [reservationEmail, setReservationEmail] = useState("")
  const [reservationPhone, setReservationPhone] = useState("")
  const [reservationNotes, setReservationNotes] = useState("")

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Available reservation times
  const availableTimes = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Always show the phone button
  useEffect(() => {
    setShowButton(true)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Function to make a phone call
  const callPhone = () => {
    window.location.href = "tel:+41817851000"
  }

  // Add item to cart
  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Handle reservation submission
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setReservationSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setReservationOpen(false)
        setReservationSuccess(false)
        // Reset form fields
        setReservationDate("")
        setReservationTime("")
        setReservationGuests("")
        setReservationName("")
        setReservationEmail("")
        setReservationPhone("")
        setReservationNotes("")
      }, 2000)
    }, 1500)
  }

  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderSuccess(true)

      // Reset form and cart after success
      setTimeout(() => {
        setOrderOpen(false)
        setOrderSuccess(false)
        setCartItems([])
      }, 2000)
    }, 1500)
  }

  // Filter menu items by category
  const filteredMenuItems = menuItems.filter((item) => item.category === activeCategory)

  // Hero images for carousel
  const heroImages = [
    "/pasta-with-tomato-sauce-served-pan_1220-7546.jpg",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
  ]

  // Funciones para controlar el scroll de testimonios
  const scrollTestimonialsLeft = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollBy({
        left: -370, // Ancho aproximado de una tarjeta + margen
        behavior: "smooth",
      })
    }
  }

  const scrollTestimonialsRight = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollBy({
        left: 370, // Ancho aproximado de una tarjeta + margen
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <MediterraneanBackground />

      {/* Header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-full overflow-hidden flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#8c9a56]">Bouquet </span>Mediterraneo
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              ["Startseite", "home"],
              ["Speisekarte", "menu"],
              ["Über uns", "about"],
              ["Galerie", "gallery"],
              ["Kontakt", "contact"],
            ].map(([label, id]) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setReservationOpen(true)}
              className="hidden md:flex items-center space-x-2 bg-transparent border border-[#8c9a56] text-[#8c9a56] px-4 py-2 text-sm uppercase tracking-wider hover:bg-[#8c9a56] hover:text-black transition-colors rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Calendar className="h-4 w-4" />
              <span>Reservieren</span>
            </motion.button>

            <motion.button
              onClick={() => setOrderOpen(true)}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ShoppingBag className="h-6 w-6 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#8c9a56] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden text-white" onClick={toggleMobileMenu} whileTap={{ scale: 0.9 }}>
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-gray-900 z-50 flex flex-col p-6 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[#8c9a56] font-bold">Bouquet Mediterraneo</h2>
                <button className="text-white" onClick={toggleMobileMenu}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {[
                  ["Startseite", "home"],
                  ["Speisekarte", "menu"],
                  ["Über uns", "about"],
                  ["Galerie", "gallery"],
                  ["Kontakt", "contact"],
                ].map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-gray-300 hover:text-[#8c9a56] transition-colors py-2 border-b border-gray-800 text-sm uppercase tracking-widest"
                    onClick={toggleMobileMenu}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <Button
                  onClick={() => {
                    setReservationOpen(true)
                    toggleMobileMenu()
                  }}
                  className="w-full bg-transparent border border-[#8c9a56] text-[#8c9a56] hover:bg-[#8c9a56] hover:text-black"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Tisch reservieren
                </Button>

                <Button
                  onClick={() => {
                    setOrderOpen(true)
                    toggleMobileMenu()
                  }}
                  variant="default"
                  className="w-full bg-green-800 text-white hover:bg-green-900"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Jetzt bestellen
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-black text-[#8c9a56] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen" ref={heroRef}>
        <ImageCarousel images={heroImages} />

        <div className="flex items-center justify-center mt-20 ">
          <motion.div className="text-center max-w-3xl px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4 relative ">
                <div className="inline-block relative">
                  <span className="absolute -top-6 -left-2 bg-[#8c9a56] text-black font-bold text-sm px-4 py-1 rounded-full transform -rotate-6 shadow-lg">
                    Neu in Sevelen
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold">Authentische italienische Pizza</h2>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300  max-w-xl mx-auto">
                Frisch eröffnet! Erleben Sie unsere handgemachten Pizzen mit traditionellen Rezepten und besten Zutaten
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-20 z-50">
                <Button
                  onClick={() => setReservationOpen(true)}
                  className="bg-green-800 text-white hover:bg-green-900"
                  size="lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Tisch reservieren
                </Button>
                <Button
                  onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                >
                  <Pizza className="h-4 w-4 mr-2 " />
                  Speisekarte entdecken
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-lg mt-20">
                <img
                  src="/baking-delicious-pizza-with-wood-fired-oven_23-2150134263.jpg"
                  alt="Pizza im Holzofen"
                  className="object-cover h-[500px] w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 border-2 border-[#8c9a56] z-0"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Über uns</h2>
              <h3 className="text-4xl font-bold mb-8 text-white">Neue Tradition</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Bouquet Mediterraneo ist neu in Sevelen, aber unsere Leidenschaft für authentische italienische Küche
                reicht weit zurück. Unser Küchenchef Dari, ein ausgezeichneter Sommelier und gebürtiger Italiener,
                bringt ein Stück seines Heimatlandes zu Ihnen.
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Unser Geheimnis? Langsam gereifter Teig, handverlesene Zutaten aus Italien und die Leidenschaft für
                echte neapolitanische Pizza. Besuchen Sie uns und erleben Sie ein authentisches italienisches
                Geschmackserlebnis in unserem neu eröffneten Restaurant.
              </p>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#8c9a56] mb-2">
                    <AnimatedNumber value={100} suffix="%" />
                  </div>
                  <p className="text-gray-400 text-sm">Authentisch</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-[#8c9a56] mb-2">
                    <AnimatedNumber value={12} />
                  </div>
                  <p className="text-gray-400 text-sm">Pizzasorten</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-[#8c9a56] mb-2">
                    <AnimatedNumber value={2023} />
                  </div>
                  <p className="text-gray-400 text-sm">Eröffnet</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Köstliche Auswahl</h2>
            <h3 className="text-4xl font-bold mb-8 text-white">Unsere Speisekarte</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Entdecken Sie unsere handgefertigten Pizzen und italienischen Spezialitäten mit frischen, saisonalen
              Zutaten
            </p>
          </motion.div>

          <div className="mb-12">
            <div className="flex justify-start md:justify-center overflow-x-auto pb-4 px-2">
              {[
                ["pizzas", "Pizza"],
                ["starters", "Vorspeisen"],
                ["desserts", "Desserts"],
                ["drinks", "Getränke"],
              ].map(([category, label]) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2 mx-2 text-sm uppercase tracking-wider transition-colors rounded-md flex-shrink-0",
                    activeCategory === category
                      ? "bg-green-800 text-white"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800",
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MenuItem item={item} onAddToCart={addToCart} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Button onClick={() => setOrderOpen(true)} className="bg-green-800 text-white hover:bg-green-900" size="lg">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Jetzt bestellen
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Bewertungen</h2>
            <h3 className="text-4xl font-bold mb-8 text-white">Was unsere Gäste sagen</h3>
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-2 sm:px-0">
            <div className="overflow-x-auto pb-4 scrollbar-hide" ref={testimonialsContainerRef}>
              <div className="flex space-x-6 min-w-max p-2">
                {/* Rico Turnell */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="/unnamed.png"
                          alt="Rico Turnell"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Rico Turnell</h4>
                        <p className="text-red-400 text-xs"> NEU</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                      <span className="text-gray-400 text-xs mt-1">Lieferung · Abendessen · 10-20 CHF</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Wau diese Pizza der wahnsinn, vielen lieben Dank für das Geschmackserlebnis.
                  </p>
                </motion.div>

                {/* Mauro Musarra */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="/unnamed-1.png"
                          alt="Mauro Musarra"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Mauro Musarra</h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4 italic">
                    "5 stelle sono poche! Locale accogliente, personale gentile e preparato e le pizze buonissime! La
                    mia nuova pizzeria preferita. Da provare ✌️"
                  </p>
                </motion.div>

                {/* Stefano Calati */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="/unnamed-2.png"
                          alt="Stefano Calati"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Stefano Calati</h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                      <span className="text-gray-400 text-xs mt-1">Abholung</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Absolutely Best pizza in the Valley. Perfect Napoli style pizza and according to Italian standards.
                  </p>
                </motion.div>

                {/* Agam Unterreiner */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="unnamed-3.png"
                          alt="Agam Unterreiner"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Agam Unterreiner</h4>
                        <p className="text-gray-400 text-xs"></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                      <span className="text-gray-400 text-xs mt-1">Vor Ort · Abendessen</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Das Essen war ein absoluter Genuss! Dari, der Besitzer, ist ein ausgezeichneter Sommelier und ein
                    wahrer Meister seines Fachs. Als Vorspeise hatten wir die Tagliere, die ein wahrer Genuss war.
                  </p>
                </motion.div>

                {/* Karin Bless */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="/unnamed-4.png"
                          alt="Karin Bless"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Karin Bless</h4>
                        <p className="text-red-400 text-xs"> NEU</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                      <span className="text-gray-400 text-xs mt-1">Vor Ort</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Pizza war sensationell, mit frischen Zutaten. Da der Inhaber ein Sommelier ist haben wir einen
                    ausgezeichneten Wein dazu getrunken. Man wird persönlich vom Chef bedient und dadurch dass er
                    gebürtiger Italiener ist, fühlt man sich grad wie in Italien.
                  </p>
                </motion.div>

                {/* Ana Busuioc */}
                <motion.div
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src="/unnamed-5.png"
                          alt="Ana Busuioc"
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Ana Busuioc</h4>
                        <p className="text-red-400 text-xs"> NEU</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={5} />
                      <span className="text-gray-400 text-xs mt-1">Vor Ort · Abendessen</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4"></p>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicators */}
            <button
              onClick={scrollTestimonialsLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full cursor-pointer z-10 hover:bg-[#8c9a56]/70 transition-colors"
              aria-label="Vorherige Bewertungen"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={scrollTestimonialsRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full cursor-pointer z-10 hover:bg-[#8c9a56]/70 transition-colors"
              aria-label="Nächste Bewertungen"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Unsere Galerie</h2>
            <h3 className="text-4xl font-bold mb-8 text-white">Einblicke in unser Restaurant</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden group rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                {image === "video" ? (
                  <div className="w-full h-full">
                    <video src="/1280x720.mp4" className="object-cover w-full h-full" autoPlay muted loop playsInline />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ArrowRight className="text-white h-8 w-8" />
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Galeriebild"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ArrowRight className="text-white h-8 w-8" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Kontakt</h2>
            <h3 className="text-4xl font-bold mb-8 text-white">Kontaktieren Sie uns</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-white">Besuchen Sie uns</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-[#8c9a56] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Adresse</h4>
                    <p className="text-gray-300">Bahnhofstrasse 46, 9475 Sevelen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#8c9a56] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Telefon</h4>
                    <p className="text-gray-300">081 785 10 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#8c9a56] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">E-Mail</h4>
                    <p className="text-gray-300">info@bouquetmediterraneo.ch</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-[#8c9a56] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Öffnungszeiten</h4>
                    <p className="text-gray-300">Dienstag - Donnerstag: 11:00–14:00, 17:00–22:00 Uhr</p>
                    <p className="text-gray-300">Freitag: 11:00–14:00, 17:00–22:00 Uhr</p>
                    <p className="text-gray-300">Samstag: 11:00–14:00, 17:00–23:00 Uhr</p>
                    <p className="text-gray-300">Sonntag, Montag: Geschlossen</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Folgen Sie uns</h4>

                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-[#8c9a56] hover:bg-green-800 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-[#8c9a56] hover:bg-green-800 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-[#8c9a56] hover:bg-green-800 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 p-8 border border-gray-800 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Nachricht senden</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ihr Name"
                      className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      E-Mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ihre E-Mail"
                      className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300">
                    Betreff
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Betreff"
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">
                    Nachricht
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Ihre Nachricht"
                    rows={4}
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                  />
                </div>

                <Button className="w-full bg-green-800 text-white hover:bg-green-900">Nachricht senden</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                <span className="text-[#8c9a56]">Bouquet </span>Mediterraneo
              </h2>
              <p className="text-gray-400 text-sm">Authentische italienische Pizza seit 1985</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <a
                href="#home"
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
              >
                Startseite
              </a>
              <a
                href="#menu"
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
              >
                Speisekarte
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
              >
                Über uns
              </a>
              <a
                href="#gallery"
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
              >
                Galerie
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest"
              >
                Kontakt
              </a>

              <Button onClick={() => setReservationOpen(true)} className="bg-green-800 text-white hover:bg-green-900">
                Jetzt reservieren
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Bouquet Mediterraneo. Neu eröffnet in Sevelen.
            </p>
          </div>
        </div>
      </footer>

      {/* Reservation Dialog - Improved Version */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent
          className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white"
          onClose={() => setReservationOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-xl text-[#8c9a56]">Tisch reservieren</DialogTitle>
            <DialogDescription className="text-gray-300">
              Füllen Sie das Formular aus, um Ihren Tisch bei Bouquet Mediterraneo zu reservieren.
            </DialogDescription>
          </DialogHeader>

          {reservationSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-[#8c9a56]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-[#8c9a56]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Reservierung bestätigt!</h3>
              <p className="text-gray-300">
                Wir haben eine Bestätigung an Ihre E-Mail gesendet. Wir freuen uns darauf, Sie zu bedienen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reservation-date" className="text-gray-300">
                    Datum
                  </Label>
                  <Input
                    id="reservation-date"
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reservation-time" className="text-gray-300">
                    Zeit
                  </Label>
                  <div className="relative">
                    <select
                      id="reservation-time"
                      value={reservationTime}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReservationTime(e.target.value)}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8c9a56]"
                    >
                      <option value="" disabled>
                        Uhrzeit wählen
                      </option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-guests" className="text-gray-300">
                  Anzahl der Gäste
                </Label>
                <div className="relative">
                  <select
                    id="reservation-guests"
                    value={reservationGuests}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReservationGuests(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8c9a56]"
                  >
                    <option value="" disabled>
                      Anzahl wählen
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-name" className="text-gray-300">
                  Name
                </Label>
                <Input
                  id="reservation-name"
                  placeholder="Ihr vollständiger Name"
                  required
                  value={reservationName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-email" className="text-gray-300">
                  E-Mail
                </Label>
                <Input
                  id="reservation-email"
                  type="email"
                  placeholder="Ihre E-Mail"
                  required
                  value={reservationEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-phone" className="text-gray-300">
                  Telefon
                </Label>
                <Input
                  id="reservation-phone"
                  placeholder="Ihre Telefonnummer"
                  required
                  value={reservationPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationPhone(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reservation-notes" className="text-gray-300">
                  Besondere Wünsche (Optional)
                </Label>
                <Textarea
                  id="reservation-notes"
                  placeholder="Besondere Wünsche oder Ernährungsbedürfnisse"
                  value={reservationNotes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReservationNotes(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-800 text-white hover:bg-green-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verarbeitung...
                    </>
                  ) : (
                    "Reservierung bestätigen"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent
          className="sm:max-w-[500px] max-w-[90vw] bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-auto flex flex-col"
          onClose={() => setOrderOpen(false)}
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
                Wir haben eine Bestätigung an Ihre E-Mail gesendet. Ihr Essen wird in etwa 30 Minuten zur Abholung
                bereit sein.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-white">Ihr Warenkorb ist leer</h3>
                  <p className="text-gray-400 mb-4">
                    Fügen Sie einige köstliche Gerichte aus unserer Speisekarte hinzu!
                  </p>
                  <Button onClick={() => setOrderOpen(false)} className="bg-green-800 text-white hover:bg-green-900">
                    Speisekarte durchsuchen
                  </Button>
                </div>
              ) : (
                <>
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
                      <span className="text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Steuer</span>
                      <span className="text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-white">Gesamtsumme</span>
                      <span className="text-[#8c9a56]">${(cartTotal * 1.08).toFixed(2)}</span>
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
                          />
                          <Label htmlFor="pickup" className="text-gray-300">
                            Abholung (Fertig in 30 Min.)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="delivery"
                            name="delivery-type"
                            value="delivery"
                            className="h-4 w-4 text-[#8c9a56] border-gray-700 focus:ring-[#8c9a56]"
                          />
                          <Label htmlFor="delivery" className="text-gray-300">
                            Lieferung (45-60 Min.)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Name
                        </Label>
                        <Input
                          id="name"
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
                        type="email"
                        placeholder="Ihre E-Mail"
                        required
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-300">
                        Adresse (für Lieferung)
                      </Label>
                      <Input
                        id="address"
                        placeholder="Lieferadresse"
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-300">
                        Besondere Anweisungen (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Besondere Wünsche oder Hinweise"
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-green-800 text-white hover:bg-green-900"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verarbeitung...
                        </>
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

      {/* Phone button (removed the scroll up functionality) */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={callPhone}
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-black/80 border border-gray-800 shadow-lg hover:bg-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Telefon anrufen"
          >
            <PhoneCall className="h-5 w-5 text-[#8c9a56]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

