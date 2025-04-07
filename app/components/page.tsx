import { AdminGalleryUploader } from "./admin-gallery-uploader"

export default function AdminGalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold text-[#8c9a56]">Panel de Administración - Galería</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8">Administración de la Galería</h2>
        <AdminGalleryUploader />
      </main>
    </div>
  )
}

