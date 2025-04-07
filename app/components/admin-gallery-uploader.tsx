"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface GalleryImage {
  id: number
  nombre: string
  ruta: string
  descripcion: string
  fecha_subida: string
  url: string
}

export function AdminGalleryUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Bilder beim Mounten der Komponente laden
  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const response = await fetch("https://web.lweb.ch/obtener_imagenes.php")
      const data = await response.json()

      if (data.exito) {
        setImages(data.imagenes)
      } else {
        setErrorMessage(data.mensaje || "Bilder konnten nicht geladen werden")
      }
    } catch (error) {
      setErrorMessage("Fehler bei der Verbindung zum Server")
    }
  }

  // Dateiauswahl verarbeiten
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    processFile(file)
  }

  // Verarbeitet die ausgewählte Datei
  const processFile = (file: File | null) => {
    setSelectedFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  // Klick auf die Schaltfläche "Datei auswählen" verarbeiten
  const handleSelectFileClick = () => {
    fileInputRef.current?.click()
  }

  // Drag & Drop Ereignisse
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      // Überprüfen, ob es sich um ein Bild handelt
      if (file.type.startsWith("image/")) {
        processFile(file)
      } else {
        setErrorMessage("Bitte wählen Sie nur Bilddateien aus (JPG, PNG, GIF)")
      }
    }
  }

  // Bild hochladen
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setErrorMessage("Bitte wählen Sie zuerst ein Bild aus")
      return
    }

    setIsUploading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const formData = new FormData()
      formData.append("imagen", selectedFile)
      formData.append("descripcion", description)

      const response = await fetch("https://web.lweb.ch/anadir_imagen.php", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.exito) {
        setSuccessMessage("Bild erfolgreich hochgeladen")

        // Formular zurücksetzen
        setSelectedFile(null)
        setPreviewUrl(null)
        setDescription("")

        // Bilder neu laden
        loadImages()
      } else {
        setErrorMessage(data.mensaje || "Fehler beim Hochladen des Bildes")
      }
    } catch (error) {
      setErrorMessage("Fehler bei der Verbindung zum Server")
    } finally {
      setIsUploading(false)
    }
  }

  // Bild löschen
  const handleDeleteImage = async (id: number) => {
    if (!confirm("Sind Sie sicher, dass Sie dieses Bild löschen möchten?")) {
      return
    }

    setIsDeleting(id)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const formData = new FormData()
      formData.append("id", id.toString())

      const response = await fetch("https://web.lweb.ch/eliminar_imagen.php", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.exito) {
        setSuccessMessage("Bild erfolgreich gelöscht")
        // Bilder neu laden
        loadImages()
      } else {
        setErrorMessage(data.mensaje || "Fehler beim Löschen des Bildes")
      }
    } catch (error) {
      setErrorMessage("Fehler bei der Verbindung zum Server")
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="space-y-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#8c9a56] text-center">Galerie-Verwaltung</h1>
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Neues Bild zur Galerie hochladen</h2>
            <p className="text-gray-400 text-sm mt-1">Fügen Sie neue Bilder zur Restaurantgalerie hinzu</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleUpload} className="space-y-4">
              <div
                ref={dropZoneRef}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors bg-gray-950 ${
                  isDragging ? "border-[#8c9a56] bg-[#8c9a56]/10" : "border-gray-700 hover:border-[#8c9a56]"
                }`}
                onClick={handleSelectFileClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative mx-auto max-w-xs">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Vorschau"
                      className="mx-auto max-h-48 object-contain rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      Klicken Sie, um das Bild zu ändern oder ziehen Sie ein neues Bild hierher
                    </p>
                  </div>
                ) : (
                  <div className="py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`mx-auto h-12 w-12 ${isDragging ? "text-[#8c9a56]" : "text-gray-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm font-medium text-gray-300">
                      {isDragging
                        ? "Lassen Sie das Bild hier los"
                        : "Klicken Sie, um ein Bild auszuwählen oder ziehen Sie es hierher"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF bis zu 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleFileChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-300">
                  Beschreibung (optional)
                </label>
                <textarea
                  id="description"
                  placeholder="Fügen Sie eine Beschreibung für das Bild hinzu..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#8c9a56]"
                />
              </div>

              {errorMessage && (
                <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-2 rounded-md text-sm">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-2 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="w-full bg-[#8c9a56] text-black hover:bg-[#a0b266] disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 rounded-md font-medium flex items-center justify-center"
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Hochladen...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Bild hochladen
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Galeriebilder</h2>
            <p className="text-gray-400 text-sm mt-1">Verwalten Sie die vorhandenen Bilder in der Galerie</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.length > 0 ? (
                images.map((image) => (
                  <div key={image.id} className="relative group overflow-hidden rounded-lg border border-gray-800">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.descripcion || image.nombre}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <div className="text-white text-sm">
                        {image.descripcion && <p>{image.descripcion}</p>}
                        <p className="text-xs opacity-70 mt-1">{new Date(image.fecha_subida).toLocaleDateString()}</p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs flex items-center opacity-90"
                          onClick={() => handleDeleteImage(image.id)}
                          disabled={isDeleting === image.id}
                        >
                          {isDeleting === image.id ? (
                            <svg
                              className="animate-spin h-4 w-4 mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                          {isDeleting === image.id ? "Löschen..." : "Löschen"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2">Keine Bilder in der Galerie</p>
                  <p className="text-sm">Laden Sie einige Bilder hoch, um sie hier anzuzeigen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

