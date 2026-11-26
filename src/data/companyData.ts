// PRISHA XPRESS PVT. LTD. - ACCURATE OFFICIAL COMPANY MASTER DATA
// SOURCE: https://www.prishaxpress.com/ (ENHANCED FOR CLARITY AND ACCURACY)

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  positioning: string;
  subtitle: string;
  cin: string;
  founded: string;
  headquarters: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  businessHours: string;
  experienceClaim: string;
  experienceStatus: 'published_needs_confirmation' | 'confirmed';
}

export interface CompanyStatItem {
  id: string;
  label: string;
  value: string;
  description: string;
  status: 'needs_confirmation' | 'confirmed';
  notes: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  verificationStatus: 'published_on_old_website_pending_formal_consent' | 'confirmed';
  source: string;
}

export interface CsrInitiativeItem {
  id: string;
  themeNumber: number;
  title: string;
  category: string;
  summary: string;
  description: string;
  keyActivities: string[];
  operationalStatus: 'Active Ground Initiative' | 'Ongoing Driver Welfare Program' | 'Future Expansion Commitment';
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
  image: string;
  tag?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  keyPoints: string[];
}

// 1. Official Verified Company Information
export const companyInfo: CompanyInfo = {
  name: 'PRISHA XPRESS PVT. LTD.',
  shortName: 'PXPL',
  tagline: 'Empowering Your Fleet, Elevating Your Efficiency',
  positioning: 'Empowering Your Fleet, Elevating Your Efficiency',
  subtitle:
    'Comprehensive transportation, professional truck driver hiring, 3PL fleet operations, service stations, and automotive spare parts.',
  cin: 'U49231PN2023PTC225810',
  founded: 'November 22, 2023',
  headquarters: 'Pune, Maharashtra, India',
  address: 'Kharadi, Pune – 411014, Maharashtra, India',
  city: 'Pune',
  state: 'Maharashtra',
  pinCode: '411014',
  phone: '+91 7276897727',
  email: 'info@prishaxpress.com',
  whatsapp: '+91 7276897727',
  website: 'https://www.prishaxpress.com/',
  businessHours: 'Monday – Saturday: 9:30 AM – 6:00 PM IST',
  experienceClaim: '15+ Years of Cumulative Fleet Leadership',
  experienceStatus: 'published_needs_confirmation',
};

// 2. Published Company Statistics with Confirmation Status
export const companyStatistics: CompanyStatItem[] = [
  {
    id: 'stat-drivers',
    label: 'Drivers Network',
    value: '753',
    description: 'Commercial heavy vehicle driver roster across regional transport hubs',
    status: 'needs_confirmation',
    notes: 'Published on old website homepage. Another page mentions 1,000+. Needs formal company verification.',
  },
  {
    id: 'stat-fleet',
    label: 'Fleet Optimization',
    value: '79+',
    description: 'Commercial logistics vehicles managed under operational fleet support',
    status: 'needs_confirmation',
    notes: 'Published figure from prishaxpress.com. Subject to annual operational audit.',
  },
  {
    id: 'stat-staff',
    label: 'Dedicated Staff',
    value: '187',
    description: 'Corporate headquarters, dispatch coordinators, and station mechanics',
    status: 'needs_confirmation',
    notes: 'Published on old website. Exact current payroll count subject to HR confirmation.',
  },
  {
    id: 'stat-km',
    label: 'Km Tracked',
    value: '70,80,300',
    description: 'Cumulative commercial freight transit kilometers monitored',
    status: 'needs_confirmation',
    notes: 'Published telemetry mileage milestone from old website. Subject to system verification.',
  },
];

// 3. Five Core Services (Accurate Company Scope)
export const servicesData: ServiceItem[] = [
  {
    id: 'truck-drivers-on-hire',
    slug: '/services/truck-drivers-on-hire',
    title: 'Truck Drivers On Hire',
    subtitle: 'TRUSTED TRUCK DRIVERS WHEN YOU NEED THEM',
    description:
      'Get trained and police/background-checked truck drivers for your business. Safe driving and route guidance included.',
    highlights: [
      'Skilled & Checked Drivers',
      'Safe Driving & Route Training',
    ],
    icon: 'UserCheck',
    image: '/assets/images/careers-driver.jpg',
    tag: 'Driver Solutions',
  },
  {
    id: '3pl-fleet-management',
    slug: '/services/3pl-fleet-management',
    title: '3PL Fleet Management',
    subtitle: 'EASY TRUCK & ROUTE MANAGEMENT',
    description:
      'We manage your daily truck work, route planning, and service reminders so your goods move without delay.',
    highlights: [
      'Smart Route Planning',
      'On-Time Truck Service Reminders',
    ],
    icon: 'Cpu',
    image: '/assets/images/fleet-warehouse.jpg',
    tag: 'Fleet Solutions',
  },
  {
    id: 'transportation',
    slug: '/services/transportation',
    title: 'Transportation',
    subtitle: 'SAFE & ON-TIME GOODS TRANSPORT',
    description:
      'Safe and budget-friendly goods transport planned around your load needs, with on-time delivery you can count on.',
    highlights: [
      'Goods Transport for Your Business',
      'On-Time Delivery Promise',
    ],
    icon: 'Truck',
    image: '/assets/images/network-map.jpg',
    tag: 'Freight Transport',
  },
  {
    id: 'service-station',
    slug: '/services/service-station',
    title: 'Service Station',
    subtitle: 'TRUCK REPAIR & REGULAR CHECKUPS',
    description:
      'Full servicing and repair support for commercial trucks so your vehicles spend less time off the road.',
    highlights: [
      'Regular Truck Servicing & Checkups',
      'Heavy Engine & Mechanical Repairs',
    ],
    icon: 'Wrench',
    image: '/assets/images/service-station.jpg',
    tag: 'Maintenance Hub',
  },
  {
    id: 'auto-spares',
    slug: '/services/auto-parts',
    title: 'Auto Spares',
    subtitle: 'GENUINE TRUCK SPARE PARTS SUPPORT',
    description:
      'Quick help to find and arrange genuine spare parts for commercial trucks without long waiting times.',
    highlights: [
      'Truck Spare Parts Help',
      'Fast Part Availability Check',
    ],
    icon: 'Cog',
    image: '/assets/images/auto-spares-hero.jpg',
    tag: 'Parts Enquiry',
  },
];

// 4. Why Choose Prisha Xpress? (6 Verified Core Strengths)
export const whyChooseData = [
  {
    id: 'wc-1',
    title: 'Reliable Operations',
    description:
      'Disciplined dispatch workflows, verified vehicle readiness, and proven transport processes ensure consignments move predictably without unexpected delays.',
    icon: 'ShieldCheck',
  },
  {
    id: 'wc-2',
    title: 'Dedicated Team Support',
    description:
      'Hands-on operational support from corporate headquarters in Pune, providing rapid assistance to fleet owners, commercial drivers, and dispatchers.',
    icon: 'Users',
  },
  {
    id: 'wc-3',
    title: 'Transparent Pricing',
    description:
      'Honest, structured service rates with clear commercial terms and zero hidden charges, fostering long-term trust with clients and fleet operators.',
    icon: 'FileCheck',
  },
  {
    id: 'wc-4',
    title: 'Customer-Focused Solutions',
    description:
      'Transportation and driver services customized to individual business schedules, freight types, and route specificities across industrial corridors.',
    icon: 'HeartHandshake',
  },
  {
    id: 'wc-5',
    title: 'Operational Efficiency',
    description:
      'Systematic focus on minimizing empty deadhead transit, proactive maintenance scheduling, and optimizing driver turnaround times.',
    icon: 'Layers',
  },
  {
    id: 'wc-6',
    title: 'Technology-Enabled Services',
    description:
      'Utilizing digital tools and monitoring systems only where genuinely verified and deployed, enhancing shipment transparency and accountability.',
    icon: 'Cpu',
  },
];

// 5. Authentic CSR Initiatives (The Exact 6 Themes from the Official Website)
export const authenticCsrInitiatives: CsrInitiativeItem[] = [
  {
    id: 'csr-1',
    themeNumber: 1,
    title: 'Eye Checkup',
    category: 'Driver Healthcare & Vision Safety',
    summary: 'Regular free eye checkups and vision correction camps for commercial truck drivers.',
    description:
      'Clear vision is the cornerstone of highway road safety. Prisha Xpress conducts regular vision screening camps for heavy vehicle drivers across logistics corridors, helping detect refractive errors and night blindness risks early.',
    keyActivities: [
      'Periodic free optical screening camps at major logistics hubs',
      'Prescription eyeglasses support for drivers in need',
      'Night-vision assessment and highway fatigue awareness',
    ],
    operationalStatus: 'Active Ground Initiative',
  },
  {
    id: 'csr-2',
    themeNumber: 2,
    title: 'Education',
    category: 'Community & Family Welfare',
    summary: 'Educational assistance and learning support for the children of commercial drivers.',
    description:
      'Drivers spend long weeks away from their families to keep the nation moving. We support their children’s education through school supply distribution, scholarship guidance, and educational motivation programs.',
    keyActivities: [
      'School kit and academic book distribution drives',
      'Educational guidance and counseling for driver families',
      'Encouraging formal schooling for children in rural transport pockets',
    ],
    operationalStatus: 'Active Ground Initiative',
  },
  {
    id: 'csr-3',
    themeNumber: 3,
    title: 'Training',
    category: 'Skill Building & Highway Safety',
    summary: 'Continuous professional training in road safety, defensive driving, and professional etiquette.',
    description:
      'Beyond obtaining a commercial licence, professional driving requires continuous skill refinement. We provide structured coaching on defensive highway techniques, safe cargo handling, emergency response, and courteous customer etiquette.',
    keyActivities: [
      'Defensive driving and blind-spot avoidance workshops',
      'Driver etiquette, cleanliness, and client communication training',
      'Fuel-efficient driving habits and speed limiter compliance',
    ],
    operationalStatus: 'Active Ground Initiative',
  },
  {
    id: 'csr-4',
    themeNumber: 4,
    title: 'Respect At Work',
    category: 'Workplace Dignity & Fair Practices',
    summary: 'Fostering dignity, social respect, and professional recognition for heavy commercial drivers.',
    description:
      'Commercial truck drivers are essential economic contributors who deserve dignity and respect. Prisha Xpress promotes zero-tolerance for unfair treatment, ensuring clean, safe, and respectful interactions at every depot and client site.',
    keyActivities: [
      'Zero-tolerance policy against driver disrespect and harassment',
      'Recognizing and honoring exemplary drivers through company awards',
      'Fostering micro-entrepreneurial dignity across the driver ecosystem',
    ],
    operationalStatus: 'Ongoing Driver Welfare Program',
  },
  {
    id: 'csr-5',
    themeNumber: 5,
    title: 'Pit Stops For Rest',
    category: 'Highway Amenities & Fatigue Prevention',
    summary: 'Establishing dedicated rest stops and hygienic facilities for long-haul drivers.',
    description:
      'Driver fatigue is a leading cause of highway accidents. We facilitate and plan designated highway pit stops equipped with clean drinking water, shaded resting areas, and sanitary restrooms where long-haul drivers can recharge safely.',
    keyActivities: [
      'Designating verified rest areas along primary freight corridors',
      'Clean hygiene amenities, washrooms, and shaded resting zones',
      'Enforcing mandatory rest intervals during continuous long-haul transit',
    ],
    operationalStatus: 'Ongoing Driver Welfare Program',
  },
  {
    id: 'csr-6',
    themeNumber: 6,
    title: 'Assured On-Time Payments',
    category: 'Financial Reliability & Transparency',
    summary: 'Guaranteed punctual payment settlements without arbitrary deductions.',
    description:
      'Financial security empowers drivers and builds lasting trust. We maintain transparent settlement cycles, ensuring commercial drivers receive their trip compensation and allowances on schedule without bureaucratic delays or unverified deductions.',
    keyActivities: [
      'Punctual settlement cycles directly into driver bank accounts',
      'Transparent trip accounting with clear rate breakdowns',
      'Financial literacy assistance to help drivers manage savings',
    ],
    operationalStatus: 'Ongoing Driver Welfare Program',
  },
];

// 6. Published Customer Testimonials (Exact names from official website with verification status)
export const publishedTestimonials: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Mr. Vinod Gaikwad',
    role: 'Fleet Owner',
    company: 'Independent Commercial Fleet',
    content:
      'Prisha Xpress has provided dependable commercial drivers who treat our vehicles with care. Their training in road etiquette and highway safety has helped our fleet maintain consistent transit times with peace of mind.',
    rating: 5,
    verificationStatus: 'published_on_old_website_pending_formal_consent',
    source: 'Published testimonial on original prishaxpress.com website',
  },
  {
    id: 't-2',
    name: 'DVS International',
    role: 'Corporate Logistics Customer',
    company: 'DVS International',
    content:
      'We appreciate Prisha Xpress for their responsive customer support and transparent operational planning. Their team understands business-specific cargo requirements and ensures disciplined execution.',
    rating: 5,
    verificationStatus: 'published_on_old_website_pending_formal_consent',
    source: 'Published testimonial on original prishaxpress.com website',
  },
  {
    id: 't-3',
    name: 'Mr. Mahesh Nalawade',
    role: 'Logistics Customer',
    company: 'Regional Transport Client',
    content:
      'Finding verified and dependable commercial drivers was a major bottleneck for our operations. Prisha Xpress delivered screened, capable drivers who respect transit deadlines and vehicle maintenance.',
    rating: 5,
    verificationStatus: 'published_on_old_website_pending_formal_consent',
    source: 'Published testimonial on original prishaxpress.com website',
  },
  {
    id: 't-4',
    name: 'Savani Transport',
    role: 'Transport Partner & Customer',
    company: 'Savani Transport',
    content:
      'The comprehensive approach of Prisha Xpress—from driver staffing to vehicle servicing support—makes them a valued logistics partner. Their operational team in Pune is always accessible when we need assistance.',
    rating: 5,
    verificationStatus: 'published_on_old_website_pending_formal_consent',
    source: 'Published testimonial on original prishaxpress.com website',
  },
];

// 7. Operational Process Steps
export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Requirement Consultation',
    description:
      'We analyze your cargo specifications, lane frequencies, vehicle payload requirements, and specialized commercial driver requirements.',
    icon: 'FileSpreadsheet',
    keyPoints: [
      'Operational capacity assessment',
      'Route & lane efficiency planning',
      'Transparent service-level agreements',
    ],
  },
  {
    step: '02',
    title: 'Driver Deployment & Inspection',
    description:
      'Verified commercial drivers and inspected logistics vehicles undergo rigorous checklist verifications prior to trip dispatch.',
    icon: 'Truck',
    keyPoints: [
      'Document & heavy license verification',
      'Vehicle fitness and checklist inspection',
      'Direct trip assignment coordination',
    ],
  },
  {
    step: '03',
    title: 'Active Transit & Tracking',
    description:
      'Disciplined transit execution supported by our Pune logistics operations center for consistent route visibility.',
    icon: 'Navigation',
    keyPoints: [
      'Milestone updates and lane adherence',
      'Pune operations support desk',
      'Proactive highway issue resolution',
    ],
  },
  {
    step: '04',
    title: 'Digital POD & Settlement',
    description:
      'Swift electronic delivery confirmation, clear itemized billing, and punctual, transparent driver compensation.',
    icon: 'CheckCircle2',
    keyPoints: [
      'Prompt digital proof-of-delivery',
      'Transparent corporate billing',
      'Assured on-time driver payments',
    ],
  },
];
