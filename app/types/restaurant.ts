export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    popular?: boolean;
    vegan?: boolean;
    vegetarian?: boolean;
    byGlass?: boolean;
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
  }
  