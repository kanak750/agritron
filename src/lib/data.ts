export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: { products: number };
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  category: Category;
  images: string;
  features: string;
  specifications: string;
  applications: string;
  stockStatus: string;
  featured: boolean;
  badge: string | null;
  relatedProducts: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Smart Controllers',
    slug: 'smart-controllers',
    description: 'Automated irrigation and farm controllers',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { products: 3 }
  },
  {
    id: 'cat-2',
    name: 'Sensors',
    slug: 'sensors',
    description: 'Soil and weather monitoring sensors',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { products: 2 }
  },
  {
    id: 'cat-3',
    name: 'Valves & Fittings',
    slug: 'valves',
    description: 'High quality agricultural valves',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { products: 1 }
  }
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Agritron Smart Irrigation Controller Pro',
    slug: 'agritron-smart-controller-pro',
    shortDescription: 'Advanced GSM-based automated irrigation controller for remote motor operation.',
    description: 'The Agritron Smart Controller Pro allows you to operate your farm motors from anywhere in the world using a mobile app or SMS. Built for tough rural environments with voltage fluctuation protection.',
    price: 4500,
    compareAtPrice: 5500,
    categoryId: 'cat-1',
    category: categories[0],
    images: JSON.stringify(['https://picsum.photos/seed/prod-1/500/500']),
    features: JSON.stringify(['Remote operation via SMS/App', 'Voltage fluctuation protection', 'Auto-restart on power resume', 'Dry run protection']),
    specifications: JSON.stringify([{name: 'Connectivity', value: '2G/4G GSM'}, {name: 'Voltage Range', value: '140V - 440V'}, {name: 'Warranty', value: '1 Year'}]),
    applications: JSON.stringify(['Agriculture', 'Horticulture', 'Greenhouses']),
    stockStatus: 'IN_STOCK',
    featured: true,
    badge: 'Best Seller',
    relatedProducts: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-2',
    name: 'Wireless Soil Moisture Sensor',
    slug: 'wireless-soil-moisture-sensor',
    shortDescription: 'Accurately monitor soil moisture levels to optimize watering schedules.',
    description: 'Prevent overwatering and save water with our highly accurate wireless soil moisture sensor. Connects seamlessly with Agritron controllers.',
    price: 1200,
    compareAtPrice: 1500,
    categoryId: 'cat-2',
    category: categories[1],
    images: JSON.stringify(['https://picsum.photos/seed/prod-2/500/500']),
    features: JSON.stringify(['Wireless range up to 1km', 'Battery life of 2 years', 'Real-time moisture updates']),
    specifications: JSON.stringify([{name: 'Range', value: '1km LoRa'}, {name: 'Battery', value: 'Li-Ion 5000mAh'}]),
    applications: JSON.stringify(['Farms', 'Orchards']),
    stockStatus: 'IN_STOCK',
    featured: true,
    badge: 'New',
    relatedProducts: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-3',
    name: 'Heavy Duty Solenoid Valve 2"',
    slug: 'heavy-duty-solenoid-valve-2',
    shortDescription: 'Industrial grade 2-inch solenoid valve for automated water flow control.',
    description: 'Built to withstand high pressure agricultural applications. Designed to integrate directly with our smart controllers for fully automated irrigation systems.',
    price: 2800,
    compareAtPrice: null,
    categoryId: 'cat-3',
    category: categories[2],
    images: JSON.stringify(['https://picsum.photos/seed/prod-3/500/500']),
    features: JSON.stringify(['High pressure tolerance', 'Corrosion resistant', 'Quick response time']),
    specifications: JSON.stringify([{name: 'Size', value: '2 Inch'}, {name: 'Operating Pressure', value: '1-10 Bar'}]),
    applications: JSON.stringify(['Drip Irrigation', 'Sprinkler Systems']),
    stockStatus: 'IN_STOCK',
    featured: false,
    badge: null,
    relatedProducts: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-4',
    name: 'Agritron Basic GSM Starter',
    slug: 'agritron-basic-gsm-starter',
    shortDescription: 'Affordable and reliable remote starter for small farm motors.',
    description: 'An entry-level remote starter that lets you turn your pump on and off with a missed call. Simple, effective, and robust.',
    price: 2500,
    compareAtPrice: 3000,
    categoryId: 'cat-1',
    category: categories[0],
    images: JSON.stringify(['https://picsum.photos/seed/prod-4/500/500']),
    features: JSON.stringify(['Missed call operation', 'Status alerts via SMS', 'Weatherproof casing']),
    specifications: JSON.stringify([{name: 'Connectivity', value: '2G GSM'}, {name: 'Phase', value: 'Single & Three Phase'}]),
    applications: JSON.stringify(['Small Farms']),
    stockStatus: 'IN_STOCK',
    featured: true,
    badge: 'Value',
    relatedProducts: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
