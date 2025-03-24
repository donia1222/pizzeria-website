import { json } from "@remix-run/node"
import { readFile, writeFile } from "fs/promises"
import path from "path"
// @ts-ignore
import { v4 as uuidv4 } from "uuid"

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
  // Ensure the data directory exists
  const dataDir = path.join(process.cwd(), "data")
  try {
    await writeFile(dataFilePath, JSON.stringify(reservations, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving reservations:", error)
    throw new Error("Failed to save reservation")
  }
}

// GET handler to retrieve all reservations
export async function loader() {
  try {
    const reservations = await getReservations()
    return json(reservations)
  } catch (error) {
    return json({ error: "Failed to load reservations" }, { status: 500 })
  }
}

// POST handler to create a new reservation
export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 })
  }

  try {
    const formData = await request.formData()
    const reservationData = Object.fromEntries(formData)

    // Validate required fields
    const requiredFields = ["date", "time", "guests", "name", "email", "phone", "mealType"]
    for (const field of requiredFields) {
      if (!reservationData[field]) {
        return json({ error: `Field ${field} is required` }, { status: 400 })
      }
    }

    // Create new reservation with ID and timestamp
    const newReservation: Reservation = {
      id: uuidv4(),
      date: reservationData.date as string,
      time: reservationData.time as string,
      guests: reservationData.guests as string,
      name: reservationData.name as string,
      email: reservationData.email as string,
      phone: reservationData.phone as string,
      notes: (reservationData.notes as string) || "",
      mealType: reservationData.mealType as string,
      createdAt: new Date().toISOString(),
    }

    // Get existing reservations and add the new one
    const reservations = await getReservations()
    reservations.push(newReservation)

    // Save updated reservations
    await saveReservations(reservations)

    return json({ success: true, reservation: newReservation })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

