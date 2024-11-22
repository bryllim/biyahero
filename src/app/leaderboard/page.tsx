'use client'

import { useState, useEffect } from 'react';
import ProfileNavbar from '@/components/ProfileNavbar';
import { 
  TrophyIcon, 
  FireIcon, 
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Maria Santos",
    points: 15420,
    badge: "Explorer Elite",
    placesVisited: 48,
    reviews: 156,
    rank: 1,
    level: 32,
    achievements: ['Mountain Master', 'Beach Explorer', 'Food Critic'],
    recentDestination: 'Boracay',
    joinedDate: 'May 2023',
    monthlyGrowth: '+12%'
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    points: 14850,
    badge: "Adventure Master",
    placesVisited: 45,
    reviews: 132,
    rank: 2,
    level: 30,
    achievements: ['Cultural Expert', 'Photography Pro', 'Heritage Guardian'],
    recentDestination: 'Palawan',
    joinedDate: 'June 2023',
    monthlyGrowth: '+8%'
  },
  {
    id: 3,
    name: "Anna Reyes",
    points: 14200,
    badge: "Travel Pro",
    placesVisited: 42,
    reviews: 128,
    rank: 3,
    level: 28,
    achievements: ['Island Hopper', 'Local Guide', 'Adventure Seeker'],
    recentDestination: 'Siargao',
    joinedDate: 'April 2023',
    monthlyGrowth: '+15%'
  },
];

const timeFilters = ['All Time', 'This Month', 'This Week'];
const categories = ['Overall', 'Reviews', 'Photos', 'Check-ins'];

export default function LeaderboardPage() {
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [selectedCategory, setSelectedCategory] = useState('Overall');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header with Gradient Background */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 mb-8">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative z-10 text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              BiyaHero Leaderboard
            </h1>
            <p className="text-blue-100">
              Top travelers making their mark across the Philippines
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Time Filter */}
          <div className="flex gap-1 p-1 bg-white rounded-lg shadow-sm border border-gray-200">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedTime(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${selectedTime === filter 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-1 p-1 bg-white rounded-lg shadow-sm border border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid gap-3">
          {leaderboardData.map((user, index) => (
            <div 
              key={user.id}
              className={`transform transition-all duration-500 ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-white rounded-xl border p-4 hover:shadow-lg transition-all duration-300
                ${user.rank === 1 ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-transparent' : 
                  user.rank === 2 ? 'border-gray-200 bg-gradient-to-r from-gray-50 to-transparent' :
                  user.rank === 3 ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-transparent' :
                  'border-gray-200'}`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank with Animation */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <div className="relative">
                      {user.rank === 1 && (
                        <div className="absolute inset-0 animate-ping bg-yellow-400 rounded-full opacity-20" />
                      )}
                      {user.rank === 1 ? (
                        <TrophyIcon className="w-8 h-8 text-yellow-500" />
                      ) : user.rank === 2 ? (
                        <TrophyIcon className="w-8 h-8 text-gray-400" />
                      ) : user.rank === 3 ? (
                        <TrophyIcon className="w-8 h-8 text-orange-500" />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">{user.rank}</span>
                      )}
                    </div>
                  </div>

                  {/* User Icon and Info */}
                  <div className="flex items-center gap-3 flex-grow">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <UserCircleIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50">
                          <SparklesIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">Lvl {user.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm text-gray-600">{user.badge}</span>
                        {user.monthlyGrowth.startsWith('+') && (
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            {user.monthlyGrowth}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-center group cursor-help">
                      <p className="text-xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Points</p>
                    </div>
                    <div className="text-center group cursor-help">
                      <p className="text-xl font-bold text-gray-800 group-hover:scale-110 transition-transform">
                        {user.placesVisited}
                      </p>
                      <p className="text-xs text-gray-600">Places</p>
                    </div>
                    <div className="text-center group cursor-help">
                      <p className="text-xl font-bold text-gray-800 group-hover:scale-110 transition-transform">
                        {user.reviews}
                      </p>
                      <p className="text-xs text-gray-600">Reviews</p>
                    </div>
                  </div>

                  {/* Trending Indicator */}
                  {user.rank <= 3 && (
                    <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <FireIcon className="w-3.5 h-3.5" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 