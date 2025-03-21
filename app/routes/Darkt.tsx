"use client"

import React from "react"

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
  ChefHat,
  Wine,
  Utensils,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react"

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
    name: "Gebratene Jakobsmuscheln",
    description: "In der Pfanne gebratene Jakobsmuscheln mit Blumenkohlpüree und knusprigem Pancetta",
    price: 18.95,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "starters",
  },
  {
    id: 2,
    name: "Trüffel-Risotto",
    description: "Cremiger Arborio-Reis mit Waldpilzen und Trüffelöl",
    price: 16.95,
    image:
      "https://img.freepik.com/free-photo/high-angle-tasty-truffle-recipe_23-2149525124.jpg?t=st=1742167257~exp=1742170857~hmac=e287d60a7fa4df892cd54fb77088bd2ec98ed5a498653524a93dd7aceb0d567d&w=900",
    vegetarian: true,
    category: "starters",
  },
  {
    id: 3,
    name: "Beef Tatar",
    description: "Handgeschnittenes Prime-Rindfleisch mit Kapern, Schalotten und Wachtelei",
    price: 19.95,
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=200&auto=format&fit=crop",
    category: "starters",
  },
  {
    id: 4,
    name: "Filet Mignon",
    description: "230g Gras-gefüttertes Rindfleisch mit Rotweinreduktion und geröstetem Gemüse",
    price: 42.95,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "mains",
  },
  {
    id: 5,
    name: "Kräuter-Lachs",
    description: "Wildlachs mit Kräuterkruste, Zitronen-Beurre-Blanc und Spargel",
    price: 34.95,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format&fit=crop",
    category: "mains",
  },
  {
    id: 6,
    name: "Pilz-Wellington",
    description: "Portobello-Pilze mit Spinat und Ziegenkäse im Blätterteig",
    price: 28.95,
    image:
      "https://img.freepik.com/free-photo/plate-mushroom-risotto-topped-with-grated-cheese_141793-469.jpg?t=st=1742167214~exp=1742170814~hmac=ebc48aac6f71d763968b07d2758f3f5fa24c69f16b5eea0e67453405506a9173&w=740",
    vegetarian: true,
    vegan: true,
    category: "mains",
  },
  {
    id: 7,
    name: "Lammkarree",
    description: "Kräuter-Lammkarree mit Minzjus und Kartoffelgratin",
    price: 38.95,
    image:
      "https://img.freepik.com/free-photo/grilled-lamb-ribs-close-up_23-2148516959.jpg?t=st=1742167292~exp=1742170892~hmac=570240f0f1d2c8cc193ee115d1a29f761c47fe02b172f2037112d1554c0485de&w=996",
    category: "mains",
  },
  {
    id: 8,
    name: "Schokoladen-Soufflé",
    description: "Warmes Schokoladen-Soufflé mit Vanilleeis",
    price: 12.95,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 9,
    name: "Crème Brûlée",
    description: "Klassische Vanillecreme mit karamellisierter Zuckerkruste",
    price: 10.95,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 10,
    name: "Gereifter Bourbon",
    description: "Premium gereifter Bourbon, pur oder auf Eis",
    price: 14.95,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 11,
    name: "Signature Martini",
    description: "Hausspezialität mit Gin, Wermut und einer Zitronenzeste",
    price: 16.95,
    image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "drinks",
  },
  {
    id: 12,
    name: "Reserve Rotwein",
    description: "Auswahl an Premium-Rotweinen aus unserem Keller",
    price: 18.95,
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
]

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    text: "Ein unvergessliches Esserlebnis. Das Ambiente, der Service und die Küche waren alle tadellos.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    position: "Restaurantkritikerin",
  },
  {
    id: 2,
    name: "James Wilson",
    text: "Das Degustationsmenü des Küchenchefs war eine Offenbarung. Jeder Gang erzählte eine Geschichte und nahm uns mit auf eine kulinarische Reise.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    position: "Geschäftsführer",
  },
  {
    id: 3,
    name: "Olivia Martinez",
    text: "Die Liebe zum Detail bei Präsentation und Geschmacksprofilen ist in der Stadt unübertroffen.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    position: "Stammgast",
  },
]

// Gallery images
const galleryImages = [
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=300&auto=format&fit=crop",
  "https://img.freepik.com/free-photo/grilled-lamb-ribs-close-up_23-2148516959.jpg?t=st=1742167292~exp=1742170892~hmac=570240f0f1d2c8cc193ee115d1a29f761c47fe02b172f2037112d1554c0485de&w=996",
]

// Utility function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

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
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-amber-400 text-black hover:bg-amber-500",
    outline: "border border-white text-white hover:bg-white/10",
    ghost: "text-white hover:bg-gray-800",
    link: "text-amber-400 underline-offset-4 hover:underline",
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
        "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-50",
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
        "flex w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-50",
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
    default: "bg-amber-600 text-white",
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
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div
      className={cn(
        "relative z-50 max-w-lg w-full bg-gray-900 border border-gray-800 p-6 shadow-lg rounded-lg",
        className,
      )}
      {...props}
    >
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

// Custom Select Components
const Select = ({
  children,
  className = "",
  required = false,
  ...props
}: {
  children: React.ReactNode
  className?: string
  required?: boolean
  [key: string]: any
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>("")
  const [selectedLabel, setSelectedLabel] = useState<string>("")
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(value)
    setSelectedLabel(label)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={cn("relative", className)} {...props}>
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedLabel ? "text-white" : "text-gray-400"}>{selectedLabel || "Auswählen..."}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-700 bg-gray-800 py-1 shadow-lg">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSelect: handleSelect,
              })
            }
            return child
          })}
        </div>
      )}

      {required && <input type="hidden" value={selectedValue} required={required} />}
    </div>
  )
}

const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <>{children}</>
}

const SelectValue = ({ placeholder }: { placeholder: string }) => {
  return <>{placeholder}</>
}

const SelectContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <>{children}</>
}

const SelectItem = ({
  children,
  value,
  className = "",
  onSelect,
}: {
  children: React.ReactNode
  value: string
  className?: string
  onSelect?: (value: string, label: string) => void
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-3 text-sm text-white hover:bg-gray-700",
        className,
      )}
      onClick={() => onSelect && onSelect(value, children?.toString() || value)}
    >
      {children}
    </div>
  )
}

// Custom RadioGroup Components
const RadioGroup = ({
  children,
  defaultValue,
  className = "",
  ...props
}: {
  children: React.ReactNode
  defaultValue?: string
  className?: string
  [key: string]: any
}) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: value === (child.props as any).value,
            onChange: () => setValue((child.props as any).value),
          })
        }
        return child
      })}
    </div>
  )
}

const RadioGroupItem = ({
  value,
  id,
  className = "",
  checked,
  onChange,
  ...props
}: {
  value: string
  id: string
  className?: string
  checked?: boolean
  onChange?: () => void
  [key: string]: any
}) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={cn("h-4 w-4 rounded-full border-gray-700 text-amber-400 focus:ring-amber-400", className)}
      {...props}
    />
  )
}

// Custom Separator Component
const Separator = ({
  className = "",
  ...props
}: {
  className?: string
  [key: string]: any
}) => {
  return <div className={cn("h-px bg-gray-800", className)} {...props} />
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

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn("mr-0.5", i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300")}
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
      className="group relative overflow-hidden bg-gray-900 border border-gray-800"
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
            <Badge variant="default" className="bg-amber-600 text-white border-none">
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
          <span className="text-amber-400">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

        <motion.button
          onClick={handleAddToCart}
          className={cn(
            "w-full py-2 px-4 flex items-center justify-center transition-colors",
            isAdded ? "bg-green-600 text-white" : "bg-gray-800 text-white hover:bg-amber-600",
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
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-amber-400 w-6" : "bg-white/50",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  )
}

export default function DarkRestaurant() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [reservationSuccess, setReservationSuccess] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeCategory, setActiveCategory] = useState("starters")

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
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
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={cn(
          " left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
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
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
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
              className="hidden md:flex items-center space-x-2 bg-transparent border border-amber-400 text-amber-400 px-4 py-2 text-sm uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-colors"
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
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
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
                <h2 className="text-amber-400 font-serif">NOIR</h2>
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
                    className="text-gray-300 hover:text-amber-400 transition-colors py-2 border-b border-gray-800 text-sm uppercase tracking-widest"
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
                  className="w-full bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
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
                  className="w-full bg-amber-400 text-black hover:bg-amber-500"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Jetzt bestellen
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-black text-amber-400 text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

        <div className="flex items-center justify-center mt-20">
          <motion.div className="text-center max-w-3xl px-4" style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl font-serif mb-4">Gehobene Gastronomie</h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl mx-auto">
                Erheben Sie Ihre Sinne mit unserer exquisiten Küche und anspruchsvollem Ambiente
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => setReservationOpen(true)}
                  className="bg-amber-400 text-black hover:bg-amber-500"
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
                  <Utensils className="h-4 w-4 mr-2" />
                  Speisekarte entdecken
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center gap-8 bg-black/70 backdrop-blur-sm px-8 py-4"
          >
            <div className="text-center">
              <ChefHat className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Preisgekrönter Küchenchef</p>
            </div>

            <div className="text-center">
              <Wine className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Kuratierte Weinauswahl</p>
            </div>

            <div className="text-center">
              <Star className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Michelin-Erfahrung</p>
            </div>
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
              <div className="relative z-10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop"
                  alt="Koch bei der Zubereitung"
                  className="object-cover h-[500px] w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 border-2 border-amber-400 z-0"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif mb-2 text-amber-400">Unsere Geschichte</h2>
              <h3 className="text-4xl font-serif mb-8 text-white">Kulinarische Exzellenz seit 2005</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Gegründet von Küchenchef Michael Laurent, steht NOIR seit über 18 Jahren an der Spitze innovativer
                Küche. Unsere Philosophie ist einfach: außergewöhnliche Zutaten, meisterhafte Technik und künstlerische
                Präsentation.
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Wir beziehen die feinsten saisonalen Zutaten von lokalen Bauern und Handwerkern, ergänzt durch seltene
                Importe aus der ganzen Welt. Jedes Gericht wird so komponiert, dass ein harmonisches Gleichgewicht der
                Aromen entsteht, das überrascht und begeistert.
              </p>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-serif text-amber-400 mb-2">
                    <AnimatedNumber value={18} suffix="+" />
                  </div>
                  <p className="text-gray-400 text-sm">Jahre Exzellenz</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-serif text-amber-400 mb-2">
                    <AnimatedNumber value={3} />
                  </div>
                  <p className="text-gray-400 text-sm">Michelin-Sterne</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-serif text-amber-400 mb-2">
                    <AnimatedNumber value={25000} suffix="+" />
                  </div>
                  <p className="text-gray-400 text-sm">Zufriedene Gäste</p>
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
            <h2 className="text-3xl font-serif mb-2 text-amber-400">Exquisite Küche</h2>
            <h3 className="text-4xl font-serif mb-8 text-white">Unsere Speisekarte</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Entdecken Sie unsere sorgfältig zusammengestellte Speisekarte mit saisonalen Zutaten und innovativen
              Techniken
            </p>
          </motion.div>

          <div className="mb-12">
            <div className="flex justify-center overflow-x-auto pb-4">
              {[
                ["starters", "Vorspeisen"],
                ["mains", "Hauptgerichte"],
                ["desserts", "Desserts"],
                ["drinks", "Getränke"],
              ].map(([category, label]) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2 mx-2 text-sm uppercase tracking-wider transition-colors",
                    activeCategory === category
                      ? "bg-amber-400 text-black"
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
            <Button onClick={() => setOrderOpen(true)} className="bg-amber-400 text-black hover:bg-amber-500" size="lg">
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
            <h2 className="text-3xl font-serif mb-2 text-amber-400">Bewertungen</h2>
            <h3 className="text-4xl font-serif mb-8 text-white">Was unsere Gäste sagen</h3>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-900 p-8 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <RatingStars rating={testimonial.rating} />
                  <p className="text-gray-300 mt-4 italic">&quot;{testimonial.text}&quot;</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl font-serif mb-2 text-amber-400">Unsere Galerie</h2>
            <h3 className="text-4xl font-serif mb-8 text-white">Momente bei NOIR</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt="Galeriebild"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ArrowRight className="text-white h-8 w-8" />
                </div>
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
            <h2 className="text-3xl font-serif mb-2 text-amber-400">Kontakt</h2>
            <h3 className="text-4xl font-serif mb-8 text-white">Kontaktieren Sie uns</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-serif mb-8 text-white">Besuchen Sie uns</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Adresse</h4>
                    <p className="text-gray-300">123 Gourmet Allee, Kulinarisches Viertel, CD 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Telefon</h4>
                    <p className="text-gray-300">+49 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">E-Mail</h4>
                    <p className="text-gray-300">reservierung@noirrestaurant.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Öffnungszeiten</h4>
                    <p className="text-gray-300">Dienstag - Sonntag: 17:00 - 23:00 Uhr</p>
                    <p className="text-gray-300">Montags geschlossen</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Folgen Sie uns</h4>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
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
              className="bg-gray-900 p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-serif mb-6 text-white">Nachricht senden</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ihr Name"
                      className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                      className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                    className="mt-2 bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>

                <Button className="w-full bg-amber-400 text-black hover:bg-amber-500">Nachricht senden</Button>
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
              <h2 className="text-2xl font-serif text-white mb-2 text-center ">NOIR</h2>
              <p className="text-gray-400 text-sm">Gehobene kulinarische Erlebnisse seit 2005</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <a
                href="#home"
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                Startseite
              </a>
              <a
                href="#menu"
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                Speisekarte
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                Über uns
              </a>
              <a
                href="#gallery"
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                Galerie
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
              >
                Kontakt
              </a>

              <Button onClick={() => setReservationOpen(true)} className="bg-amber-400 text-black hover:bg-amber-500">
                Jetzt reservieren
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NOIR Restaurant. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

      {/* Reservation Dialog */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-amber-400">Tisch reservieren</DialogTitle>
            <DialogDescription className="text-gray-300">
              Füllen Sie das Formular aus, um Ihren Tisch bei NOIR zu reservieren.
            </DialogDescription>
          </DialogHeader>

          {reservationSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif mb-2 text-white">Reservierung bestätigt!</h3>
              <p className="text-gray-300">
                Wir haben eine Bestätigung an Ihre E-Mail gesendet. Wir freuen uns darauf, Sie zu bedienen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-300">
                    Datum
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-300">
                    Zeit
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400">
                      <SelectValue placeholder="Zeit auswählen" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map((time) => (
                        <SelectItem key={time} value={time} className="focus:bg-gray-700">
                          {time} Uhr
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-gray-300">
                  Anzahl der Gäste
                </Label>
                <Select required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400">
                    <SelectValue placeholder="Anzahl auswählen" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="focus:bg-gray-700">
                        {num} {num === 1 ? "Person" : "Personen"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Ihr vollständiger Name"
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                />
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
                  className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                  className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-requests" className="text-gray-300">
                  Besondere Wünsche (Optional)
                </Label>
                <Textarea
                  id="special-requests"
                  placeholder="Besondere Wünsche oder Ernährungsbedürfnisse"
                  className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-amber-400 text-black hover:bg-amber-500"
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
        <DialogContent className="sm:max-w-[500px] max-w-[90vw] bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-auto flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-amber-400">Ihre Bestellung</DialogTitle>
            <DialogDescription className="text-gray-300">
              Überprüfen Sie Ihre Artikel und schließen Sie Ihre Bestellung ab.
            </DialogDescription>
          </DialogHeader>

          {orderSuccess ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-serif mb-2 text-white">Bestellung bestätigt!</h3>
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
                  <h3 className="text-lg font-serif mb-2 text-white">Ihr Warenkorb ist leer</h3>
                  <p className="text-gray-400 mb-4">
                    Fügen Sie einige köstliche Gerichte aus unserer Speisekarte hinzu!
                  </p>
                  <Button onClick={() => setOrderOpen(false)} className="bg-amber-400 text-black hover:bg-amber-500">
                    Speisekarte durchsuchen
                  </Button>
                </div>
              ) : (
                <>
                  <div className="max-h-[40vh] md:max-h-[300px] overflow-y-auto pr-2 flex-grow">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 py-3 border-b border-gray-800"
                      >
                        <div className="h-12 w-12 sm:h-16 sm:w-16 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm sm:text-base truncate">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-400">${item.price.toFixed(2)}</p>
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
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 sm:h-8 px-1 sm:px-2 text-xs sm:text-sm text-amber-400 hover:text-amber-500 hover:bg-gray-800"
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
                      <span className="text-amber-400">${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="border-gray-800" />

                  <div className="space-y-3 sm:space-y-4 overflow-y-auto flex-shrink-0">
                    <div>
                      <Label className="text-base font-serif text-white">Abholung oder Lieferung</Label>
                      <RadioGroup defaultValue="pickup" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pickup" id="pickup" className="text-amber-400 border-gray-700" />
                          <Label htmlFor="pickup" className="text-gray-300">
                            Abholung (Fertig in 30 Min.)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" className="text-amber-400 border-gray-700" />
                          <Label htmlFor="delivery" className="text-gray-300">
                            Lieferung (45-60 Min.)
                          </Label>
                        </div>
                      </RadioGroup>
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
                          className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                          className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
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
                        className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-300">
                        Adresse (für Lieferung)
                      </Label>
                      <Input
                        id="address"
                        placeholder="Lieferadresse"
                        className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-gray-300">
                        Besondere Anweisungen (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Besondere Wünsche oder Hinweise"
                        className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-amber-400 text-black hover:bg-amber-500"
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
    </div>
  )
}

