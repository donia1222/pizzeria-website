"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

// Tipos para el formulario
interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: "reserva" | "evento" | "feedback" | "otro"
  message: string
  newsletter: boolean
  privacy: boolean
}

// Función de validación simple
function validateForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.length < 2) {
    errors.name = "Der Name muss mindestens 2 Zeichen lang sein"
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Ungültige E-Mail-Adresse"
  }

  if (!data.subject) {
    errors.subject = "Bitte wählen Sie einen Betreff"
  }

  if (!data.message || data.message.length < 10) {
    errors.message = "Die Nachricht muss mindestens 10 Zeichen lang sein"
  }

  if (!data.privacy) {
    errors.privacy = "Sie müssen die Datenschutzrichtlinie akzeptieren"
  }

  return errors
}

// Función para crear el enlace mailto
function createMailtoLink(data: ContactFormData): string {
  const subjectMap = {
    reserva: "Tischreservierung",
    evento: "Private Veranstaltung",
    feedback: "Feedback",
    otro: "Sonstige Anfrage",
  }

  const subject = encodeURIComponent(`${subjectMap[data.subject]} - ${data.name}`)

  const body = encodeURIComponent(
    `Name: ${data.name}\n` +
      `E-Mail: ${data.email}\n` +
      (data.phone ? `Telefon: ${data.phone}\n` : "") +
      `\n${data.message}\n\n` +
      (data.newsletter ? "Ich möchte den Newsletter abonnieren.\n" : "") +
      "Diese Nachricht wurde über das Kontaktformular auf der Website gesendet.",
  )

  return `mailto:info@bouquetmediterraneo.ch?subject=${subject}&body=${body}`
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "reserva",
    message: "",
    newsletter: false,
    privacy: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulario
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      // Crear y abrir el enlace mailto
      const mailtoLink = createMailtoLink(formData)
      window.location.href = mailtoLink

      // Mostrar mensaje de éxito
      setStatus("success")

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "reserva",
          message: "",
          newsletter: false,
          privacy: false,
        })
        setStatus("idle")
      }, 3000)
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <div className="relative">

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 text-center border border-green-500/30"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">Nachricht gesendet!</h4>
          <p className="text-gray-300">
            Vielen Dank für Ihre Kontaktaufnahme. Wir werden Ihre Nachricht so schnell wie möglich beantworten.
          </p>
        </motion.div>
      ) : status === "error" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 text-center border border-red-500/30"
        >
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-white mb-2">Fehler beim Senden</h4>
          <p className="text-gray-300">
            Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-3 glass rounded-full border border-red-500/50 text-red-400 hover:text-white hover:border-red-500 transition-all duration-300 hover-lift"
          >
            Erneut versuchen
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ihr Name"
                className={`mt-2 flex h-12 w-full rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-700/50"
                } glass px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c9a56]/50 focus:border-[#8c9a56] transition-all duration-300`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ihre E-Mail-Adresse"
                className={`mt-2 flex h-12 w-full rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-700/50"
                } glass px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c9a56]/50 focus:border-[#8c9a56] transition-all duration-300`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Telefon (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ihre Telefonnummer"
                className="mt-2 flex h-12 w-full rounded-xl border border-gray-700/50 glass px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c9a56]/50 focus:border-[#8c9a56] transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                Betreff <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`mt-2 flex h-12 w-full rounded-xl border ${
                  errors.subject ? "border-red-500" : "border-gray-700/50"
                } glass px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8c9a56]/50 focus:border-[#8c9a56] transition-all duration-300 appearance-none cursor-pointer`}
              >
                <option value="evento">Private Veranstaltung</option>
                <option value="feedback">Feedback</option>
                <option value="otro">Sonstige Anfrage</option>
              </select>
              {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-300">
              Nachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ihre Nachricht"
              rows={4}
              className={`mt-2 flex w-full rounded-xl border ${
                errors.message ? "border-red-500" : "border-gray-700/50"
              } glass px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c9a56]/50 focus:border-[#8c9a56] transition-all duration-300 resize-none`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700/50 bg-gray-800/50 text-[#8c9a56] focus:ring-[#8c9a56] focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-300">
                Newsletter abonnieren
              </label>
            </div>

            <div className="flex items-start">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                checked={formData.privacy}
                onChange={handleChange}
                className={`h-4 w-4 rounded border-gray-700/50 bg-gray-800/50 text-[#8c9a56] focus:ring-[#8c9a56] focus:ring-offset-0 cursor-pointer ${
                  errors.privacy ? "border-red-500" : ""
                }`}
              />
              <label htmlFor="privacy" className="ml-2 text-sm text-gray-300">
                Ich habe die{" "}
                <a href="#" className="text-gradient hover:text-[#8c9a56] transition-colors duration-300">
                  Datenschutzrichtlinie
                </a>{" "}
                gelesen und akzeptiere sie
                <span className="text-red-500"> *</span>
              </label>
            </div>
            {errors.privacy && <p className="text-sm text-red-500">{errors.privacy}</p>}
          </div>

          <motion.button
            type="submit"
            className="w-full h-14 glass rounded-full font-medium border border-[#8c9a56]/50 text-[#8c9a56] hover:text-white hover:border-[#8c9a56] hover:shadow-glow transition-all duration-300 disabled:opacity-50 flex items-center justify-center group hover-lift"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Nachricht senden
          </motion.button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Felder mit <span className="text-red-500">*</span> sind Pflichtfelder
          </p>
        </form>
      )}
    </div>
  )
}

