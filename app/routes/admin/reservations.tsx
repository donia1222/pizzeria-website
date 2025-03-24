import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Calendar, Clock, Users } from "lucide-react"

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

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Reservierungsverwaltung</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {reservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Keine Reservierungen gefunden.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{reservation.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    reservation.mealType === "Mittagessen"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-indigo-100 text-indigo-800"
                  }`}
                >
                  {reservation.mealType}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{formatDate(reservation.date)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{reservation.time} Uhr</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    {reservation.guests} {Number.parseInt(reservation.guests) === 1 ? "Person" : "Personen"}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Kontakt:</p>
                    <p>{reservation.email}</p>
                    <p>{reservation.phone}</p>
                  </div>

                  {reservation.notes && (
                    <div>
                      <p className="text-gray-500">Notizen:</p>
                      <p className="line-clamp-2">{reservation.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



