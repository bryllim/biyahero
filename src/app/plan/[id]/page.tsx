'use client'

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { fetchDestinationDetails } from '@/services/gemini';
import Navbar from '@/components/Navbar';

interface DestinationDetails {
  name: string;
  location: string;
  description: string;
  activities: string[];
  bestTime: string;
  imageUrl?: string;
  transportation?: {
    howToGetThere: string;
    localTransport: string;
  };
  travelTips?: string[];
  cuisine?: {
    name: string;
    description: string;
  }[];
}

export default function PlanTripPage() {
  const params = useParams();
  const router = useRouter();
  const [destinationDetails, setDestinationDetails] = useState<DestinationDetails | null>(null);
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
          location: details.location || '',
          description: details.description,
          activities: details.activities.map((a: any) => a.name),
          bestTime: details.bestTimeToVisit.period,
          imageUrl: details.imageUrl,
          transportation: details.transportation,
          travelTips: details.travelTips,
          cuisine: details.cuisine
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
      accommodation: 'mid-range',  // Set default values
      transportation: 'public',
      food: 'local'
    };

    try {
      const queryParams = new URLSearchParams({
        destination: params.id as string,
        startDate: formData.startDate,
        duration: formData.duration,
        budget: formData.budget,
        travelStyle: formData.travelStyle,
        groupSize: formData.groupSize,
        otherPreferences: formData.otherPreferences,
        preferences: JSON.stringify(cleanPreferences)  // Ensure valid JSON
      });

      router.push(`/itinerary/generate?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error creating query params:', error);
    }
  };

  const selectClassName = "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none \
                         focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white \
                         appearance-none cursor-pointer relative \
                         bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] \
                         bg-[length:20px] bg-[right_0.5rem_center] bg-no-repeat \
                         pr-10";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-grow">
        {/* Header Section */}
        <div className="bg-blue-600 pb-20 pt-24">
          <div className="max-w-7xl mx-auto px-8">
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
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-8 -mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Destination Details */}
            <div className="space-y-6">
              {/* Main Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Image Section */}
                <div className="h-64 bg-gray-100">
                  {destinationDetails?.imageUrl ? (
                    <img 
                      src={destinationDetails.imageUrl} 
                      alt={destinationDetails.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">About the Destination</h2>
                    <p className="text-gray-600">{destinationDetails?.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {destinationDetails?.activities.map((activity, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {destinationDetails?.transportation && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Getting There & Around</h3>
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800 block mb-1">How to get there:</span>
                            {destinationDetails.transportation.howToGetThere}
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-800 block mb-1">Local transportation:</span>
                            {destinationDetails.transportation.localTransport}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {destinationDetails?.cuisine && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Local Cuisine</h3>
                      <div className="space-y-3">
                        {destinationDetails.cuisine.map((item, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-xl">
                            <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Best time to visit: </span>
                    <span className="font-medium">{destinationDetails?.bestTime}</span>
                  </div>

                  {destinationDetails?.travelTips && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Travel Tips</h3>
                      <ul className="space-y-2">
                        {destinationDetails.travelTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Plan Form */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden sticky" 
                   style={{ top: "2rem" }}>
                <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                  {/* Travel Dates Section */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">Travel Dates</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                                   focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className={selectClassName}
                        >
                          {[3,4,5,6,7,8,9,10].map(days => (
                            <option key={days} value={days}>{days} days</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Budget Section */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">Budget</h2>
                        <p className="text-xs text-gray-500">Per day</p>
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
                        className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  {/* Travel Style Section */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">Travel Style</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style
                        </label>
                        <select
                          value={formData.travelStyle}
                          onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
                          className={selectClassName}
                        >
                          <option value="relaxed">Relaxed & Easy</option>
                          <option value="balanced">Balanced</option>
                          <option value="active">Active & Adventurous</option>
                        </select>
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
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                                   focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Preferences Section */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800">Additional Preferences</h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Preferences
                      </label>
                      <textarea
                        value={formData.otherPreferences}
                        onChange={(e) => setFormData({ ...formData, otherPreferences: e.target.value })}
                        placeholder="Tell us about any dietary requirements, accessibility needs, preferred activities, or special interests..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                                 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white
                                 resize-none h-32"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="p-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                               transition-all duration-300 flex items-center justify-center gap-2
                               shadow-lg shadow-blue-600/20"
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
        </div>
      </div>

      <Footer />
    </div>
  );
} 