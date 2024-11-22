'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileNavbar from '@/components/ProfileNavbar';
import { User } from '@/types/user';
import { 
  TrophyIcon, 
  CalendarIcon,
  MapPinIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import {
  FireIcon,
  HeartIcon,
  PhotoIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import AIInsightsCard from '@/components/AIInsightsCard';

// Enhanced mock data with more realistic content
const mockUserData: User = {
  id: 'usr_748159263',
  name: 'Alexandra Chen',
  email: 'alex.chen@example.com',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Alex',
  role: 'Adventure Seeker',
  bio: 'Passionate traveler exploring the hidden gems of Southeast Asia. 📸 Photography enthusiast. 🌏 25 countries and counting!',
  badges: [
    {
      id: 'bdg_1',
      name: 'Island Explorer',
      icon: 'IslandIcon',
      description: 'Visited 15+ tropical islands',
      earnedAt: '2024-03-01',
      level: 'platinum',
      progress: 100
    },
    {
      id: 'bdg_2',
      name: 'Culture Maven',
      icon: 'CultureIcon',
      description: 'Explored 8 UNESCO heritage sites',
      earnedAt: '2024-02-15',
      level: 'gold',
      progress: 80
    },
    {
      id: 'bdg_3',
      name: 'Thrill Seeker',
      icon: 'AdventureIcon',
      description: 'Completed 12 extreme activities',
      earnedAt: '2024-01-20',
      level: 'platinum',
      progress: 100
    },
    {
      id: 'bdg_4',
      name: 'Culinary Adventurer',
      icon: 'FoodIcon',
      description: 'Sampled 30+ local delicacies',
      earnedAt: '2024-02-28',
      level: 'gold',
      progress: 75
    }
  ],
  visitedPlaces: [
    {
      id: 'plc_1',
      name: 'Siargao Islands',
      date: '2024-02-28',
      type: 'Island Paradise',
      rating: 5,
      photos: 24,
      reviews: 3,
      coverImage: '/images/siargao.jpg',
      highlights: ['Cloud 9 Surfing', 'Island Hopping', 'Sugba Lagoon'],
      description: "A surfer's paradise with crystal clear waters and vibrant island life."
    },
    {
      id: 'plc_2',
      name: 'Banaue Rice Terraces',
      date: '2024-02-15',
      type: 'UNESCO Heritage',
      rating: 5,
      photos: 18,
      reviews: 2,
      coverImage: '/images/banaue.jpg',
      highlights: ['Sunrise Viewing', 'Cultural Tour', 'Local Homestay'],
      description: 'Ancient rice terraces carved into the mountains of Ifugao.'
    },
    {
      id: 'plc_3',
      name: 'Chocolate Hills',
      date: '2024-01-30',
      type: 'Natural Wonder',
      rating: 4,
      photos: 15,
      reviews: 3,
      coverImage: '/images/chocolate-hills.jpg',
      highlights: ['Viewpoint Trek', 'ATV Adventure', 'Sunset Watch'],
      description: 'Unique geological formation featuring over 1,000 symmetrical hills.'
    }
  ],
  savedItineraries: [
    {
      id: 'itn_1',
      title: 'Ultimate Palawan Adventure',
      destination: 'El Nido & Coron',
      dates: '2024-04-15 - 2024-04-22',
      status: 'upcoming',
      coverImage: '/images/palawan.jpg',
      activities: 12,
      budget: '₱55,000',
      companions: 3,
      highlights: ['Island Hopping', 'Scuba Diving', 'Beach Camping']
    },
    {
      id: 'itn_2',
      title: 'Northern Heritage Trail',
      destination: 'Vigan, Sagada, Banaue',
      dates: '2024-05-01 - 2024-05-07',
      status: 'draft',
      coverImage: '/images/vigan.jpg',
      activities: 15,
      budget: '₱45,000',
      companions: 2,
      highlights: ['Historical Tours', 'Cave Exploration', 'Mountain Trekking']
    },
    {
      id: 'itn_3',
      title: 'Cebu Adventure Week',
      destination: 'Cebu City & Moalboal',
      dates: '2024-06-10 - 2024-06-16',
      status: 'completed',
      coverImage: '/images/cebu.jpg',
      activities: 10,
      budget: '₱40,000',
      companions: 4,
      highlights: ['Whale Shark Watching', 'Canyoneering', 'Island Hopping']
    }
  ],
  joinedAt: '2024-01-01',
  socialLinks: {
    instagram: '@alex.adventures',
    youtube: 'AlexExplores',
    blog: 'travelswithalex.com'
  }
};

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Setting mock data:', mockUserData);
    setUser(mockUserData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <ProfileNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-white rounded-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-white rounded-3xl"></div>
              </div>
              <div className="h-96 bg-white rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">User not found</h2>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const getBadgeLevelColor = (level: string) => {
    const colors = {
      platinum: 'from-purple-500 to-indigo-500',
      gold: 'from-yellow-500 to-orange-500',
      silver: 'from-gray-400 to-gray-500'
    };
    return colors[level as keyof typeof colors] || 'from-blue-500 to-blue-600';
  };

  // Stats section with null check
  const renderStats = () => {
    if (!user.stats) return null;
    
    return (
      <div className="flex gap-8">
        {Object.entries(user.stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                {user?.role}
              </span>
              <p className="text-sm text-gray-600 mt-2">{user?.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column (Badges & Recent Places) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <TrophyIcon className="w-5 h-5 text-yellow-500" />
                Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.badges?.map((badge) => (
                  <div 
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <TrophyIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{badge.name}</h3>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Places Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <MapPinIcon className="w-5 h-5 text-red-500" />
                Recent Places
              </h2>
              <div className="space-y-3">
                {user?.visitedPlaces?.map((place) => (
                  <div 
                    key={place.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                        <BuildingLibraryIcon className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{place.name}</h3>
                        <p className="text-xs text-gray-500">{place.type}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(place.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (AI Insights & Travel Plans) */}
          <div className="space-y-6">
            {/* AI Insights Card */}
            <AIInsightsCard user={user} />

            {/* Travel Plans Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-green-500" />
                Travel Plans
              </h2>
              <div className="space-y-3">
                {user?.savedItineraries?.map((itinerary) => (
                  <div 
                    key={itinerary.id}
                    className="rounded-xl border border-gray-100 overflow-hidden hover:border-blue-100 transition-colors"
                  >
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{itinerary.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                          ${itinerary.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                            itinerary.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'}`}>
                          {itinerary.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{itinerary.destination}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{itinerary.activities} activities</span>
                        <span>{itinerary.budget}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 