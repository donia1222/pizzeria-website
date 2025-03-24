"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Check, Loader2, X } from "lucide-react"
import { cn } from "../lib/utils"

// Tipos
interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Componentes auxiliares
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
        "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

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
        "flex w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

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
  onClose,
  ...props
}: {
  children: React.ReactNode
  className?: string
  onClose?: () => void
  [key: string]: any
}) => {
  return (
    <div
      className={cn(
        "relative z-50 max-w-lg w-full bg-gray-900 border border-gray-800 p-6 shadow-lg rounded-lg max-h-[90vh] overflow-auto",
        className,
      )}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      )}
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

// Función para crear el enlace mailto para la reserva
function createReservationMailtoLink(data: {
  date: string
  time: string
  guests: string
  name: string
  email: string
  phone: string
  notes: string
  mealType: string
}): string {
  // Formatear la fecha para mostrarla de manera más legible
  const formattedDate = new Date(data.date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const subject = encodeURIComponent(
    `Tischreservierung - ${data.name} - ${formattedDate}, ${data.time} Uhr (${data.mealType})`,
  )

  const body = encodeURIComponent(
    `Tischreservierung Details:\n\n` +
      `Datum: ${formattedDate}\n` +
      `Zeit: ${data.time} Uhr\n` +
      `Mahlzeit: ${data.mealType}\n` +
      `Anzahl der Gäste: ${data.guests}\n\n` +
      `Kontaktinformationen:\n` +
      `Name: ${data.name}\n` +
      `E-Mail: ${data.email}\n` +
      `Telefon: ${data.phone}\n\n` +
      (data.notes ? `Besondere Wünsche:\n${data.notes}\n\n` : "") +
      `Diese Reservierung wurde über das Reservierungsformular auf der Website gesendet.`,
  )

  return `mailto:info@bouquetmediterraneo.ch?subject=${subject}&body=${body}`
}

// Función para verificar si una fecha es domingo o lunes
function isDisabledDay(date: Date): boolean {
  const day = date.getDay()
  // 0 es domingo, 1 es lunes
  return day === 0 || day === 1
}

// Componente principal de reservas
export const ReservationButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      className="hidden md:flex items-center space-x-2 bg-transparent border border-[#8c9a56] text-[#8c9a56] px-4 py-2 text-sm uppercase tracking-wider hover:bg-[#8c9a56] hover:text-black transition-colors rounded-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Calendar className="h-4 w-4" />
      <span>Reservieren</span>
    </motion.button>
  )
}

export const ReservationDialog = ({ open, onOpenChange }: ReservationDialogProps) => {
  // Estados para el formulario
  const [reservationDate, setReservationDate] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [reservationGuests, setReservationGuests] = useState("")
  const [reservationName, setReservationName] = useState("")
  const [reservationEmail, setReservationEmail] = useState("")
  const [reservationPhone, setReservationPhone] = useState("")
  const [reservationNotes, setReservationNotes] = useState("")
  const [reservationSuccess, setReservationSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mealType, setMealType] = useState<"Mittagessen" | "Abendessen">("Mittagessen")
  const [saveToDatabase, setSaveToDatabase] = useState(true)

  // Horarios disponibles según el tipo de comida
  const lunchTimes = ["11:30", "12:00", "12:30", "13:30"]
  const dinnerTimes = ["17:30", "18:30", "19:30", "20:00", "20:30", "21:00"]

  // Obtener los horarios disponibles según el tipo de comida seleccionado
  const availableTimes = mealType === "Mittagessen" ? lunchTimes : dinnerTimes

  // Función para obtener la fecha mínima (hoy)
  const getMinDate = (): string => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Función para verificar si una fecha es válida (no domingo ni lunes)
  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    return !isDisabledDay(date)
  }

  // Efecto para validar la fecha seleccionada
  useEffect(() => {
    if (reservationDate && !isValidDate(reservationDate)) {
      // Si la fecha seleccionada es domingo o lunes, mostrar alerta
      alert("Wir sind sonntags und montags geschlossen. Bitte wählen Sie einen anderen Tag.")
      setReservationDate("")
    }
  }, [reservationDate])

  // Efecto para resetear la hora cuando cambia el tipo de comida
  useEffect(() => {
    setReservationTime("")
  }, [mealType])

  // Función para guardar la reserva en la base de datos
  const saveReservationToDatabase = async (data: {
    date: string
    time: string
    guests: string
    name: string
    email: string
    phone: string
    notes: string
    mealType: string
  }) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await fetch("/api/reservations", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to save reservation")
      }

      return await response.json()
    } catch (error) {
      console.error("Error saving reservation:", error)
      throw error
    }
  }

  // Manejar envío de reserva
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar que la fecha sea válida
    if (!isValidDate(reservationDate)) {
      alert("Bitte wählen Sie einen gültigen Tag (Dienstag bis Samstag).")
      return
    }

    setIsSubmitting(true)

    try {
      const reservationData = {
        date: reservationDate,
        time: reservationTime,
        guests: reservationGuests,
        name: reservationName,
        email: reservationEmail,
        phone: reservationPhone,
        notes: reservationNotes,
        mealType: mealType,
      }

      // Guardar en la base de datos si está activada la opción
      if (saveToDatabase) {
        await saveReservationToDatabase(reservationData)
      }

      // Crear y abrir el enlace mailto
      const mailtoLink = createReservationMailtoLink(reservationData)
      window.location.href = mailtoLink

      // Mostrar mensaje de éxito
      setIsSubmitting(false)
      setReservationSuccess(true)

      // Resetear formulario después del éxito
      setTimeout(() => {
        onOpenChange(false)
        setReservationSuccess(false)
        // Resetear campos del formulario
        setReservationDate("")
        setReservationTime("")
        setReservationGuests("")
        setReservationName("")
        setReservationEmail("")
        setReservationPhone("")
        setReservationNotes("")
        setMealType("Mittagessen")
        setSaveToDatabase(true)
      }, 2000)
    } catch (error) {
      setIsSubmitting(false)
      alert("Es gab ein Problem bei der Speicherung Ihrer Reservierung. Bitte versuchen Sie es später erneut.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-[#8c9a56]">Tisch reservieren</DialogTitle>
          <DialogDescription className="text-gray-300">
            Füllen Sie das Formular aus, um Ihren Tisch bei Bouquet Mediterraneo zu reservieren.
            <span className="block mt-2 text-amber-400">Hinweis: Wir sind sonntags und montags geschlossen.</span>
          </DialogDescription>
        </DialogHeader>

        {reservationSuccess ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-[#8c9a56]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#8c9a56]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Reservierung bestätigt!</h3>
            <p className="text-gray-300">
              Wir haben eine Bestätigung an Ihre E-Mail gesendet. Wir freuen uns darauf, Sie zu bedienen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReservationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meal-type" className="text-gray-300">
                Mahlzeit
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMealType("Mittagessen")}
                  className={`py-2 px-4 rounded-md text-center transition-colors ${
                    mealType === "Mittagessen"
                      ? "bg-green-800 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Mittagessen
                </button>
                <button
                  type="button"
                  onClick={() => setMealType("Abendessen")}
                  className={`py-2 px-4 rounded-md text-center transition-colors ${
                    mealType === "Abendessen"
                      ? "bg-green-800 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Abendessen
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reservation-date" className="text-gray-300">
                  Datum
                </Label>
                <Input
                  id="reservation-date"
                  type="date"
                  required
                  value={reservationDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationDate(e.target.value)}
                  min={getMinDate()}
                  className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
                />
                <p className="text-xs text-amber-400">Dienstag bis Samstag</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reservation-time" className="text-gray-300">
                  Zeit
                </Label>
                <div className="relative">
                  <select
                    id="reservation-time"
                    value={reservationTime}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReservationTime(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8c9a56]"
                  >
                    <option value="" disabled>
                      Uhrzeit wählen
                    </option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time} Uhr
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {mealType === "Mittagessen" ? "11:30 - 13:30 Uhr" : "17:30 - 21:00 Uhr"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservation-guests" className="text-gray-300">
                Anzahl der Gäste
              </Label>
              <div className="relative">
                <select
                  id="reservation-guests"
                  value={reservationGuests}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReservationGuests(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8c9a56]"
                >
                  <option value="" disabled>
                    Anzahl wählen
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num.toString()}>
                      {num} {num === 1 ? "Person" : "Personen"}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservation-name" className="text-gray-300">
                Name
              </Label>
              <Input
                id="reservation-name"
                placeholder="Ihr vollständiger Name"
                required
                value={reservationName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservation-email" className="text-gray-300">
                E-Mail
              </Label>
              <Input
                id="reservation-email"
                type="email"
                placeholder="Ihre E-Mail"
                required
                value={reservationEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservation-phone" className="text-gray-300">
                Telefon
              </Label>
              <Input
                id="reservation-phone"
                placeholder="Ihre Telefonnummer"
                required
                value={reservationPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationPhone(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservation-notes" className="text-gray-300">
                Besondere Wünsche (Optional)
              </Label>
              <Textarea
                id="reservation-notes"
                placeholder="Besondere Wünsche oder Ernährungsbedürfnisse"
                value={reservationNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReservationNotes(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:border-[#8c9a56] focus:ring-[#8c9a56]"
              />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="save-to-database"
                checked={saveToDatabase}
                onChange={(e) => setSaveToDatabase(e.target.checked)}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#8c9a56] focus:ring-[#8c9a56]"
              />
              <Label htmlFor="save-to-database" className="text-gray-300">
                Reservierung im System speichern
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-green-800 text-white hover:bg-green-900"
                disabled={isSubmitting || !isValidDate(reservationDate)}
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
  )
}

