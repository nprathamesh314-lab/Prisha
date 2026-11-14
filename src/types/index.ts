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

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
  statLabel?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  keyPoints: string[];
}

export interface NetworkStat {
  label: string;
  value: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  positioning?: string;
  subtitle: string;
  cin: string;
  founded: string;
  headquarters: string;
  address: string;
  city?: string;
  state?: string;
  pinCode?: string;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  businessHours?: string;
  experienceClaim?: string;
  experienceStatus?: 'published_needs_confirmation' | 'confirmed';
}
