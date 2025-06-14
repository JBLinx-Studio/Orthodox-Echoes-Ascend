
// Central product data array for shop. Edit via dev manager.
export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  priceUSD: string;
  priceZAR: string;
  originalPriceUSD: string;
  originalPriceZAR: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity: number | null;
  location: string | null;
  type: 'physical' | 'digital' | 'course';
  features: string[];
  category: string;
  contact?: string;
}

export const shopProducts: ShopProduct[] = [
  {
    id: 'beeside-collection',
    name: 'BeeSide Honey & Beeswax',
    description:
      'Pure 100% delicious wild honey and beeswax. Honey sold as R100 (500g) and R200 (bigger bottle); beeswax also available. All stock currently out—beeswax candles coming soon!',
    priceUSD: '$5.40',
    priceZAR: 'R100 (500g), R200 (large)',
    originalPriceUSD: '$10.80',
    originalPriceZAR: 'R200',
    image: '/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png',
    rating: 4.9,
    reviews: 127,
    inStock: false,
    quantity: 0,
    location: 'Despatch, South Africa 6219',
    type: 'physical',
    features: [
      '100% Pure Wild Honey',
      'Natural Beeswax',
      'Beeswax candles coming soon!',
      'Contact: EthosofOrthodoxy@gmail.com',
    ],
    category: 'BeeSide Collection',
    contact: 'EthosofOrthodoxy@gmail.com'
  },
  {
    id: 'prayer-ebook',
    name: 'Digital Prayer Compendium',
    description:
      'Complete collection of Orthodox prayers and daily devotions in digital format.',
    priceUSD: '$2.99',
    priceZAR: 'R39.99',
    originalPriceUSD: '$4.99',
    originalPriceZAR: 'R89.99',
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    quantity: null,
    location: null,
    type: 'digital',
    features: ['Instant Download', 'PDF Format', '500+ Prayers', 'Mobile Friendly'],
    category: 'Digital Resources'
  },
  {
    id: 'theology-course',
    name: 'Orthodox Theology Online Course',
    description:
      'Comprehensive 12-week course on Orthodox Christian theology and doctrine.',
    priceUSD: '$8.99',
    priceZAR: 'R169.99',
    originalPriceUSD: '$29.99',
    originalPriceZAR: 'R399.99',
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    quantity: null,
    location: null,
    type: 'course',
    features: ['12 Weeks', 'Video Lectures', 'Certificate', 'Expert Instructors'],
    category: 'Educational'
  }
];
