"use client"

import { X } from "lucide-react"

interface ImpressumModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImpressumModal({ isOpen, onClose }: ImpressumModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gray-900 text-white border border-gray-800 rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-[#8c9a56]">IMPRESSUM</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Bouquet Mediterraneo</h3>

            <div className="space-y-2">
              <h4 className="font-semibold">Adresse</h4>
              <p>Bahnhofstrasse 46, 9475 Sevelen</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Telefon</h4>
              <p>081 785 10 00</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">E-Mail</h4>
              <p>info@bouquetmediterraneo.ch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

