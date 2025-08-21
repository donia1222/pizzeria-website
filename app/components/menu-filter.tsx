"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import type { MenuItem } from "../data/menu-items"

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

  // Utility function to conditionally join class names
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
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

interface MenuFilterProps {
  items: MenuItem[]
  activeCategory: string
  onAddToCart: (item: MenuItem) => void
}

export function MenuFilter({ items, activeCategory, onAddToCart }: MenuFilterProps) {
  // Show 6 items initially for all categories except desserts
  const initialCount = activeCategory === "desserts" ? 20 : 6
  const [visibleCount, setVisibleCount] = useState(initialCount)

  // Reset visible count when category changes
  useEffect(() => {
    const newInitialCount = activeCategory === "desserts" ? 20 : 6
    setVisibleCount(newInitialCount)
  }, [activeCategory])

  // Filter items by the active category
  const filteredItems = items.filter((item) => item.category === activeCategory)

  // Slice the filtered items to show only the visible count
  const visibleItems = filteredItems.slice(0, visibleCount)

  // Determine if we should show the "Show More" button (for categories with more than 6 items)
  const showMoreButton = filteredItems.length > 6 && visibleCount < filteredItems.length

  // Function to handle showing more items
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6)
  }

  // Utility function to conditionally join class names
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div>
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MenuItemComponent item={item} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
      </motion.div>

      {showMoreButton && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleShowMore}
            variant="outline"
            className="border-[#8c9a56] text-[#8c9a56] hover:bg-[#8c9a56] hover:text-black"
          >
            Mehr anzeigen
          </Button>
        </div>
      )}
    </div>
  )
}

// Re-export the MenuItem component to use in the filter
export function MenuItemComponent({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) {
  const [isOrdering, setIsOrdering] = useState(false)

  // Función para manejar el clic en el botón
  const handleOrderClick = () => {
    setIsOrdering(true)
    onAddToCart(item)

    // Restablecer después de la animación
    setTimeout(() => {
      setIsOrdering(false)
    }, 600)
  }

  // Utility function to conditionally join class names
  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className="glass rounded-2xl overflow-hidden group hover-lift hover-glow relative">
      <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-3 relative z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {item.popular && (
            <div className="bg-gradient-to-r from-[#8c9a56] to-[#a0b266] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">Beliebt</div>
          )}
          {item.vegetarian && (
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Vegetarisch</div>
          )}
          {item.vegan && <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Vegan</div>}
          {item.spicy && <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Scharf</div>}
        </div>
      </div>
      <div className="p-5 relative z-10">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#8c9a56] transition-colors duration-300">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gradient font-bold text-lg">{item.price.toFixed(2)} CHF</span>
          <Button
            onClick={handleOrderClick}
            variant="outline"
            className={cn(
              "text-white border-white hover:bg-white hover:text-white text-sm transition-all duration-300",
              isOrdering && "bg-[#8c9a56] border-[#8c9a56] text-white scale-110",
            )}
            size="sm"
            disabled={isOrdering}
          >
            {isOrdering ? "✓ Hinzugefügt" : "Bestellen"}
          </Button>
        </div>
      </div>
    </div>
  )
}
