import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github 
} from "lucide-react";

// Color themes presets
export const COLOR_THEMES = {
  modern: {
    name: 'Modern Blue',
    primary: '#1a73e8',
    secondary: '#4285f4',
    accent: '#fbbc05',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  nature: {
    name: 'Natural Green',
    primary: '#34a853',
    secondary: '#178038',
    accent: '#fbbc05',
    text: '#3c4043',
    background: '#ffffff',
    lightBg: '#f1f3f4'
  },
  elegant: {
    name: 'Elegant Purple',
    primary: '#673ab7',
    secondary: '#512da8',
    accent: '#ff9800',
    text: '#212121',
    background: '#ffffff',
    lightBg: '#f5f5f5'
  },
  vibrant: {
    name: 'Vibrant Red',
    primary: '#ea4335',
    secondary: '#c5221f',
    accent: '#4285f4',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  minimal: {
    name: 'Minimal Gray',
    primary: '#5f6368',
    secondary: '#3c4043',
    accent: '#1a73e8',
    text: '#202124',
    background: '#ffffff',
    lightBg: '#f8f9fa'
  },
  dark: {
    name: 'Dark Mode',
    primary: '#4285f4',
    secondary: '#1a73e8',
    accent: '#fbbc05',
    text: '#e8eaed',
    background: '#202124',
    lightBg: '#303134'
  }
};

// Social media platforms
export const SOCIAL_PLATFORMS = [
  { name: 'Facebook', icon: 'fa-facebook-f', component: Facebook },
  { name: 'Twitter', icon: 'fa-twitter', component: Twitter },
  { name: 'Instagram', icon: 'fa-instagram', component: Instagram },
  { name: 'LinkedIn', icon: 'fa-linkedin-in', component: Linkedin },
  { name: 'GitHub', icon: 'fa-github', component: Github }
];

// Tab definitions
export const TABS = [
  { id: 'general', label: 'General Information' },
  { id: 'features', label: 'Features Section' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact Information' },
  { id: 'design', label: 'Design & Theme' },
  { id: 'advanced', label: 'Advanced Options' }
];

// Default available icons for features
export const FEATURE_ICONS = [
  { value: 'fa-chart-line', label: 'Chart' },
  { value: 'fa-cog', label: 'Gear' },
  { value: 'fa-bolt', label: 'Lightning' },
  { value: 'fa-shield-alt', label: 'Shield' },
  { value: 'fa-comments', label: 'Chat' },
  { value: 'fa-code', label: 'Code' },
  { value: 'fa-users', label: 'Users' },
  { value: 'fa-cloud', label: 'Cloud' },
  { value: 'fa-rocket', label: 'Rocket' },
  { value: 'fa-star', label: 'Star' }
];

// Default state for the application
export const DEFAULT_STATE = {
  businessName: '',
  headline: '',
  subheadline: '',
  email: '',
  phone: '',
  address: '',
  footerDescription: '',
  colorTheme: 'modern',
  contactFormEnabled: true,
  logoImage: null,
  features: [
    {
      title: 'Advanced Analytics',
      description: 'Get detailed insights with our state-of-the-art analytics platform.',
      icon: 'fa-chart-line'
    },
    {
      title: 'Secure Platform',
      description: 'Enterprise-level security for all your data and transactions.',
      icon: 'fa-shield-alt'
    }
  ],
  testimonials: [
    {
      name: 'John Smith',
      role: 'CEO, Tech Innovations',
      text: 'Working with us completely transformed their business. Our solutions are intuitive and powerful.',
      image: null
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director, GrowthCo',
      text: 'The customer support team is incredible. We helped them implement solutions that increased their conversion rate by 40%.',
      image: null
    }
  ],
  portfolioImages: [
    {
      title: 'Website Redesign',
      description: 'Complete overhaul of client e-commerce platform with 200% increase in conversions.',
      image: null
    },
    {
      title: 'Mobile App Development',
      description: 'Custom mobile application with seamless integration to existing systems.',
      image: null
    }
  ],
  socialLinks: [
    { platform: 'Facebook', icon: 'fa-facebook-f', url: '' },
    { platform: 'Twitter', icon: 'fa-twitter', url: '' },
    { platform: 'Instagram', icon: 'fa-instagram', url: '' },
    { platform: 'LinkedIn', icon: 'fa-linkedin-in', url: '' },
    { platform: 'GitHub', icon: 'fa-github', url: '' }
  ],
  partnerLogos: [],
  metaDescription: '',
  metaKeywords: '',
  customCSS: '',
  headScripts: '',
  bodyScripts: '',
  includeSourceFiles: true,
  minifyOutput: true
};

export type WebsiteState = typeof DEFAULT_STATE;
export type ColorTheme = keyof typeof COLOR_THEMES;
