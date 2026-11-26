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
  image: string;
  keyActivities: string[];
  operationalStatus: string;
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
    title: 'Eye Checkups for Drivers',
    category: 'Health & Vision Support',
    summary: 'Regular free eye checkups and vision glasses support for commercial truck drivers.',
    image: '/assets/images/csr/csr-eye-checkup.jpg',
    description:
      'Clear vision is very important for road safety. We organize regular eye checkup camps for truck drivers along transport routes to check eyesight and prevent night driving problems.',
    keyActivities: [
      'Regular free eye checkup camps at transport hubs',
      'Free eyeglasses support for drivers who need them',
      'Night vision checks and road safety tips',
    ],
    operationalStatus: 'Active Ground Support',
  },
  {
    id: 'csr-2',
    themeNumber: 2,
    title: "Children's Education Support",
    category: 'Family & Children Care',
    summary: 'School supplies and learning support for the children of commercial truck drivers.',
    image: '/assets/images/csr/csr-education.webp',
    description:
      'Truck drivers stay away from home for many weeks to do their work. We support their families by helping their children with school kits, books and guidance for higher schooling.',
    keyActivities: [
      'School bags, notebooks and stationery kit distribution',
      'Guidance and counseling for driver families on education',
      'Encouraging children in transport communities to stay in school',
    ],
    operationalStatus: 'Active Ground Support',
  },
  {
    id: 'csr-3',
    themeNumber: 3,
    title: 'Driver Safety & Training',
    category: 'Driving Skills & Road Safety',
    summary: 'Helpful training in road safety rules, safe driving at night, and customer etiquette.',
    image: '/assets/images/csr/csr-training.webp',
    description:
      'Safe driving protects everyone on the road. We arrange practical training sessions on safe highway driving, blind spots, vehicle safety checks, and polite communication with clients.',
    keyActivities: [
      'Safe driving tips and blind spot awareness workshops',
      'Good manners, cleanliness and polite communication training',
      'Fuel-saving driving habits and speed safety rules',
    ],
    operationalStatus: 'Active Ground Support',
  },
  {
    id: 'csr-4',
    themeNumber: 4,
    title: 'Respect at Work',
    category: 'Respecting Drivers & Fair Treatment',
    summary: 'Giving dignity, social respect and fair recognition to commercial truck drivers.',
    image: '/assets/images/csr/csr-respect.webp',
    description:
      'Truck drivers do hard and honest work. They deserve polite and respectful treatment from everyone. We follow strict rules against any unfair treatment at company offices, hubs and client sites.',
    keyActivities: [
      'Strict rules against rude behaviour or unfair treatment of drivers',
      'Recognizing and honoring safe and experienced drivers with awards',
      'Treating drivers as respected partners of our business',
    ],
    operationalStatus: 'Ongoing Driver Care',
  },
  {
    id: 'csr-5',
    themeNumber: 5,
    title: 'Highway Rest Stops',
    category: 'Rest Areas & Clean Water',
    summary: 'Safe highway stops with clean water, washrooms, and shaded parking for long trips.',
    image: '/assets/images/csr/csr-pit-stops.webp',
    description:
      'Driving continuously for long hours makes drivers tired. We help drivers find clean and safe highway stops where they can rest, get clean drinking water, and use proper washrooms.',
    keyActivities: [
      'Safe rest stops identified along major transport routes',
      'Clean drinking water, washrooms and shaded parking areas',
      'Encouraging proper rest and sleep during long highway trips',
    ],
    operationalStatus: 'Ongoing Driver Care',
  },
  {
    id: 'csr-6',
    themeNumber: 6,
    title: 'On-Time Bank Payments',
    category: 'Clear & Reliable Payments',
    summary: 'Guaranteed on-time trip payments credited directly into driver bank accounts.',
    image: '/assets/images/csr/csr-payments.webp',
    description:
      'Drivers work hard to support their families. We ensure all trip payments, allowances, and settlements are credited directly to their bank accounts on time, with full and clear rate details.',
    keyActivities: [
      'Fast and on-time payments directly into driver bank accounts',
      'Clear trip accounts with simple rate explanations',
      'Simple guidance to help drivers save and manage money',
    ],
    operationalStatus: 'Ongoing Driver Care',
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
