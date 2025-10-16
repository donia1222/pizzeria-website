// Menu data types
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

// Menu data
export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: 6,
    name: "Marinara",
    description: "Tomate, Basilikum, Knoblauch, Oregano, Olivenöl",
    price: 10,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop",
    vegan: true,
    category: "pizzas",
  },
  {
    id: 7,
    name: "Margherita",
    description: "Tomate, Mozzarella Fior di Latte, Basilikum",
    price: 14,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop",
    popular: true,
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 8,
    name: "Bufalina",
    description: "Tomate, Büffelmozzarella, Parmesan, Basilikum",
    price: 16,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 15,
    name: "Diavola",
    description: "Tomate, Mozzarella Fior di Latte, scharfe Salami, scharfe Rohwurst, Oliven, Basilikum",
    price: 18,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop",
    spicy: true,
    category: "pizzas",
  },
  {
    id: 19,
    name: "4 Formaggi",
    description: "Mozzarella Fior di Latte, Parmesan, Gorgonzola, Taleggio, Basilikum",
    price: 18,
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 46,
    name: "Quattro Gusti",
    description: "Tomate, Mozzarella Fior di Latte, Artischocken, Oliven, Schinken",
    price: 18,
    image: "https://img.freepik.com/free-photo/delicious-traditional-pizza-arrangement_23-2148921320.jpg?t=st=1745328066~exp=1745331666~hmac=941e2e7fbf60a0c964a479d841385c020618df8522b6c6a48163a0b30ce99d1f&w=740",
    category: "pizzas",
  },
  {
    id: 9,
    name: "L'autentica",
    description: "Tomate, Mozzarella Fior di Latte, Schinken, Champignons",
    price: 18,
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 47,
    name: "Napoletana",
    description: "Tomate, Mozzarella Fior di Latte, Kirschtomaten, Sardellen, Kapern, Oregano, Oliven, Basilico",
    price: 18,
    image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 48,
    name: "Parma Reggio",
    description: "Tomate, Mozzarella Fior di Latte, Rohschinken, Rucola, Parmesan",
    price: 20,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 49,
    name: "Veggie",
    description: "Mozzarella Fior di Latte, Kirschtomaten, Auberginen, Zucchini, Knoblauchöl, Basilikum",
    price: 18,
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 50,
    name: "Tonno e Scalogno",
    description: "Tomate, Mozzarella Fior di Latte, Thunfischfilets, Schalotten, Basilikum",
    price: 18,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 51,
    name: "La Focaccia della Tata",
    description: "Büffelmozzarella, Kirschtomaten, Knoblauchöl, Basilikum",
    price: 20,
    image: "https://images.unsplash.com/photo-1587248720327-8eb72564be1a?q=80&w=200&auto=format&fit=crop",
    vegetarian: true,
    category: "pizzas",
  },
  {
    id: 21,
    name: "Calzone Ripieno",
    description: "Tomate, Mozzarella Fior di Latte, Salami, Schinken",
    price: 20,
    image: "https://images.unsplash.com/photo-1536964549204-cce9eab227bd?q=80&w=200&auto=format&fit=crop",
    category: "pizzas",
  },
  {
    id: 13,
    name: "Burrata e Crudo",
    description: "Tomate, Mozzarella Fior di Latte, Rohschinken, Burrata, Basilikum",
    price: 20,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=200&auto=format&fit=crop",
    popular: true,
    category: "pizzas",
  },
]
