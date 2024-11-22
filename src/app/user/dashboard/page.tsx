'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { User } from '@/types/user';
import { 
  TrophyIcon, 
  MapIcon, 
  CalendarIcon,
  PencilSquareIcon,
  ChevronRightIcon,
  MapPinIcon,
  ClockIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

// Updated mock data with more realistic content
const mockUserData = {
  id: 'usr_748159263',
  name: 'Alexandra Chen',
  email: 'alex.chen@example.com',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Alex',
  role: 'Travel Enthusiast',
  badges: [
    {
      id: 'bdg_1',
      name: 'Island Hopper',
      icon: 'IslandIcon',
      description: 'Visited 10+ islands in the Philippines',
      earnedAt: '2024-03-01',
      level: 'gold'
    },
    {
      id: 'bdg_2',
      name: 'Culture Seeker',
      icon: 'CultureIcon',
      description: 'Explored 5 UNESCO heritage sites',
      earnedAt: '2024-02-15',
      level: 'silver'
    },
    {
      id: 'bdg_3',
      name: 'Adventure Master',
      icon: 'AdventureIcon',
      description: 'Completed 8 extreme activities',
      earnedAt: '2024-01-20',
      level: 'platinum'
    },
    {
      id: 'bdg_4',
      name: 'Local Foodie',
      icon: 'FoodIcon',
      description: 'Tried 20+ local delicacies',
      earnedAt: '2024-02-28',
      level: 'gold'
    }
  ],
  visitedPlaces: [
    {
      id: 'plc_1',
      name: 'Siargao Islands',
      date: '2024-02-28',
      type: 'Island',
      rating: 5,
      photos: 12,
      reviews: 2
    },
    {
      id: 'plc_2',
      name: 'Banaue Rice Terraces',
      date: '2024-02-15',
      type: 'Heritage',
      rating: 5,
      photos: 8,
      reviews: 1
    },
    {
      id: 'plc_3',
      name: 'Chocolate Hills',
      date: '2024-01-30',
      type: 'Natural Wonder',
      rating: 4,
      photos: 15,
      reviews: 3
    }
  ],
  savedItineraries: [
    {
      id: 'itn_1',
      title: 'Palawan Island Expedition',
      destination: 'El Nido & Coron',
      dates: '2024-04-15 - 2024-04-22',
      status: 'upcoming' as const,
      coverImage: '/images/palawan.jpg',
      activities: 8,
      budget: '₱45,000'
    },
    {
      id: 'itn_2',
      title: 'Northern Luzon Cultural Tour',
      destination: 'Vigan, Sagada, Banaue',
      dates: '2024-05-01 - 2024-05-07',
      status: 'draft' as const,
      coverImage: '/images/vigan.jpg',
      activities: 12,
      budget: '₱35,000'
    },
    {
      id: 'itn_3',
      title: 'Cebu Adventure Week',
      destination: 'Cebu City & Moalboal',
      dates: '2024-06-10 - 2024-06-16',
      status: 'completed' as const,
      coverImage: '/images/cebu.jpg',
      activities: 10,
      budget: '₱40,000'
    }
  ],
  stats: {
    totalDistance: '1,234 km',
    placesVisited: 15,
    photosUploaded: 127,
    reviewsWritten: 8
  },
  joinedAt: '2024-01-01'
} as const;

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, fetch user data from API
    // For demo, get from localStorage or use mock data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(mockUserData);
    }
  }, []);

  if (!user) return null;

  const getBadgeLevelColor = (level: string) => {
    const colors = {
      platinum: 'from-purple-500 to-indigo-500',
      gold: 'from-yellow-500 to-orange-500',
      silver: 'from-gray-400 to-gray-500'
    };
    return colors[level as keyof typeof colors] || 'from-blue-500 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden mb-8">
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-12 left-8 flex items-end gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </div>
              <div className="mb-3">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-16 pb-6 px-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                {Object.entries(user.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium 
                               text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
                               hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow">
                <PencilSquareIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <TrophyIcon className="w-6 h-6 text-yellow-500" />
                Achievement Badges
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {user.badges.map((badge) => (
                  <div 
                    key={badge.id}
                    className="group relative bg-white rounded-xl border border-gray-200 p-4 
                             transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                  >
                    <div className={`absolute top-0 right-0 w-20 h-1 rounded-full 
                                   bg-gradient-to-r ${getBadgeLevelColor(badge.level)}`} />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
                                    flex items-center justify-center">
                        <TrophyIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{badge.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          Earned {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Places */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <MapPinIcon className="w-6 h-6 text-red-500" />
                Recent Adventures
              </h2>
              <div className="space-y-4">
                {user.visitedPlaces.map((place) => (
                  <div 
                    key={place.id}
                    className="group bg-white rounded-xl border border-gray-200 p-4 
                             transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 
                                      flex items-center justify-center">
                          <BuildingLibraryIcon className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{place.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">{place.type}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-yellow-500">★</span>
                              <span className="text-sm text-gray-600">{place.rating}</span>
                            </div>
                            <span className="text-sm text-gray-600">{place.photos} photos</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(place.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Itineraries */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <CalendarIcon className="w-6 h-6 text-green-500" />
                Travel Plans
              </h2>
              <div className="space-y-4">
                {user.savedItineraries.map((itinerary) => (
                  <div 
                    key={itinerary.id}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden
                             transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="aspect-video w-full bg-gray-100 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-medium text-white">{itinerary.title}</h3>
                        <p className="text-sm text-gray-200">{itinerary.destination}</p>
                      </div>
                      <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
                        ${itinerary.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                          itinerary.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {itinerary.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{itinerary.activities} activities</span>
                        <span>{itinerary.budget}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{itinerary.dates}</p>
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