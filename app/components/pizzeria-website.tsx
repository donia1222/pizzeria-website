"use client"

import type React from "react"
import ScrollTextImage from "./scroll-text-image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Phone, Clock, Calendar, MapPin, Instagram, Mail, PhoneCall, ShoppingBag, Star } from "lucide-react"

import { MediterraneanBackground } from "./mediterranean-background"
import { ReservationButton, ReservationDialog } from "./reservation-system"
import { type MenuItem as MenuItemType, CartButton, OrderDialog, type CartItem } from "./order-system"
import { TestimonialsSection } from "./testimonials"
import { ContactForm } from "./contact-form"
import { MenuFilter } from "./menu-filter"
import { GallerySection } from "./gallery-section" // Importamos el componente de galería

// Import data from separate files
import { menuItems } from "../data/menu-items"
import { testimonials } from "../data/testimonials"
// Eliminamos la importación de galleryImages ya que ahora usamos el componente GallerySection
import { heroImages } from "../data/hero-images"
import { ImpressumModal } from "./impressum-modal"
import { DatenschutzModal } from "./datenschutz-modal"

// Utility function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Custom Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-4xl",
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  maxWidth?: string
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`${maxWidth} w-full max-h-[80vh] overflow-y-auto bg-gray-900 text-white border border-gray-800 rounded-lg shadow-xl`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-[#8c9a56]">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
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
  const isInView = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true

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
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function CookieConsent({ onAccept }: { onAccept: () => void }) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white text-sm md:text-base">
          Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Durch die
          weitere Nutzung der Website stimmen Sie der Verwendung von Cookies zu.
        </div>
        <div className="flex gap-3">
          <Button onClick={onAccept} className="bg-[#8c9a56] text-black hover:bg-[#a0b266]">
            Akzeptieren
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default function PizzeriaWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState("pizzas")
  const [pizzaSubcategory, setPizzaSubcategory] = useState("all")
  const [showButton, setShowButton] = useState(true)
  const [datenschutzOpen, setDatenschutzOpen] = useState(false)
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(true)

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
  const addToCart = (item: MenuItemType) => {
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

  // Filter menu items by category
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.category === activeCategory) {
      if (activeCategory === "pizzas" && pizzaSubcategory !== "all") {
        if (pizzaSubcategory === "vegetarian") {
          return item.vegetarian === true
        } else if (pizzaSubcategory === "classic") {
          return !item.vegetarian
        }
      }
      return true
    }
    return false
  })

  // Comprobar si el usuario ya ha aceptado las cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    if (cookiesAccepted) {
      setShowCookieConsent(false)
    }
  }, [])

  // Función para manejar la aceptación de cookies
  const handleCookieAccept = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setShowCookieConsent(false)
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

          <a href="#home" className="block">
            <img src="/logpmcopia.png" alt="Bouquet Mediterraneo" className="h-10 md:h-10 object-contain   rounded" />
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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest flex items-center ml-4"
            >
              <span>Nach oben</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <ReservationButton onClick={() => setReservationOpen(true)} />

            <CartButton
              onClick={() => setOrderOpen(true)}
              itemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
            />

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
      <section id="home" className="relative mb-20" ref={heroRef}>
        <div className="relative">
          <ImageCarousel images={heroImages} />

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col sm:flex-row justify-center gap-4 z-50"></div>
          </div>

          <div className="flex items-center justify-center mt-20">
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
                    <h2 className="text-4xl md:text-6xl font-bold">Cucina Mediterranea & Pizza</h2>
                  </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-300 max-w-xl mx-auto">
                  Frisch eröffnet! Erleben Sie unsere handgemachten Pizzen mit traditionellen Rezepten und besten
                  Zutaten
                </p>
                <div className="flex items-center justify-center mt-10   bg-black">
                  <div className="mb-6 md:mb-0">
                    <a href="#home" className="block">
                      <img
                        src="/logpmcopia.png"
                        alt="Bouquet Mediterraneo"
                        className="h-14 md:h-14 object-contain   rounded"
                      />
                    </a>
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">
                      <span className="text-[#8c9a56]">Bouquet </span>Mediterraneo
                    </h2>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
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
              <div className="relative z-10 overflow-hidden rounded-lg ">
                <img src="DSC08346.jpg" alt="Pizza im Holzofen" className="object-cover h-[500px] w-full" />
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
                reicht weit zurück. Ein ausgezeichneter Sommelier und gebürtiger Italiener, bringt ein Stück seines
                Heimatlandes zu Ihnen.
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
                    <AnimatedNumber value={16} />
                  </div>
                  <p className="text-gray-400 text-sm">Pizzasorten</p>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-[#8c9a56] mb-2">
                    <AnimatedNumber value={2024} />
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
            <h2 className="text-3xl font-bold mb-2 text-[#8c9a56]">Authentische italienische Pizza</h2>
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
                ["starters", "Antipasti e Primi"],
                ["desserts", "Desserts"],
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

            {/* Pizza subcategory filter */}
            {activeCategory === "pizzas" && (
              <div className="flex justify-start md:justify-center overflow-x-auto mt-4 pb-4 px-2">
                <motion.button
                  onClick={() => setPizzaSubcategory("all")}
                  className={cn(
                    "px-4 py-1 mx-2 text-xs uppercase tracking-wider transition-colors rounded-md flex-shrink-0",
                    pizzaSubcategory === "all"
                      ? "bg-[#8c9a56] text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700",
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Alle Pizzen
                </motion.button>

                <motion.button
                  onClick={() => setPizzaSubcategory("vegetarian")}
                  className={cn(
                    "px-4 py-1 mx-2 text-xs uppercase tracking-wider transition-colors rounded-md flex-shrink-0",
                    pizzaSubcategory === "vegetarian"
                      ? "bg-[#8c9a56] text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700",
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Vegetarische
                </motion.button>
              </div>
            )}
          </div>

          <MenuFilter items={filteredMenuItems} activeCategory={activeCategory} onAddToCart={addToCart} />
        </div>
        <motion.div
          className="mt-16 p-6 bg-gray-900 rounded-lg max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-[#8c9a56] font-bold text-xl mb-3">Herkunft:</h4>
          <ul className="text-gray-300 space-y-2">
            <li>
              <span className="font-medium">Poulet:</span> Schweiz und Brasilien
            </li>
            <li>
              <span className="font-medium">Rindfleisch:</span> Schweiz und Südamerika
            </li>
            <li>
              <span className="font-medium">Crevetten:</span> Vietnam
            </li>
            <li>
              <span className="font-medium">Schwein:</span> Schweiz und Italia
            </li>
  
          </ul>
          <p className="text-gray-400 text-sm mt-3 italic">
            Wir bemühen uns, Zutaten von höchster Qualität zu verwenden und unterstützen lokale Produzenten, wo immer
            möglich.
          </p>
          <p className="text-gray-400 text-sm mt-6 italic">
          Lieber Gast, über Zutaten welche allergische
Reaktionen auslösen können, informieren
Dich unsere Mitarbeiter gerne.
          </p>
          
        </motion.div>
      </section>

      <ScrollTextImage
        imageUrl="/professional-chef-preparing-food-kitchen.jpg"
        textItems={[
          "Authentische italienische Küche in Sevelen",
          "Frische Zutaten, traditionelle Rezepte",
          "Jetzt geöffnet - Buchen Sie Ihren Tisch heute",
        ]}
      />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Google Reviews Button */}
      <div className="flex justify-center pb-12 bg-black">
        <a
          href="https://www.google.com/search?num=10&client=safari&sca_esv=f63688edbc6800bd&sxsrf=AHTn8zpsGq7OkkwrMTCAWxdSJKhwkoLR4A:1744025906157&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzVmRcI_uqMOZtJMkKKAdOjBqA-gLXs3tsXBNTJCVviOATu1HusB4lu4IFWmdN8b2UmqdUF8vWt7585yX3y4R4lTRHLldTEPg_TuIUR3zyb1iEBIPbA%3D%3D&q=Bouquet+Mediterraneo+Rese%C3%B1as"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#8c9a56] text-black hover:bg-[#a0b266] transition-colors px-6 py-3 rounded-md font-medium flex items-center"
        >
          <Star className="h-5 w-5 mr-2" />
          Mehr Bewertungen anzeigen
        </a>
      </div>

      {/* Gallery Section - Reemplazamos la sección estática por nuestro componente dinámico */}
      <GallerySection />

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
                    <h4 className="text-white font-medium mb-2">Öffnungszeiten</h4>
                    <p className="text-gray-300">
                      <span className="font-bold">Dienstag - Samstag:</span>
                    </p>
                    <p className="text-gray-300">
                      <span className="font-bold"></span> 11:00–13:30, 17:30–22:00 Uhr
                    </p>
        
                    <p className="text-gray-300">
                      <span className="font-bold">Sontag:</span>  17:30–22:00 Uhr
                    </p>
                    <p className="text-gray-300">
                      <span className="font-bold">Montag:</span>{" "}
                      <span className="text-red-500 font-medium">Geschlossen</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Folgen Sie uns</h4>

                <div className="flex gap-4">
                  <motion.a
                    href="https://www.instagram.com/bouquet.mediterraneo/"
                    className="bg-gray-900 px-4 h-10 rounded-full flex items-center justify-center text-[#8c9a56] hover:bg-green-800 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={20} className="mr-2" />
                    <span>Instagram</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#home" className="block">
                <img
                  src="/logpmcopia.png"
                  alt="Bouquet Mediterraneo"
                  className="h-14 md:h-14 object-contain   rounded"
                />
              </a>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                <span className="text-[#8c9a56]">Bouquet </span>Mediterraneo
              </h2>

              <p className="text-gray-400 text-sm text-center">Cucina Mediterranea & Pizza</p>
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="text-gray-300 hover:text-[#8c9a56] transition-colors text-sm uppercase tracking-widest flex items-center ml-4"
              >
                <span>Nach oben</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <button
              onClick={() => setDatenschutzOpen(true)}
              className="text-[#8c9a56] hover:text-white text-base font-medium border border-[#8c9a56] px-4 py-2 rounded transition-colors"
            >
              Datenschutz
            </button>
            <button
              onClick={() => setImpressumOpen(true)}
              className="text-[#8c9a56] hover:text-white text-base font-medium border border-[#8c9a56] px-4 py-2 rounded transition-colors"
            >
              Impressum
            </button>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Bouquet Mediterraneo. Neu eröffnet in Sevelen.
            </p>
            {/* Enlace Clicable a lweb.ch */}
            <p className="mt-4">
              Webseite Design{" "}
              <a href="https://lweb.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                lweb.ch
              </a>
            </p>
    
          </div>
        </div>
      </footer>

      {/* Reservation Dialog */}
      <ReservationDialog open={reservationOpen} onOpenChange={setReservationOpen} />

      {/* Order Dialog */}
      <OrderDialog
        open={orderOpen}
        onOpenChange={setOrderOpen}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={(): void => {
          throw new Error("Function not implemented.")
        }}
      />

      {/* Phone button */}
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
      {/* Impressum Modal */}
      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />

      {/* Datenschutz Modal */}
      <DatenschutzModal isOpen={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />

      {/* Cookie Consent Banner */}
      {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} />}
    </div>
  )
}

