export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuItemCategory;
  subcategory: string;
  description: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  isGlutenFree?: boolean;
  image?: string;
  addons?: { name: string; price: number }[];
}

export type MenuItemCategory =
  | 'Breakfast'
  | 'Omelets'
  | 'Southern Style Biscuits'
  | 'Pancakes'
  | 'Breakfast Sandwiches'
  | 'Hashbrowns'
  | 'Lunch & Dinner'
  | 'Fish & Shrimp'
  | 'Burgers & Sandwiches'
  | 'Sides'
  | 'Premium Sides'
  | 'A La Carte'
  | 'Fried Pies'
  | 'Beverages';

export interface SpecialItem {
  id: string;
  day: string;
  name: string;
  description: string;
  price: number;
  time: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
  totalPrice: number;
}

export interface Reservation {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
}
