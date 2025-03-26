"use client"

import type React from "react"

import { useState } from "react"
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
  const [visibleCount, setVisibleCount] = useState(6)

  // Filter items by the active category
  const filteredItems = items.filter((item) => item.category === activeCategory)

  // Slice the filtered items to show only the visible count
  const visibleItems = filteredItems.slice(0, visibleCount)

  // Determine if we should show the "Show More" button
  const showMoreButton = filteredItems.length > 12 && visibleCount < filteredItems.length

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
    <div className="bg-gray-900 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#8c9a56]/20">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.popular && (
          <div className="absolute top-2 right-2 bg-[#8c9a56] text-black text-xs font-bold px-2 py-1 rounded-full">
            Beliebt
          </div>
        )}
        {item.vegetarian && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Vegetarisch
          </div>
        )}
        {item.vegan && (
          <div className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded-full">
            Vegan
          </div>
        )}
        {item.spicy && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Scharf
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#8c9a56] font-bold">{item.price.toFixed(2)} CHF</span>
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

