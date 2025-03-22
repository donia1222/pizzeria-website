// Testimonials data type
export interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
  image: string
  position: string
}

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rico Turnell",
    text: "Wow, diese Pizza ist unglaublich, vielen Dank für das Geschmackserlebnis.",
    rating: 5,
    image: "unnamed.png",
    position: "Local Guide",
  },
  {
    id: 2,
    name: "Mauro Musarra",
    text: "5 Sterne sind zu wenig! Gemütlicher Ort, freundliches und kompetentes Personal und köstliche Pizzen! Meine neue Lieblingspizzeria. Muss man probieren ✌️",
    rating: 5,
    image: "unnamed-1.png",
    position: "Zufriedener Kunde",
  },
  {
    id: 3,
    name: "Stefano Calati",
    text: "Absolut die beste Pizza im Tal. Perfekte Pizza im Napoli-Stil und nach italienischen Standards.",
    rating: 5,
    image: "unnamed-2.png",
    position: "Stammkunde",
  },
  {
    id: 4,
    name: "Agam Unterreiner",
    text: "Das Essen war ein absoluter Genuss! Dari, der Besitzer, ist ein ausgezeichneter Sommelier und ein wahrer Meister seines Fachs. Als Vorspeise hatten wir das Tagliere, das ein echter Genuss war.",
    rating: 5,
    image: "unnamed-3.png",
    position: "Feinschmecker",
  },
  {
    id: 5,
    name: "Karin Bless",
    text: "Die Pizza war sensationell, mit frischen Zutaten. Da der Besitzer Sommelier ist, haben wir einen ausgezeichneten Wein getrunken. Der Chef bedient dich persönlich und die Tatsache, dass er gebürtiger Italiener ist, lässt dich fühlen, als wärst du in Italien.",
    rating: 5,
    image: "unnamed-4.png",
    position: "Weinliebhaberin",
  },
  {
    id: 6,
    name: "Ana Busuioc",
    text: "Ausgezeichnetes Preis-Leistungs-Verhältnis. Das Essen ist authentisch und köstlich.",
    rating: 5,
    image: "unnamed-5.png",
    position: "Stammkundin",
  },
]

