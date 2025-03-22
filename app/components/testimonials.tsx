import { useRef } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "../lib/utils"

// Interfaces
interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
  image: string
  position?: string
}

// Componentes auxiliares
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

// Componente principal de testimonios
export const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const testimonialsContainerRef = useRef<HTMLDivElement>(null)

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
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-900 p-8 border border-gray-800 rounded-lg flex-none w-[350px]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        {testimonial.position && <p className="text-gray-400 text-xs">{testimonial.position}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <RatingStars rating={testimonial.rating} />
                    </div>
                  </div>
                  <p className="text-gray-300 mt-4">{testimonial.text}</p>
                </motion.div>
              ))}
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
  )
}
