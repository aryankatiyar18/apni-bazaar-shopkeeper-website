export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Flagship Phones' | '5G Smartphones' | 'Tablets & Audio' | 'Wearables';
  price: number;
  originalPrice: number;
  image: string;
  fallbackImage: string;
  condition: string; // e.g. "Certified Mint 9.8/10", "Grade A+ Refurbished"
  storage?: string;
  color?: string;
  specs: string[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  stockBadge?: string;
}

export const SHOP_DETAILS = {
  name: 'Apni Bazaar',
  tagline: 'Out with the old, in with the gold. Get the best resale value for your smartphone',
  subTagline: '#1 India Trusted Certified Pre-Owned & Open-Box Tech Superstore',
  ownerEmail: 'priyanshu218425@gmail.com',
  whatsappNumber: '917275398643', // Indian format with country code for wa.me
  rawPhone: '7275398643',
  heroImageUrl: 'https://i.ibb.co/9F1vHr5/hero-image.jpg',
  heroFallbackUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80',
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Apple iPhone 15 Pro Max (256GB)',
    brand: 'Apple',
    category: 'Flagship Phones',
    price: 94999,
    originalPrice: 134900,
    image: 'https://i.ibb.co/Q7Gq6dQt/P1.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    condition: 'Certified Pristine A+ (100% Battery Health)',
    storage: '256GB',
    color: 'Natural Titanium',
    specs: ['A17 Pro Chip', '48MP Pro Camera System', '5X Optical Zoom', 'Titanium Body'],
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    stockBadge: 'Hot Resale Deal',
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24 Ultra 5G AI',
    brand: 'Samsung',
    category: 'Flagship Phones',
    price: 88999,
    originalPrice: 129999,
    image: 'https://i.ibb.co/1f5bYkz7/P2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    condition: 'Super Mint 9.9/10 (Open Box)',
    storage: '512GB',
    color: 'Titanium Black',
    specs: ['Snapdragon 8 Gen 3', '200MP Quad Camera', 'Built-in S-Pen', 'Galaxy AI Suite'],
    rating: 4.9,
    reviewsCount: 98,
    isFeatured: true,
    stockBadge: 'Limited Stock',
  },
  {
    id: 'p3',
    name: 'OnePlus 12 5G Flagship Killer',
    brand: 'OnePlus',
    category: '5G Smartphones',
    price: 49499,
    originalPrice: 69999,
    image: 'https://i.ibb.co/vCgnw35d/P3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    condition: 'Grade A+ Certified Refurbished',
    storage: '16GB RAM + 512GB',
    color: 'Flowy Emerald',
    specs: ['4rd Gen Hasselblad Camera', '100W SuperVOOC Fast Charge', '2K 120Hz ProXDR Display'],
    rating: 4.8,
    reviewsCount: 76,
    isFeatured: true,
    stockBadge: 'Best Value',
  },
  {
    id: 'p4',
    name: 'Apple iPhone 14 Pro (128GB)',
    brand: 'Apple',
    category: 'Flagship Phones',
    price: 68999,
    originalPrice: 109900,
    image: 'https://i.ibb.co/Q7q0yJw2/P4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80',
    condition: 'Certified Good 9.2/10 (Scrathless Screen)',
    storage: '128GB',
    color: 'Deep Purple',
    specs: ['Dynamic Island Display', '48MP Main Sensor', 'Always-On Retina Super XDR'],
    rating: 4.8,
    reviewsCount: 115,
    isFeatured: true,
  },
  {
    id: 'p5',
    name: 'Google Pixel 8 Pro Pro-AI Camera',
    brand: 'Google',
    category: '5G Smartphones',
    price: 54999,
    originalPrice: 84999,
    image: 'https://i.ibb.co/3Yv5HK9v/P6.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    condition: 'Pristine Open Box (With Box & Cable)',
    storage: '256GB',
    color: 'Obsidian Black',
    specs: ['Google Tensor G3', 'Magic Eraser & Best Take', 'Super Actua 2400 nits Screen'],
    rating: 4.7,
    reviewsCount: 64,
    stockBadge: 'Photography King',
  },
  {
    id: 'p6',
    name: 'Sony WH-1000XM5 ANC Headphones',
    brand: 'Sony',
    category: 'Tablets & Audio',
    price: 18999,
    originalPrice: 29990,
    image: 'https://i.ibb.co/rfQNp0JV/P5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    condition: 'Like New 9.8/10 (Cleaned & Sanitized)',
    color: 'Platinum Silver / Black',
    specs: ['Industry-Leading Noise Canceling', '30hr Battery Life', 'Ultra-Comfort Lightweight'],
    rating: 4.9,
    reviewsCount: 88,
    stockBadge: 'Audio Deal',
  },
  {
    id: 'p7',
    name: 'Apple iPad Air 5th Gen (M1 Chip)',
    brand: 'Apple',
    category: 'Tablets & Audio',
    price: 39999,
    originalPrice: 59900,
    image: 'https://i.ibb.co/699bVTk/P7.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    condition: 'Grade A Certified (92% Battery)',
    storage: '256GB Wi-Fi',
    color: 'Space Gray',
    specs: ['Desktop-class Apple M1 Chip', '10.9-inch Liquid Retina', 'Supports Apple Pencil 2nd Gen'],
    rating: 4.8,
    reviewsCount: 52,
  },
  {
    id: 'p8',
    name: 'Apple Watch Ultra 2 (Titanium 49mm)',
    brand: 'Apple',
    category: 'Wearables',
    price: 58999,
    originalPrice: 89900,
    image: 'https://i.ibb.co/zTwcGXxw/P8.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    condition: 'Pristine Condition 9.9/10',
    color: 'Aerospace-Grade Titanium',
    specs: ['Precision Dual-Frequency GPS', '3000 Nits Brightest Display', '100m Water Resistant & Siren'],
    rating: 4.9,
    reviewsCount: 67,
    stockBadge: 'Adventurer Choice',
  },
];

export const ESTIMATOR_MODELS = [
  { brand: 'Apple', name: 'iPhone 15 Pro Max', baseValue: 75000 },
  { brand: 'Apple', name: 'iPhone 15 / 15 Plus', baseValue: 48000 },
  { brand: 'Apple', name: 'iPhone 14 Pro / Pro Max', baseValue: 56000 },
  { brand: 'Apple', name: 'iPhone 13 / 13 Pro', baseValue: 34000 },
  { brand: 'Samsung', name: 'Galaxy S24 Ultra', baseValue: 68000 },
  { brand: 'Samsung', name: 'Galaxy S23 Ultra', baseValue: 52000 },
  { brand: 'OnePlus', name: 'OnePlus 12 / 11 5G', baseValue: 32000 },
  { brand: 'Google', name: 'Pixel 8 Pro / Pixel 8', baseValue: 38000 },
];
