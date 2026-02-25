// Portfolio data types
export interface OceanBackground {
  id: number
  name: string
  description: string
  image_url: string
  mood: string
}

export interface Project {
  id: number
  name: string
  japanese_name: string
  category: string
  japanese_category: string
  status: string
  japanese_status: string
  year: string
  duration: string
  japanese_duration: string
  description: string
  japanese_description: string
  technologies: string[]
  features: string[]
  japanese_features: string[]
  challenges: string
  japanese_challenges: string
  solutions: string
  japanese_solutions: string
  results: string[]
  japanese_results: string[]
  images: string[]
  demo_url?: string
  github_url?: string
  live_url?: string
  app_store_url?: string
}

export interface Skill {
  name: string
  japanese_name: string
  level: string
  japanese_level: string
  years_experience: number
  description: string
  japanese_description: string
  projects_used: number
  certifications: string[]
}

export interface SkillCategory {
  id: string
  name: string
  japanese_name: string
  description: string
  japanese_description: string
  icon: string
  color: string
  skills: Skill[]
}

export interface Testimonial {
  id: number
  name: string
  japanese_name: string
  position: string
  japanese_position: string
  company: string
  japanese_company: string
  relationship: string
  japanese_relationship: string
  duration: string
  japanese_duration: string
  rating: number
  testimonial: string
  japanese_testimonial: string
  key_qualities: string[]
  japanese_key_qualities: string[]
  project_context: string
  japanese_project_context: string
  photo_url: string
  linkedin_url: string
  date: string
}

export interface BlogPost {
  id: number
  title: string
  japanese_title: string
  slug: string
  excerpt: string
  japanese_excerpt: string
  content: string
  japanese_content: string
  author: string
  japanese_author: string
  date: string
  japanese_date: string
  read_time: string
  japanese_read_time: string
  category: string
  japanese_category: string
  tags: string[]
  japanese_tags: string[]
  featured_image: string
  japanese_featured_image: string
  views: number
  likes: number
  comments: number
  status: string
  japanese_status: string
}

export interface Photo {
  id: number
  title: string
  japanese_title: string
  category: string
  description: string
  japanese_description: string
  image_url: string
  japanese_image_url?: string
  thumbnail_url: string
  location: string
  japanese_location: string
  date_taken: string
  japanese_date_taken: string
  camera: string
  lens: string
  settings: string
  tags: string[]
  japanese_tags: string[]
  featured: boolean
  likes: number
  views: number
}

export interface ContactForm {
  name: string
  email: string
  company: string
  subject: string
  message: string
  budget: string
  timeline: string
}
