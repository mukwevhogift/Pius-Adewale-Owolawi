// Database Types
export interface HeroSection {
  id: string;
  name: string;
  title: string;
  credentials: string;
  profile_image_url: string | null;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  created_at?: string;
  updated_at?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
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
  name: string;
  role: string;
  organization: string;
  content: string;
  image_url: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CommunityInitiative {
  id: string;
  title: string;
  description: string;
  year: string;
  impact: string | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}
