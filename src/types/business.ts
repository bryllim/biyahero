export type BusinessType = 'Hotel' | 'Restaurant' | 'Travel Agency' | 'Tour Guide' | 'Transportation' | 'Activity Provider';

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  description: string;
  location: string;
  activities: string[];
  priceRange: '$' | '$$' | '$$$';
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  operatingHours: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface BusinessForm {
  name: string;
  type: BusinessType;
  description: string;
  location: string;
  activities: string[];
  priceRange: '$' | '$$' | '$$$';
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  operatingHours: string;
  images: FileList | null;
} 