import type React from "react"

export const MediterraneanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-5 overflow-hidden">
      {/* Olive Branch 1 - Top Left */}
      <svg
        className="absolute top-0 left-0 w-64 h-64 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,50 Q35,35 50,50 T80,50" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M30,40 Q40,30 50,40" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M40,45 Q50,35 60,45" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50,50 Q60,40 70,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse
          cx="35"
          cy="38"
          rx="3"
          ry="5"
          transform="rotate(-30 35 38)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="45"
          cy="43"
          rx="3"
          ry="5"
          transform="rotate(-30 45 43)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="55"
          cy="48"
          rx="3"
          ry="5"
          transform="rotate(-30 55 48)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="65"
          cy="53"
          rx="3"
          ry="5"
          transform="rotate(-30 65 53)"
          fill="currentColor"
          className="text-green-300"
        />
      </svg>

      {/* Olive Branch 2 - Bottom Right */}
      <svg
        className="absolute bottom-0 right-0 w-80 h-80 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80,50 Q65,65 50,50 T20,50" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M70,60 Q60,70 50,60" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M60,55 Q50,65 40,55" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M50,50 Q40,60 30,50" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse
          cx="65"
          cy="62"
          rx="3"
          ry="5"
          transform="rotate(30 65 62)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="55"
          cy="57"
          rx="3"
          ry="5"
          transform="rotate(30 55 57)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="45"
          cy="52"
          rx="3"
          ry="5"
          transform="rotate(30 45 52)"
          fill="currentColor"
          className="text-green-300"
        />
        <ellipse
          cx="35"
          cy="47"
          rx="3"
          ry="5"
          transform="rotate(30 35 47)"
          fill="currentColor"
          className="text-green-300"
        />
      </svg>

      {/* Olive 1 - Center Left */}
      <svg
        className="absolute top-1/3 left-0 w-24 h-24 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="15"
          ry="25"
          transform="rotate(-15 50 50)"
          fill="currentColor"
          className="text-green-300"
        />
        <path d="M50,25 Q55,50 50,75" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Olive 2 - Center Right */}
      <svg
        className="absolute top-2/3 right-0 w-20 h-20 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="50"
          cy="50"
          rx="15"
          ry="25"
          transform="rotate(15 50 50)"
          fill="currentColor"
          className="text-green-300"
        />
        <path d="M50,25 Q45,50 50,75" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Mediterranean Sun - Top Right */}
      <svg
        className="absolute top-10 right-10 w-32 h-32 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="15" fill="currentColor" />
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 25 * Math.cos((i * Math.PI) / 6)}
            y2={50 + 25 * Math.sin((i * Math.PI) / 6)}
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Grape Vine - Bottom Left */}
      <svg
        className="absolute bottom-10 left-10 w-40 h-40 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,80 Q35,65 50,80 T80,80" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="30" cy="70" r="5" fill="currentColor" />
        <circle cx="40" cy="75" r="5" fill="currentColor" />
        <circle cx="50" cy="70" r="5" fill="currentColor" />
        <circle cx="60" cy="75" r="5" fill="currentColor" />
        <circle cx="70" cy="70" r="5" fill="currentColor" />
      </svg>
    </div>
  )
}



