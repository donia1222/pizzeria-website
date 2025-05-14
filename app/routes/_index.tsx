import PizzeriaWebsite from "../components/pizzeria-website"
import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Bouquet Mediterraneo" },
    { name: "description", content: "Cucina Mediterranea & Pizza" },
    { name: "theme-color", content: "#000000" },
    { name: "keywords", content: "pizzeria, sevelen" },
    { property: "og:title", content: "Bouquet Mediterraneo" },
    { property: "og:description", content: "Cucina Mediterranea & Pizza" },
    
  ]
}

export default function Home() {
  return <PizzeriaWebsite />

  
}
