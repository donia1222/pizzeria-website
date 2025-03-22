"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function OliveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a1a]"></div>

      {/* Gradiente estático */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c3320]/30 via-transparent to-[#2c3320]/20"></div>

      {/* Círculos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6b7841]/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8c9a56]/15 rounded-full filter blur-[80px]"></div>
      </div>

      {/* Efecto de seguimiento del ratón */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#4c5830]/10 filter blur-[120px]"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50,
          mass: 2,
        }}
      />

      {/* Patrón de puntos */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(#8c9a56 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
    </div>
  )
}

