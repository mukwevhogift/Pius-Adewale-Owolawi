// Database Types
export interface HeroSection {
  id: string;
  title: string;
  name: string;
  subtitle: string;
  description: string;
  image_url: string | null;
  stats: {
    publications: number;
    funding: string;
  } | string; // Can be JSON string or object
  created_at?: string;
  updated_at?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  country: string;
  year_start: string;
  year_end: string | null;
  specialization: string;
  icon: string;
  color: string;
  bg_color: string;
  order_index: number;
  is_ongoing: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  full_name: string;
  icon: string;
  issued_by: string | null;
  year: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  type: 'journal' | 'conference' | 'book' | 'patent';
  doi: string | null;
  pdf_url: string | null;
  external_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Speech {
  id: string;
  title: string;
  event: string | null;
  location: string;
  date: string;
  type: 'keynote' | 'invited' | 'panel' | 'workshop';
  description: string | null;
  video_url: string | null;
  slides_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  icon: string;
  color: string;
  description?: string | null;
  projects: string[] | string; // Can be JSON string or array
  order_index: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  count?: string;
  icon: string;
  color: string;
  details: string[] | string; // Can be JSON string or array
  category?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProfessionalMembership {
  id: string;
  organization: string;
  role: string;
  year_joined: string;
  description: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  category: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string | null;
  icon: string;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CommunityInitiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
