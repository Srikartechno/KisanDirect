// Logistics lifecycle stages & Multi-farmer aggregated route data

export const LOGISTICS_STAGES = [
  {
    step: 1,
    title: 'ORDER CONFIRMED',
    description: 'Direct smart contract locked; consumer & bulk buyer requirements verified.',
    time: '09:15 AM',
    status: 'completed',
    icon: 'CheckCircle2'
  },
  {
    step: 2,
    title: 'Pickup scheduling',
    description: 'Automated notification sent to FPOs & farmer gates for morning crate staging.',
    time: '09:40 AM',
    status: 'completed',
    icon: 'CalendarClock'
  },
  {
    step: 3,
    title: 'AI route optimization',
    description: 'Dynamic algorithm calculates minimum travel time, clustering Farmers A, B, and C into a single EV run.',
    time: '10:05 AM',
    status: 'active',
    icon: 'Cpu'
  },
  {
    step: 4,
    title: 'Farmer pickup',
    description: 'Electric cold-chain van arrives at farm-gates; IoT weight scales verify produce grade.',
    time: '11:30 AM (Est)',
    status: 'upcoming',
    icon: 'PackageCheck'
  },
  {
    step: 5,
    title: 'Delivery in transit',
    description: 'Monitored temperature (4.2°C) direct express routing bypassing APMC Mandi congestion.',
    time: '02:45 PM (Est)',
    status: 'upcoming',
    icon: 'Truck'
  },
  {
    step: 6,
    title: 'Consumer / Buyer Handover',
    description: 'Contactless doorstep / warehouse dropoff with instant digital escrow payout to farmer.',
    time: '04:30 PM (Est)',
    status: 'upcoming',
    icon: 'ShoppingBag'
  }
];

export const ROUTE_NODES = {
  farmers: [
    {
      id: 'farmer-a',
      code: 'Farmer A',
      name: 'Ramesh Patil',
      crop: '🍅 450 kg Tomatoes',
      village: 'Dindori North',
      x: 18,
      y: 24,
      pickupTime: '10:45 AM',
      qualityPassed: true
    },
    {
      id: 'farmer-b',
      code: 'Farmer B',
      name: 'Sunita Devi',
      crop: '🥬 320 kg Spinach',
      village: 'Ojhar East',
      x: 22,
      y: 52,
      pickupTime: '11:15 AM',
      qualityPassed: true
    },
    {
      id: 'farmer-c',
      code: 'Farmer C',
      name: 'Baldev Patel',
      crop: '🥕 580 kg Carrots',
      village: 'Sinnar Road',
      x: 19,
      y: 80,
      pickupTime: '11:55 AM',
      qualityPassed: true
    }
  ],
  hub: {
    name: 'KisanDirect Micro-Cold Hub',
    code: 'FPO Consolidation Hub',
    x: 52,
    y: 52,
    processTime: '12:30 PM'
  },
  destinations: [
    {
      name: 'Urban Consumer Cluster (58 Homes)',
      code: 'Buyer Zone 1',
      x: 84,
      y: 35,
      deliveryTime: '03:15 PM'
    },
    {
      name: 'FarmFresh Restaurant Consortium',
      code: 'Bulk Buyer 2',
      x: 85,
      y: 70,
      deliveryTime: '04:00 PM'
    }
  ],
  telemetry: {
    totalCargoKg: '1,350 kg',
    truckId: 'EV-AGRI-094',
    batteryPct: '88%',
    cabinTemp: '4.2°C (Optimal)',
    co2SavedKg: '34.2 kg',
    fuelExpenseCut: '-38%',
    distanceKmSaved: '42 km'
  }
};
