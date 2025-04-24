"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface ReservationConfirmationProps {
  open: boolean
  onClose: () => void
  reservationData: {
    date: string
    time: string
    guests: string
    name: string
    email: string
    phone: string
    notes: string
    mealType: string
  }
}

export default function ReservationConfirmation({ open, onClose, reservationData }: ReservationConfirmationProps) {
  const [isSending, setIsSending] = useState(false)

  if (!open) return null

  // Format date for better readability
  const formattedDate = new Date(reservationData.date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleSendToWhatsApp = () => {
    setIsSending(true)

    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `*Tischreservierung Details:*\n\n` +
        `Datum: ${formattedDate}\n` +
        `Zeit: ${reservationData.time} Uhr\n` +
        `Mahlzeit: ${reservationData.mealType}\n` +
        `Anzahl der Gäste: ${reservationData.guests}\n\n` +
        `*Kontaktinformationen:*\n` +
        `Name: ${reservationData.name}\n` +
        `E-Mail: ${reservationData.email}\n` +
        `Telefon: ${reservationData.phone}\n\n` +
        (reservationData.notes ? `*Besondere Wünsche:*\n${reservationData.notes}\n\n` : "") +
        `Diese Reservierung wurde über das Reservierungsformular auf der Website gesendet.`,
    )

    // WhatsApp number - replace with your restaurant's number
    const whatsappNumber = "+41783144209" // Example number

    // Create and open WhatsApp link
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    window.open(whatsappLink, "_blank")

    // Close modal after a short delay
    setTimeout(() => {
      setIsSending(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-50 max-w-md w-full bg-gray-900 border border-gray-800 p-6 shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Schließen"
        >
          <X size={20} />
        </button>

        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>

          <h3 className="text-xl font-bold mb-4 text-white">Reservierung bestätigt!</h3>

          <div className="text-left bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Datum:</span> {formattedDate}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Zeit:</span> {reservationData.time} Uhr
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Mahlzeit:</span> {reservationData.mealType}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Gäste:</span> {reservationData.guests}
            </p>
          </div>

          <p className="text-gray-300 mb-6">
            Ihre Reservierung wurde erfolgreich bestätigt. Klicken Sie auf die Schaltfläche unten, um die Details an das
            Restaurant per WhatsApp zu senden.
          </p>

          <button
            onClick={handleSendToWhatsApp}
            className="w-full py-2 px-4 bg-green-800 hover:bg-green-700 text-white rounded-md transition-colors"
            disabled={isSending}
          >
            {isSending ? "Wird gesendet..." : "Per WhatsApp an Restaurant senden"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
