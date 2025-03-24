import { json } from "@remix-run/node"
import { readFile, writeFile } from "fs/promises"
import path from "path"

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
  confirmed?: boolean
  confirmedAt?: string
}

// Path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "reservations.json")

// Helper function to read reservations
async function getReservations(): Promise<Reservation[]> {
  try {
    const data = await readFile(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return []
  }
}

// Helper function to write reservations
async function saveReservations(reservations: Reservation[]): Promise<void> {
  try {
    // Asegurarse de que el directorio existe antes de escribir
    const fs = await import("fs/promises")
    const dataDir = path.join(process.cwd(), "data")

    try {
      await fs.mkdir(dataDir, { recursive: true })
    } catch (dirError) {
      console.error("Error creating directory:", dirError)
    }

    await writeFile(dataFilePath, JSON.stringify(reservations, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving reservations:", error)
    throw new Error("Failed to save reservation")
  }
}

// GET handler to retrieve a specific reservation
export async function loader({ params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return json({ error: "Reservation ID is required" }, { status: 400 })
  }

  try {
    const reservations = await getReservations()
    const reservation = reservations.find((r) => r.id === id)

    if (!reservation) {
      return json({ error: "Reservation not found" }, { status: 404 })
    }

    return json(reservation)
  } catch (error) {
    return json({ error: "Failed to load reservation" }, { status: 500 })
  }
}

// Action handler for PATCH and DELETE
export async function action({ request, params }: { request: Request; params: { id: string } }) {
  const id = params.id

  if (!id) {
    return json({ error: "Reservation ID is required" }, { status: 400 })
  }

  // Handle DELETE request
  if (request.method === "DELETE") {
    try {
      const reservations = await getReservations()
      const reservationIndex = reservations.findIndex((r) => r.id === id)

      if (reservationIndex === -1) {
        return json({ error: "Reservation not found" }, { status: 404 })
      }

      // Remove the reservation
      reservations.splice(reservationIndex, 1)

      // Save updated reservations
      await saveReservations(reservations)

      return json({ success: true })
    } catch (error) {
      return json({ error: "Failed to delete reservation" }, { status: 500 })
    }
  }

  // Handle PATCH request (for updating confirmation status)
  if (request.method === "PATCH") {
    try {
      const reservations = await getReservations()
      const reservationIndex = reservations.findIndex((r) => r.id === id)

      if (reservationIndex === -1) {
        return json({ error: "Reservation not found" }, { status: 404 })
      }

      // Get the request body
      const body = await request.json()

      // Update the reservation
      reservations[reservationIndex] = {
        ...reservations[reservationIndex],
        ...body,
        // If confirming, add timestamp
        ...(body.confirmed === true ? { confirmedAt: new Date().toISOString() } : {}),
      }

      // Save updated reservations
      await saveReservations(reservations)

      return json({
        success: true,
        reservation: reservations[reservationIndex],
      })
    } catch (error) {
      console.error("Error updating reservation:", error)
      return json({ error: "Failed to update reservation" }, { status: 500 })
    }
  }

  return json({ error: "Method not allowed" }, { status: 405 })
}

