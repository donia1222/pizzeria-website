import fs from "fs"
import path from "path"

// Function to ensure the data directory exists
export function ensureDataDirectoryExists(): void {
  const dataDir = path.join(process.cwd(), "data")

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const reservationsFile = path.join(dataDir, "reservations.json")

  if (!fs.existsSync(reservationsFile)) {
    fs.writeFileSync(reservationsFile, JSON.stringify([], null, 2), "utf8")
  }
}

