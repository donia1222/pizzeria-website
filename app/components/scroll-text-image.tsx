"use client"

import { useEffect, useRef, useState } from "react"

// Utility function to conditionally join class names
function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface ScrollTextImageProps {
  imageUrl: string
  textItems: string[]
  className?: string
}

export default function ScrollTextImage({ imageUrl, textItems, className }: ScrollTextImageProps) {
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          document.addEventListener("scroll", handleScroll)
        } else {
          document.removeEventListener("scroll", handleScroll)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(section)

    const handleScroll = () => {
      if (!section || !containerRef.current) return

      const { top, height } = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress (0 to 1) with smoother interpolation
      const rawProgress = (windowHeight - top) / (windowHeight + height)
      const progress = Math.max(0, Math.min(1, rawProgress))
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setScrollProgress(progress)
      })

      // Calculate how far we've scrolled through the section
      const scrollPercentage = 1 - top / (windowHeight - height)

      // Determine which text to show based on scroll percentage
      if (scrollPercentage <= 0) {
        setActiveTextIndex(0)
      } else {
        const index = Math.min(Math.floor(scrollPercentage * textItems.length), textItems.length - 1)
        setActiveTextIndex(index)
      }
    }

    return () => {
      observer.disconnect()
      document.removeEventListener("scroll", handleScroll)
    }
  }, [textItems.length])

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8c9a56] rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8c9a56] rounded-full filter blur-3xl opacity-20 animate-pulse" />
      </div>
      
      <div
        ref={containerRef}
        className={classNames(
          "relative h-[60vh] max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl",
          className,
        )}
      >
        {/* Glassmorphism container */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10" />
        
        {/* Image with parallax effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Authentische italienische Küche"
            className="w-full h-full object-cover object-center"
            style={{ 
              transform: `scale(${1.1 + scrollProgress * 0.3 + activeTextIndex * 0.05})`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform'
            }}
          />
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,${0.9 - scrollProgress * 0.3}), rgba(0,0,0,${0.5 - scrollProgress * 0.3}), rgba(0,0,0,${0.3 - scrollProgress * 0.2}))`
            }}
          />
        </div>

        {/* Text content with modern styling */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center w-full max-w-5xl">
            {/* Small label above */}
            <div className="mb-6 opacity-90">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#8c9a56] to-[#a0b266] text-black font-bold text-sm uppercase tracking-wider rounded-full shadow-lg animate-pulse">
                Restaurant Bouquet Mediterraneo
              </span>
            </div>
            
            {/* Main rotating text */}
            <div className="relative h-32 md:h-40">
              {textItems.map((text, index) => (
                <div
                  key={index}
                  className={classNames(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700 transform",
                    activeTextIndex === index 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : index < activeTextIndex 
                        ? "opacity-0 -translate-y-8 scale-95" 
                        : "opacity-0 translate-y-8 scale-95",
                  )}
                >
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white drop-shadow-2xl">
                      {text}
                    </span>
                  </h2>
                </div>
              ))}
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
              {textItems.map((_, index) => (
                <div
                  key={index}
                  className={classNames(
                    "h-2 rounded-full transition-all duration-500",
                    activeTextIndex === index 
                      ? "w-8 bg-gradient-to-r from-[#8c9a56] to-[#a0b266] shadow-lg" 
                      : "w-2 bg-white/30",
                  )}
                />
              ))}
            </div>
            
            {/* Call to action button */}
            <div className="mt-10 opacity-0 animate-fade-in-delayed">
              <a
                href="#menu"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8c9a56] to-[#a0b266] text-black font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(140,154,86,0.5)] transform hover:scale-105 transition-all duration-300"
              >
                Speisekarte ansehen
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

