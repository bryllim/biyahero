// Fallback images for each category
const fallbackImages = {
  beaches: "https://images.unsplash.com/photo-1559494007-9f5847c49d94",
  mountains: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  food: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  festivals: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  shopping: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
  heritage: "https://images.unsplash.com/photo-1578468565854-6e5856e0e488"
};

// Helper function to get image URL with fallback
const getImageUrl = (category: string, imageUrl: string) => {
  // Try the provided URL first
  if (imageUrl && imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If no valid URL, use category fallback
  return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.heritage;
};

export const destinationData = {
  beaches: {
    popular: [
      {
        id: 1,
        name: "Boracay",
        location: "Aklan",
        description: "World-famous white beach paradise with crystal clear waters",
        activities: ["Swimming", "Island Hopping", "Water Sports", "Sunset Sailing"],
        bestTime: "November to May",
        imageUrl: "https://images.unsplash.com/photo-1551966775-8b8c7a8b7755"
      },
      {
        id: 2,
        name: "El Nido",
        location: "Palawan",
        description: "Stunning limestone cliffs and crystal-clear lagoons",
        activities: ["Island Hopping", "Kayaking", "Snorkeling", "Cave Exploration"],
        bestTime: "December to March",
        imageUrl: "https://images.unsplash.com/photo-1573978125674-b8c047dc6aaa"
      },
      {
        id: 3,
        name: "Siargao",
        location: "Surigao del Norte",
        description: "Surfing capital of the Philippines with pristine beaches",
        activities: ["Surfing", "Island Hopping", "Swimming", "Beach Camping"],
        bestTime: "September to November",
        imageUrl: "https://images.unsplash.com/photo-1584350954229-fb6a353c6610"
      },
      {
        id: 4,
        name: "Coron",
        location: "Palawan",
        description: "Famous for wreck diving and pristine lagoons",
        activities: ["Diving", "Snorkeling", "Lake Tours", "Beach Hopping"],
        bestTime: "December to March",
        imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392"
      },
      {
        id: 5,
        name: "Panglao",
        location: "Bohol",
        description: "White sand beaches and vibrant marine life",
        activities: ["Diving", "Dolphin Watching", "Island Tours", "Beach Relaxation"],
        bestTime: "March to May",
        imageUrl: "https://images.unsplash.com/photo-1552939452-8b1c50ea2f10"
      },
      {
        id: 6,
        name: "Nacpan Beach",
        location: "El Nido, Palawan",
        description: "Four-kilometer stretch of pristine golden sand and coconut trees",
        activities: ["Swimming", "Sunbathing", "Beach Volleyball", "Photography"],
        bestTime: "December to March",
        imageUrl: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg"
      },
      {
        id: 7,
        name: "White Beach Puerto Galera",
        location: "Oriental Mindoro",
        description: "Vibrant beach known for diving and nightlife",
        activities: ["Diving", "Snorkeling", "Beach Parties", "Water Sports"],
        bestTime: "November to May",
        imageUrl: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
      }
    ],
    alternatives: [
      {
        id: 1,
        name: "Calaguas Islands",
        location: "Camarines Norte",
        description: "Pristine beaches with powdery white sand and unspoiled beauty",
        activities: ["Camping", "Snorkeling", "Beach Activities"],
        bestTime: "March to May",
        advantages: [
          "Less crowded than Boracay",
          "More authentic island experience",
          "Lower costs"
        ],
        comparedTo: "Boracay",
        priceRange: "$",
        imageUrl: "https://images.unsplash.com/photo-1597953601374-1ff2d5640c85"
      },
      {
        id: 2,
        name: "Port Barton",
        location: "Palawan",
        description: "Quiet alternative to El Nido with similar natural beauty",
        activities: ["Island Hopping", "Diving", "Beach Relaxation"],
        bestTime: "December to March",
        advantages: [
          "More peaceful atmosphere",
          "Better value for money",
          "Less commercialized"
        ],
        comparedTo: "El Nido",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1591373/pexels-photo-1591373.jpeg"
      },
      {
        id: 3,
        name: "Seco Island",
        location: "Antique",
        description: "Remote sandbar with pristine waters",
        activities: ["Kitesurfing", "Swimming", "Photography"],
        bestTime: "December to May",
        advantages: [
          "Uncrowded kitesurfing spot",
          "Pristine environment",
          "Adventure experience"
        ],
        comparedTo: "Boracay",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg"
      }
    ]
  },
  mountains: {
    popular: [
      {
        id: 1,
        name: "Mt. Pulag",
        location: "Benguet",
        description: "Highest peak in Luzon famous for its sea of clouds",
        activities: ["Hiking", "Camping", "Photography", "Stargazing"],
        bestTime: "December to February",
        imageUrl: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg"
      },
      {
        id: 2,
        name: "Mt. Apo",
        location: "Davao",
        description: "Highest peak in the Philippines with diverse landscapes",
        activities: ["Hiking", "Camping", "Bird Watching", "Hot Springs"],
        bestTime: "March to May",
        imageUrl: "https://images.unsplash.com/photo-1601789453634-6e3fd2684ea7"
      },
      {
        id: 3,
        name: "Mt. Pinatubo",
        location: "Zambales",
        description: "Famous crater lake and volcanic landscapes",
        activities: ["Hiking", "4x4 Riding", "Photography", "Swimming"],
        bestTime: "December to May",
        imageUrl: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35"
      }
    ],
    alternatives: [
      {
        id: 1,
        name: "Mt. Ulap",
        location: "Benguet",
        description: "Scenic trail with grassland slopes and pine forests",
        activities: ["Day Hiking", "Photography", "Cultural Visits"],
        bestTime: "November to February",
        advantages: [
          "Easier trail than Mt. Pulag",
          "Shorter travel time from Baguio",
          "Similar sea of clouds experience"
        ],
        comparedTo: "Mt. Pulag",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg"
      },
      {
        id: 2,
        name: "Mt. Kupapey",
        location: "Mountain Province",
        description: "Rice terraces and sunrise views",
        activities: ["Day Hiking", "Cultural Immersion", "Photography"],
        bestTime: "December to February",
        advantages: [
          "Less touristy than popular spots",
          "Authentic cultural experience",
          "Easier trail"
        ],
        comparedTo: "Mt. Pulag",
        priceRange: "$",
        imageUrl: "https://images.unsplash.com/photo-4215113/pexels-photo-4215113.jpeg"
      }
    ]
  },
  food: {
    popular: [
      {
        id: 1,
        name: "Binondo Food Crawl",
        location: "Manila",
        description: "World's oldest Chinatown food tour",
        activities: ["Food Tasting", "Cultural Tours", "Market Visits"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg"
      },
      {
        id: 2,
        name: "Pampanga Food Tour",
        location: "San Fernando",
        description: "Culinary capital of the Philippines",
        activities: ["Cooking Classes", "Restaurant Hopping", "Market Tours"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg"
      }
    ],
    alternatives: [
      {
        id: 1,
        name: "Maginhawa Food Park",
        location: "Quezon City",
        description: "Hip street food and local eateries",
        activities: ["Street Food", "Food Park Hopping", "Night Market"],
        bestTime: "Year-round",
        advantages: [
          "More affordable than restaurants",
          "Variety of choices",
          "Local atmosphere"
        ],
        comparedTo: "Binondo Food Crawl",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
      }
    ]
  }
};

// Update all image URLs in the data to use the fallback system
Object.keys(destinationData).forEach(category => {
  const data = destinationData[category as keyof typeof destinationData];
  
  // Update popular destinations
  data.popular = data.popular.map(dest => ({
    ...dest,
    imageUrl: getImageUrl(category, dest.imageUrl)
  }));
  
  // Update alternative destinations
  data.alternatives = data.alternatives.map(dest => ({
    ...dest,
    imageUrl: getImageUrl(category, dest.imageUrl)
  }));
});

export type Destination = {
  id: number;
  name: string;
  location: string;
  description: string;
  activities: string[];
  bestTime: string;
  imageUrl: string;
  advantages?: string[];
  comparedTo?: string;
  priceRange?: string;
};

export type ExperienceData = {
  popular: Destination[];
  alternatives: Destination[];
};