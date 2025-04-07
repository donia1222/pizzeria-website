"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GalleryImage {
  id: number
  nombre: string
  ruta: string
  descripcion: string
  fecha_subida: string
  url: string
}

export function GallerySection() {
  const [images, setImages] = useState<(GalleryImage | string)[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://web.lweb.ch/obtener_imagenes.php")
        const data = await response.json()

        if (data.exito) {
          // Añadir el video si es necesario
          const allMedia = [...data.imagenes]
          if (allMedia.length > 0) {
            // Insertar el video en una posición aleatoria o específica
            allMedia.splice(Math.min(2, allMedia.length), 0, "video")
          }
          setImages(allMedia)
        } else {
          setError(data.mensaje || "Error al cargar las imágenes")
        }
      } catch (error) {
        setError("Error al conectar con el servidor")
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  return (
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8c9a56]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={typeof image === "string" ? `video-${index}` : image.id}
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"></div>
                  </div>
                ) : (
                  <>
                    <img
                      src={typeof image === "string" ? image : image.url}
                      alt={typeof image === "string" ? "Galeriebild" : image.descripcion || "Galeriebild"}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"></div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
