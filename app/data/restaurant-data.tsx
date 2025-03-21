import type { MenuItem } from "~/types/restaurant";

// Food menu items
export const menuItems: { category: string; items: MenuItem[] }[] = [
  {
    category: "Vorspeisen",
    items: [
      {
        id: 1,
        name: "Bruschetta",
        description: "Geröstetes Brot mit Knoblauch, Olivenöl, Salz, Tomaten und Basilikum",
        price: 8.95,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegan: true,
      },
      {
        id: 2,
        name: "Arancini",
        description: "Gefüllte Reisbällchen mit Paniermehl und frittiert",
        price: 10.95,
        image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 3,
        name: "Caprese Salat",
        description: "Frischer Mozzarella, Tomaten und Basilikum mit Salz und Olivenöl gewürzt",
        price: 12.95,
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
    ],
  },
  {
    category: "Hauptgerichte",
    items: [
      {
        id: 4,
        name: "Pizza Margherita",
        description: "Klassische Pizza mit Tomatensauce, Mozzarella und Basilikum",
        price: 14.95,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegetarian: true,
      },
      {
        id: 5,
        name: "Spaghetti Carbonara",
        description: "Spaghetti mit einer cremigen Sauce aus Eiern, Käse, Pancetta und schwarzem Pfeffer",
        price: 16.95,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 6,
        name: "Risotto ai Funghi",
        description: "Cremiges Risotto mit Waldpilzen und Parmesan",
        price: 18.95,
        image: "https://images.unsplash.com/photo-1633964913849-96bb09add3f5?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 7,
        name: "Osso Buco",
        description: "Kalbshaxe geschmort mit Gemüse, Weißwein und Brühe",
        price: 24.95,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        id: 8,
        name: "Tiramisu",
        description: "Kaffeegetränktes italienisches Dessert aus Löffelbiskuits und Mascarpone-Creme",
        price: 8.95,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegetarian: true,
      },
      {
        id: 9,
        name: "Panna Cotta",
        description: "Italienisches Dessert aus gesüßter Sahne mit Gelatine",
        price: 7.95,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 10,
        name: "Cannoli",
        description: "Röhrenförmige Schalen aus frittiertem Teig gefüllt mit süßer, cremiger Füllung",
        price: 6.95,
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
    ],
  },
  {
    category: "Getränke",
    items: [
      {
        id: 11,
        name: "Italienische Weinauswahl",
        description: "Auswahl an feinen italienischen Weinen - rot, weiß und prickelnd",
        price: 9.95,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=200&auto=format&fit=crop",
        byGlass: true,
      },
      {
        id: 12,
        name: "Aperol Spritz",
        description: "Prosecco, Aperol und Sodawasser",
        price: 8.95,
        image: "https://images.unsplash.com/photo-1527761939622-933c972ea2fb?q=80&w=200&auto=format&fit=crop",
        popular: true,
      },
      {
        id: 13,
        name: "Espresso",
        description: "Starker italienischer Kaffee",
        price: 3.95,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop",
        vegan: true,
      },
    ],
  },
  {
    category: "Pizzas",
    items: [
      {
        id: 14,
        name: "Pizza Margherita",
        description: "Klassische Pizza mit Tomatensauce, Mozzarella und Basilikum",
        price: 14.95,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop",
        popular: true,
        vegetarian: true,
      },
      {
        id: 15,
        name: "Pizza Pepperoni",
        description: "Pizza mit Tomatensauce, Mozzarella und würziger Pepperoni",
        price: 16.95,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop",
        popular: true,
      },
      {
        id: 16,
        name: "Pizza Quattro Formaggi",
        description: "Pizza mit vier verschiedenen Käsesorten: Mozzarella, Gorgonzola, Parmesan und Ricotta",
        price: 18.95,
        image: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
      },
      {
        id: 17,
        name: "Pizza Prosciutto e Funghi",
        description: "Pizza mit Tomatensauce, Mozzarella, Schinken und Pilzen",
        price: 17.95,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 18,
        name: "Pizza Vegetariana",
        description: "Pizza mit Tomatensauce, Mozzarella und frischem Gemüse der Saison",
        price: 16.95,
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=200&auto=format&fit=crop",
        vegetarian: true,
        vegan: true,
      },
      {
        id: 19,
        name: "Pizza Diavola",
        description: "Scharfe Pizza mit Tomatensauce, Mozzarella, scharfer Salami und Chilischoten",
        price: 17.95,
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
];

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    text: "Das beste italienische Essen außerhalb Italiens! Die Atmosphäre ist authentisch und der Service tadellos.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sophie Laurent",
    text: "Ihre hausgemachte Pasta ist zum Sterben. Ich komme seit Jahren hierher und die Qualität enttäuscht nie.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "James Wilson",
    text: "Das Reservierungssystem ist so bequem und ihr Takeaway-Service ist prompt. Tolles Essen, toller Service!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
];

// Gallery images
export const galleryImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=300&auto=format&fit=crop",
  "https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-black-board-background-lunch-dish_1150-42995.jpg?t=st=1742167767~exp=1742171367~hmac=0e3c8579cf6fccd007ec40d0ced99ba4c64f8d70c569f0f194cc341923402eee&w=996",
];
