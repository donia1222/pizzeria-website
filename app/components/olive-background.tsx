"use client"

export const MediterraneanBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "url('/mediterranean-tile.svg')",
        opacity: 0.1,
      }}
    />
  )
}

