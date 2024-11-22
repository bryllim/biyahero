'use client'

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { fetchDestinationDetails } from '@/services/gemini';

export default function PlanTripPage() {
  const params = useParams();
  const router = useRouter();
  const [destinationDetails, setDestinationDetails] = useState<{ name: string; location: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    startDate: '',
    duration: '3',
    budget: '5000',
    travelStyle: 'balanced',
    groupSize: '2',
    otherPreferences: '',
    preferences: {
      accommodation: 'mid-range',
      transportation: 'public',
      food: 'local',
    }
  });

  useEffect(() => {
    const loadDestinationDetails = async () => {
      try {
        const details = await fetchDestinationDetails(params.id as string);
        setDestinationDetails({
          name: details.name,
          location: details.location || ''
        });
      } catch (err) {
        console.error('Error loading destination:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDestinationDetails();
  }, [params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a clean preferences object for serialization
    const cleanPreferences = {
      accommodation: formData.preferences.accommodation,
      transportation: formData.preferences.transportation,
      food: formData.preferences.food
    };

    const queryParams = new URLSearchParams({
      destination: params.id as string,
      startDate: formData.startDate,
      duration: formData.duration,
      budget: formData.budget,
      travelStyle: formData.travelStyle,
      groupSize: formData.groupSize,
      otherPreferences: formData.otherPreferences,
      preferences: JSON.stringify(cleanPreferences)  // Stringify a clean object
    });

    router.push(`/itinerary/generate?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar - Removed sticky positioning */}
      <div className="z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm my-4">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600">BiyaHero</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                    Log in
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-blue-600 pb-40 pt-32">
          <div className="max-w-3xl mx-auto px-8">
            <div className="space-y-4">
              {loading ? (
                <div className="h-8 w-48 bg-blue-500/50 rounded animate-pulse" />
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-blue-100">
                    {destinationDetails?.location}
                  </span>
                </div>
              )}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {loading ? (
                    <div className="h-12 w-96 bg-blue-500/50 rounded animate-pulse" />
                  ) : (
                    <>Plan Your Trip to {destinationDetails?.name}</>
                  )}
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                  Tell us about your preferences and let us create a personalized itinerary just for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Adjusted negative margin to maintain overlap */}
        <div className="max-w-3xl mx-auto px-8 -mt-32 pb-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Travel Dates Section */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Travel Dates</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <div className="relative">
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                                 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white
                                 appearance-none cursor-pointer pr-10"
                      >
                        {[3,4,5,6,7,8,9,10].map(days => (
                          <option key={days} value={days}>{days} days</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Section */}
              <div className="p-8 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Budget</h2>
                    <p className="text-sm text-gray-500 mt-1">How much are you planning to spend per day?</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₱</span>
                  </div>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                             focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                    placeholder="5000"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recommended minimum budget is ₱1,000 per day
                </p>
              </div>

              {/* Travel Style Section */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Travel Style</h2>
                    <p className="text-sm text-gray-500 mt-1">Tell us how you like to travel</p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Style
                    </label>
                    <div className="relative">
                      <select
                        value={formData.travelStyle}
                        onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                                 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white
                                 appearance-none cursor-pointer pr-10"
                      >
                        <option value="relaxed">Relaxed & Easy</option>
                        <option value="balanced">Balanced</option>
                        <option value="active">Active & Adventurous</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Preferences Section */}
              <div className="p-8 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Additional Preferences</h2>
                    <p className="text-sm text-gray-500 mt-1">Help us personalize your itinerary</p>
                  </div>
                </div>
                <textarea
                  value={formData.otherPreferences}
                  onChange={(e) => setFormData({ ...formData, otherPreferences: e.target.value })}
                  placeholder="Tell us about any specific preferences, dietary requirements, or special interests..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                           focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white
                           resize-none h-32"
                />
              </div>

              {/* Submit Button Section */}
              <div className="p-8 bg-white">
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                           transition-all duration-300 flex items-center justify-center gap-2
                           shadow-lg shadow-blue-600/20 transform hover:-translate-y-0.5"
                >
                  <span className="font-medium">Generate Itinerary</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 