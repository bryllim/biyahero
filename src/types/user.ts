export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedAt: string;
    level: 'platinum' | 'gold' | 'silver';
  }[];
  visitedPlaces: {
    id: string;
    name: string;
    date: string;
    type: string;
    rating: number;
    photos: number;
    reviews: number;
  }[];
  savedItineraries: {
    id: string;
    title: string;
    destination: string;
    dates: string;
    status: 'upcoming' | 'draft' | 'completed';
    coverImage: string;
    activities: number;
    budget: string;
  }[];
  stats: {
    totalDistance: string;
    placesVisited: number;
    photosUploaded: number;
    reviewsWritten: number;
  };
  joinedAt: string;
};

export interface UserCredentials {
  email: string;
  password: string;
} 