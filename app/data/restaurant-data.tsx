// Interfaces
export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  popular?: boolean
  vegan?: boolean
  vegetarian?: boolean
  spicy?: boolean
  category: string
  subcategory?: string

}

export interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
  image: string
  position?: string
}

// Menu data
export const menuItems: MenuItem[] = [
  // Antipasti e Primi
  {
    id: 1,
    name: "Tagliere di salumi e formaggi all'italiana",
    description: "Selezione di salumi e formaggi italiani serviti con pane",
    price: 26.5,
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "starters",
  },
  {
    id: 2,
    name: "Lasagna",
    description: "Lasagna tradizionale italiana con ragù e besciamella",
    price: 24.5,
    image: "/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg",
    category: "starters",
  },
  {
    id: 3,
    name: "Parmigiana di Melanzane",
    description: "Melanzane al forno con pomodoro, mozzarella e parmigiano",
    price: 22,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "starters",
  },

  // Insalate
  {
    id: 4,
    name: "Insalata Verde",
    description: "Insalata mista di verdure verdi fresche",
    price: 11,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    vegan: true,
    category: "starters",
  },
  {
    id: 5,
    name: "Insalata Mista",
    description: "Insalata mista con pomodori, cetrioli, olive e cipolla",
    price: 14,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    vegan: true,
    category: "starters",
  },

  // Pizze
  {
    id: 6,
    name: "Marinara",
    description: "Pomodoro, aglio, origano, basilico, olio evo",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop",
    vegan: true,
    category: "pizzas",
  },
  {
    id: 7,
    name: "Margherita",
    description: "Pomodoro, mozzarella, basilico, olio evo",
    price: 19,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 8,
    name: "Bufalina",
    description: "Pomodoro, mozzarella di bufala, parmigiano, basilico, olio evo",
    price: 20,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 9,
    name: "L'autentica",
    description: "Pomodoro, mozzarella, prosciutto cotto, funghi, basilico, olio evo",
    price: 22.5,
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 10,
    name: "Tonno e Cipolla",
    description: "Pomodoro, filetti di tonno sott'olio, cipolla, basilico, olio evo",
    price: 27,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 11,
    name: "Salsiccia e Friarielli",
    description: "Fiordilatte, salsiccia, friarielli, basilico, olio evo",
    price: 28,
    image: "https://images.unsplash.com/photo-1593560708920-61b98ae52d42?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 12,
    name: "4 Sapori",
    description: "Pomodoro, mozzarella, carciofi, prosciutto cotto, funghi, olive, basilico, olio evo",
    price: 23.9,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 13,
    name: "Burrata e Crudo",
    description: "Pomodoro, mozzarella, prosciutto crudo, burrata, basilico, olio evo",
    price: 27,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "pizzas",
  },
  {
    id: 14,
    name: "Crudo, Rucola e Grana",
    description: "Pomodoro, mozzarella, prosciutto crudo, rucola, grana, olio evo",
    price: 27,
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 15,
    name: "Diavola",
    description: "Pomodoro, mozzarella, salame piccante, basilico, olio evo",
    price: 22.5,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop",
    spicy: true,
    category: "pizzas",
  },
  {
    id: 16,
    name: "Provola e Pepe",
    description: "Pomodoro, provola, pepe, basilico, olio evo",
    price: 23.5,
    image: "https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 17,
    name: "Napoli",
    description: "Pomodoro, mozzarella, alici, capperi, olive, origano, basilico, olio evo",
    price: 23.5,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 18,
    name: "Vegetariana",
    description: "Mozzarella, melanzane, zucchine, datterini, olio evo",
    price: 22,
    image: "/mix-pizza-with-tomato-slices-mushroom-olive_140725-185-1.jpg",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 19,
    name: "4 Formaggi",
    description: "Fiordilatte, provola affumicata, gorgonzola, parmigiano, olio evo",
    price: 22,
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 20,
    name: "Mortadella e Pistacchio",
    description: "Mozzarella, mortadella al pistacchio, pistacchio, basilico, olio evo",
    price: 28.5,
    image: "https://images.unsplash.com/photo-1617343267017-e344bdc7ec94?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "pizzas",
  },
  {
    id: 21,
    name: "Calzone Ripieno",
    description: "Pomodoro, fiordilatte, provola affumicata, prosciutto cotto, salame",
    price: 28,
    image: "https://images.unsplash.com/photo-1536964549204-cce9eab227bd?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  // Dolci (Desserts)
  {
    id: 22,
    name: "Tiramisù della casa",
    description: "Klassisches hausgemachtes Tiramisu mit Mascarpone und Espresso",
    price: 11,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 23,
    name: "Pizza alla Nutella",
    description: "Süße Pizza mit Nutella, serviert mit Puderzucker",
    price: 16,
    image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "desserts",
  },
  {
    id: 24,
    name: "Mini Cannoli Siciliani",
    description: "Traditionelle sizilianische Cannoli gefüllt mit süßer Ricotta-Creme",
    price: 14,
    image: "https://images.unsplash.com/photo-1623246123320-0d6636755796?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "desserts",
  },

  // Aperitivi & birre
  {
    id: 25,
    name: "Birra Moretti 0,33cl",
    description: "Klassisches italienisches Lagerbier",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 26,
    name: "Birra Moretti Zero 0.0% 0,33cl",
    description: "Alkoholfreies italienisches Lagerbier",
    price: 5.7,
    image: "https://images.unsplash.com/photo-1613208602577-50fd21015f58?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 27,
    name: "Aperol Spritz",
    description: "Erfrischender Aperitif mit Aperol, Prosecco und Soda",
    price: 14,
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf16?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "drinks",
  },
  {
    id: 28,
    name: "Campari Spritz",
    description: "Klassischer Aperitif mit Campari, Prosecco und Soda",
    price: 14,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 29,
    name: "Limoncello Spritz",
    description: "Erfrischender Aperitif mit Limoncello, Prosecco und Soda",
    price: 14,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 30,
    name: "San Bitter Spritz - Alkoholfrei",
    description: "Alkoholfreier Aperitif mit San Bitter und Soda",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 31,
    name: "Crodino Spritz - Alkoholfrei",
    description: "Alkoholfreier Aperitif mit Crodino und Soda",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },

  // Cocktail & Aperitivi
  {
    id: 32,
    name: "Portofino Gin Tonic",
    description: "Premium Gin mit Tonic Water und mediterranen Kräutern",
    price: 18.5,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 33,
    name: "Negroni",
    description: "Klassischer italienischer Cocktail mit Gin, Campari und Vermouth",
    price: 16.5,
    image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 34,
    name: "Negroni Sbagliato",
    description: "Variation des klassischen Negroni mit Prosecco statt Gin",
    price: 16,
    image: "https://images.unsplash.com/photo-1527761939622-933c1e30526a?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: 35,
    name: "Americano",
    description: "Erfrischender Cocktail mit Campari, Vermouth und Soda",
    price: 15,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=200&auto=format&fit=crop",
    category: "drinks",
  },
]

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marco Rossi",
    text: "Die beste Pizza außerhalb Italiens! Der knusprige Teig und die frischen Zutaten erinnern mich an meine Heimat.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    position: "Italienischer Chef",
  },
  {
    id: 2,
    name: "Laura Schmidt",
    text: "Die gemütliche Atmosphäre und der freundliche Service machen jeden Besuch zu einem besonderen Erlebnis. Die Pizza Diavola ist unglaublich!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    position: "Food Bloggerin",
  },
  {
    id: 3,
    name: "Thomas Meyer",
    text: "Wir bestellen jede Woche zum Filmabend und die Pizza kommt immer heiß und perfekt an. Ein absolutes Muss für Pizzaliebhaber!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    position: "Stammkunde",
  },
]

// Gallery images
export const galleryImages: string[] = [
  "/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg",
  "/table-arrangement-luxury-restaurant_23-2150598334.jpg",
  "video",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=300&auto=format&fit=crop",
]

// Hero images for carousel
export const heroImages: string[] = [
  "/pasta-with-tomato-sauce-served-pan_1220-7546.jpg",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop",
]
