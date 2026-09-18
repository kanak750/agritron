import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create Categories
  const agriculture = await prisma.category.create({
    data: {
      name: 'Agriculture',
      slug: 'agriculture',
      description: 'Automation products designed to make everyday farm operations easier.',
    },
  })

  const electrical = await prisma.category.create({
    data: {
      name: 'Electrical & Automation',
      slug: 'electrical-automation',
      description: 'Reliable control and protection devices for homes and businesses.',
    },
  })

  const vehicle = await prisma.category.create({
    data: {
      name: 'Vehicle Security',
      slug: 'vehicle-security',
      description: 'Advanced tracking and alert systems for your vehicles.',
    },
  })

  const home = await prisma.category.create({
    data: {
      name: 'Home & Utility',
      slug: 'home-utility',
      description: 'Smart solutions for everyday home utility needs.',
    },
  })

  // Create Products
  const products = [
    {
      name: 'Smart GSM Motor Controller',
      slug: 'smart-gsm-motor-controller',
      shortDescription: 'Start or stop your farm motor remotely using your mobile phone.',
      description: 'The Smart GSM Motor Controller allows you to control your agricultural water pump from anywhere using your mobile phone. It works with any GSM SIM card and provides status updates directly via SMS or calls. Perfect for farmers who want to save time and reduce the effort of traveling to the field just to operate the motor.',
      price: 3499,
      compareAtPrice: 4500,
      categoryId: agriculture.id,
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Control motor from anywhere via mobile call/SMS',
        'Works with all mobile networks',
        'Auto mode for automatic operation on power resumption',
        'Protects motor from dry run and overload',
        'Voice guided response in local language'
      ]),
      specifications: JSON.stringify([
        { name: 'Operating Voltage', value: '230V / 415V AC' },
        { name: 'Network', value: '2G/4G GSM' },
        { name: 'Body', value: 'Industrial grade metal enclosure' },
        { name: 'Compatibility', value: 'All types of starters (DOL, Star-Delta)' }
      ]),
      applications: JSON.stringify([
        'Agricultural water pumps',
        'Industrial motors',
        'Remote water supply systems'
      ]),
      featured: true,
      badge: 'Bestseller'
    },
    {
      name: 'Automatic Water Level Controller',
      slug: 'water-level-controller',
      shortDescription: 'Automatically switches your motor ON/OFF based on water level.',
      description: 'Never worry about overflowing tanks or dry running motors again. This automatic water level controller monitors the water level in your overhead tank and underground sump, switching the pump on when the tank is empty and off when it is full.',
      price: 1850,
      compareAtPrice: 2200,
      categoryId: home.id, // Using home category as it fits Home Utility well
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Fully automatic operation',
        'Prevents water wastage from overflow',
        'Saves electricity',
        'Maintenance-free sensors',
        'Dry run protection for motor'
      ]),
      specifications: JSON.stringify([
        { name: 'Voltage', value: '230V AC' },
        { name: 'Sensor Type', value: 'Stainless steel / Carbon' },
        { name: 'Load Capacity', value: 'Up to 2 HP directly' }
      ]),
      applications: JSON.stringify([
        'Home overhead tanks',
        'Apartment water systems',
        'Commercial buildings'
      ]),
      featured: true,
      badge: 'Popular'
    },
    {
      name: 'Auto Switch',
      slug: 'auto-switch',
      shortDescription: 'Automatically starts the motor when 3-phase power is available.',
      description: 'Designed for 3-phase agricultural motors, the Auto Switch ensures your motor starts automatically whenever healthy 3-phase power supply resumes, saving you a trip to the farm.',
      price: 650,
      categoryId: electrical.id,
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Automatic starting on power resumption',
        'Protects against single phasing',
        'Reverse phase protection',
        'Adjustable starting delay'
      ]),
      specifications: JSON.stringify([
        { name: 'Supply', value: '415V, 3-Phase, 50Hz' },
        { name: 'Delay Time', value: '10 to 120 seconds' }
      ]),
      applications: JSON.stringify([
        'Agricultural 3-phase starters',
        'Industrial machinery'
      ]),
      featured: false
    },
    {
      name: 'Jhatka Machine',
      slug: 'jhatka-machine',
      shortDescription: 'Solar powered electric fence controller to protect your crops.',
      description: 'Protect your valuable crops from wild animals. The Jhatka machine provides a safe but highly effective electric shock to deter animals without causing them lasting harm.',
      price: 4200,
      compareAtPrice: 5000,
      categoryId: agriculture.id,
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Solar compatible',
        'Adjustable pulse strength',
        'Day/Night auto sensor',
        'Heavy-duty capacitor for long fences',
        'Inbuilt battery charger'
      ]),
      specifications: JSON.stringify([
        { name: 'Input', value: '12V DC (Battery/Solar)' },
        { name: 'Output Voltage', value: 'Upto 10KV pulse' },
        { name: 'Coverage', value: 'Up to 50 Acres depending on model' }
      ]),
      applications: JSON.stringify([
        'Crop protection from wild animals',
        'Farm perimeter fencing',
        'Livestock management'
      ]),
      featured: true
    },
    {
      name: 'Vehicle Surveillance & Alert System',
      slug: 'vehicle-surveillance-alert',
      shortDescription: 'Track and secure your vehicle with real-time GPS alerts.',
      description: 'Keep your vehicle safe from theft with our advanced surveillance system. Track location in real-time, get instant alerts on your phone if the vehicle is moved, and remotely disable the engine if necessary.',
      price: 2999,
      categoryId: vehicle.id,
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Real-time GPS tracking on map',
        'Engine immobilization via app/SMS',
        'Anti-theft vibration alarm',
        'Geo-fencing alerts',
        'Battery tampering alert'
      ]),
      specifications: JSON.stringify([
        { name: 'Network', value: 'GSM/GPRS/GPS' },
        { name: 'Operating Voltage', value: '9V - 90V DC' },
        { name: 'Backup Battery', value: 'Inbuilt 150mAh' }
      ]),
      applications: JSON.stringify([
        'Personal cars and bikes',
        'Commercial fleet tracking',
        'Tractors and farm vehicles'
      ]),
      featured: true,
      badge: 'New'
    },
    {
      name: 'AC Power Saver',
      slug: 'ac-power-saver',
      shortDescription: 'Reduce your electricity bills by optimizing power usage.',
      description: 'The AC Power Saver stabilizes the voltage and improves the power factor of your electrical line, resulting in reduced power consumption and lower electricity bills for inductive loads like ACs and motors.',
      price: 1200,
      categoryId: electrical.id,
      images: JSON.stringify(['/placeholder-product.webp']),
      features: JSON.stringify([
        'Improves power factor',
        'Stabilizes voltage fluctuations',
        'Extends appliance lifespan',
        'Plug and play installation'
      ]),
      specifications: JSON.stringify([
        { name: 'Voltage Capacity', value: '90V - 250V AC' },
        { name: 'Load Capacity', value: 'Up to 30KW' }
      ]),
      applications: JSON.stringify([
        'Homes with multiple ACs',
        'Small shops and offices',
        'Workshops'
      ]),
      featured: false
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
