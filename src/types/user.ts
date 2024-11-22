export type BadgeLevel = 'platinum' | 'gold' | 'silver';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
  level: BadgeLevel;
  progress: number;
}

export interface VisitedPlace {
  id: string;
  name: string;
  date: string;
  type: string;
  rating: number;
  photos: number;
  reviews: number;
  coverImage: string;
  highlights: string[];
  description: string;
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  dates: string;
  status: 'upcoming' | 'draft' | 'completed';
  coverImage: string;
  activities: number;
  budget: string;
  companions: number;
  highlights: string[];
}

export interface UserStats {
  totalDistance: string;
  placesVisited: number;
  photosUploaded: number;
  reviewsWritten: number;
  countriesVisited: number;
  tripsDone: number;
}

export interface UserAchievements {
  totalPoints: number;
  level: string;
  nextMilestone: number;
  rank: string;
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  blog?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio?: string;
  badges: Badge[];
  visitedPlaces: VisitedPlace[];
  savedItineraries: Itinerary[];
  stats?: UserStats;
  achievements?: UserAchievements;
  joinedAt: string;
  socialLinks?: SocialLinks;
}

export interface UserCredentials {
  email: string;
  password: string;
} 