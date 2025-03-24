"use client"

import type React from "react"

import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { Calendar, Clock, Users, Search, Mail, Filter, X } from "lucide-react"
import { useState, useEffect } from "react"

// Define the reservation type
interface Reservation {
  id: string
  date: string
  time: string
  guests: string
  name: string
  email: string
  phone: string
  notes: string
  mealType: string
  createdAt: string
}

export async function loader({ request }: LoaderFunctionArgs) {
  // En una aplicación real, añadirías autenticación aquí

  try {
    // Fetch reservations from our API route
    const response = await fetch(`${new URL(request.url).origin}/api/reservations`)

    if (!response.ok) {
      throw new Error("Failed to fetch reservations")
    }

    const reservations = await response.json()
    return json({ reservations, error: null })
  } catch (error) {
    console.error("Error loading reservations:", error)
    return json({ reservations: [], error: "Failed to load reservations" })
  }
}

export default function AdminReservations() {
  const { reservations, error } = useLoaderData<{
    reservations: Reservation[]
    error: string | null
  }>()

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [filterMealType, setFilterMealType] = useState(searchParams.get("mealType") || "")
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Create confirmation email
  const createConfirmationEmail = (reservation: Reservation) => {
    const formattedDate = formatDate(reservation.date)

    const subject = encodeURIComponent(`Bestätigung Ihrer Reservierung - ${formattedDate}, ${reservation.time} Uhr`)

    const body = encodeURIComponent(
      `Sehr geehrte(r) ${reservation.name},\n\n` +
        `Vielen Dank für Ihre Reservierung bei Bouquet Mediterraneo. Hiermit bestätigen wir Ihren Tisch:\n\n` +
        `Datum: ${formattedDate}\n` +
        `Zeit: ${reservation.time} Uhr\n` +
        `Mahlzeit: ${reservation.mealType}\n` +
        `Anzahl der Gäste: ${reservation.guests}\n\n` +
        `Wir freuen uns auf Ihren Besuch!\n\n` +
        `Bei Fragen oder Änderungswünschen kontaktieren Sie uns bitte telefonisch oder per E-Mail.\n\n` +
        `Mit freundlichen Grüßen,\n` +
        `Das Team von Bouquet Mediterraneo`,
    )

    return `mailto:${reservation.email}?subject=${subject}&body=${body}`
  }

  // Filter reservations based on search term and meal type
  useEffect(() => {
    let filtered = [...reservations]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (res) =>
          res.name.toLowerCase().includes(term) ||
          res.email.toLowerCase().includes(term) ||
          res.phone.includes(term) ||
          formatDate(res.date).toLowerCase().includes(term),
      )
    }

    if (filterMealType) {
      filtered = filtered.filter((res) => res.mealType === filterMealType)
    }

    // Ordenar por fecha de creación (createdAt) - las más recientes primero
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFilteredReservations(filtered)

    // Update URL params
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (filterMealType) params.set("mealType", filterMealType)
    setSearchParams(params, { replace: true })
  }, [reservations, searchTerm, filterMealType, setSearchParams])

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("")
    setFilterMealType("")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Reservierungsverwaltung</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterMealType}
                onChange={(e) => setFilterMealType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Alle Mahlzeiten</option>
                <option value="Mittagessen">Mittagessen</option>
                <option value="Abendessen">Abendessen</option>
              </select>

              {(searchTerm || filterMealType) && (
                <button
                  onClick={clearFilters}
                  className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  title="Filter zurücksetzen"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-3 rounded-md mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {filteredReservations.length} {filteredReservations.length === 1 ? "Reservierung" : "Reservierungen"}{" "}
            gefunden
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filter: {filterMealType || "Keine"}</span>
          </div>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Keine Reservierungen gefunden</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm || filterMealType
              ? "Versuchen Sie, Ihre Suchkriterien zu ändern oder Filter zurückzusetzen."
              : "Es wurden noch keine Reservierungen erstellt."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-gray-800">{reservation.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    reservation.mealType === "Mittagessen"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-indigo-100 text-indigo-800"
                  }`}
                >
                  {reservation.mealType}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{formatDate(reservation.date)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{reservation.time} Uhr</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {reservation.guests} {Number.parseInt(reservation.guests) === 1 ? "Person" : "Personen"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Kontakt:</p>
                    <p className="text-sm text-gray-700">{reservation.email}</p>
                    <p className="text-sm text-gray-700">{reservation.phone}</p>
                  </div>

                  {reservation.notes && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Notizen:</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{reservation.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={createConfirmationEmail(reservation)}
                  className="flex items-center justify-center w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Reservierung bestätigen</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

