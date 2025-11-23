// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Select-dropdown value type
export interface SelectValue {
  key: string;
  value: string;
}

// Image/File metafield type
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Bike specifications
export interface Bike extends CosmicObject {
  type: 'bikes';
  metadata: {
    make: string;
    model: string;
    year_range?: string;
    engine_cc: number;
    main_jet_size: number;
    pilot_jet_size: number;
    float_height?: number;
    install_duration?: number;
    special_instructions?: string;
  };
}

// Kit component structure (JSON metafield)
export interface KitComponent {
  name: string;
  description: string;
  icon: string;
}

// Kit product
export interface Kit extends CosmicObject {
  type: 'kits';
  metadata: {
    kit_name: string;
    sku: string;
    description: string;
    price: number;
    original_price?: number;
    install_price: number;
    product_image: CosmicFile;
    components_list: KitComponent[];
    compatible_bikes?: Bike[];
    in_stock: boolean;
  };
}

// Garage/installation location
export interface Garage extends CosmicObject {
  type: 'garages';
  metadata: {
    name: string;
    address: string;
    city: string;
    state: string;
    pin_code: string;
    latitude: number;
    longitude: number;
    phone_number: string;
    operating_hours?: string;
    total_installs?: number;
    rating?: number;
    certified: boolean;
    lead_mechanic_name?: string;
    mechanic_photo?: CosmicFile;
  };
}

// Learn article categories
export type LearnCategory = 'basics' | 'maintenance' | 'troubleshoot' | 'diy';

// Learn article
export interface LearnArticle extends CosmicObject {
  type: 'learn-articles';
  metadata: {
    title: string;
    icon_type: SelectValue;
    content: string;
    featured_image?: CosmicFile;
    read_time?: number;
    category: SelectValue;
  };
}

// FAQ categories
export type FAQCategory = 'warranty' | 'compatibility' | 'install' | 'pricing' | 'technical';

// FAQ
export interface FAQ extends CosmicObject {
  type: 'faqs';
  metadata: {
    question: string;
    answer: string; // HTML formatted
    category: SelectValue;
    order?: number;
  };
}

// API response wrapper
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
}

// Type guards for runtime validation
export function isBike(obj: CosmicObject): obj is Bike {
  return obj.type === 'bikes';
}

export function isKit(obj: CosmicObject): obj is Kit {
  return obj.type === 'kits';
}

export function isGarage(obj: CosmicObject): obj is Garage {
  return obj.type === 'garages';
}

export function isLearnArticle(obj: CosmicObject): obj is LearnArticle {
  return obj.type === 'learn-articles';
}

export function isFAQ(obj: CosmicObject): obj is FAQ {
  return obj.type === 'faqs';
}

// Error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}