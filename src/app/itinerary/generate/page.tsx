'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateItinerary } from '@/services/gemini';
import Footer from '@/components/Footer';

interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    activity: string;
    description: string;
    location?: string;
    tips?: string;
  }[];
}

interface GeneratedItinerary {
  title: string;
  overview: string;
  days: ItineraryDay[];
  additionalTips: string[];
  estimatedBudget: {
    total: string;
    breakdown: {
      category: string;
      amount: string;
      details: string;
    }[];
  };
}

function TimelineIndicator({ day, isFirst, isLast }: { day: number; isFirst: boolean; isLast: boolean }) {
  return (
    <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center w-12">
      <div className={`w-0.5 grow ${isFirst ? 'bg-transparent' : 'bg-blue-200'}`} />
      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium text-sm">
        {day}
      </div>
      <div className={`w-0.5 grow ${isLast ? 'bg-transparent' : 'bg-blue-200'}`} />
    </div>
  );
}

function ItineraryDaySkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="flex gap-8">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
          <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <p className="text-gray-600 animate-pulse">Generating your personalized itinerary...</p>
      </div>
    </div>
  );
}

export default function GenerateItineraryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const generateTripItinerary = async () => {
      try {
        setLoading(true);
        const params = {
          destination: searchParams.get('destination') || '',
          startDate: searchParams.get('startDate') || '',
          duration: searchParams.get('duration') || '',
          budget: searchParams.get('budget') || '',
          travelStyle: searchParams.get('travelStyle') || '',
          groupSize: searchParams.get('groupSize') || '',
          otherPreferences: searchParams.get('otherPreferences') || '',
          preferences: {}
        };

        try {
          const preferencesStr = searchParams.get('preferences');
          if (preferencesStr) {
            params.preferences = JSON.parse(preferencesStr);
          }
        } catch (jsonError) {
          console.error('Error parsing preferences JSON:', jsonError);
        }

        const result = await generateItinerary(params);
        setItinerary(result);
        setTimeout(() => {
          setShowResults(true);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error generating itinerary:', err);
        setError(true);
        setLoading(false);
      }
    };

    generateTripItinerary();
  }, [searchParams]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 bg-red-50 rounded-full inline-block mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Failed to Generate Itinerary</h2>
          <p className="text-gray-600">Something went wrong while generating your itinerary.</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className={`sticky top-4 z-50 mx-4 sm:mx-8 ${showResults ? 'animate-slide-up-fade' : ''}`}>
        <nav className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm">
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
      <div className={`max-w-7xl mx-auto px-8 py-12 ${showResults ? 'animate-slide-up-fade' : ''}`} 
           style={{ animationDelay: '100ms' }}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Itinerary Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <ItineraryDaySkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
                    <p className="text-sm font-medium text-blue-600">Your Personalized Itinerary</p>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">{itinerary?.title}</h1>
                  <p className="text-gray-600">{itinerary?.overview}</p>
                </div>

                {/* Itinerary Days */}
                <div className="space-y-4">
                  {itinerary?.days.map((day, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl border border-gray-200 p-6
                               hover:shadow-lg transition-all duration-300 animate-fade-in relative"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <TimelineIndicator 
                        day={day.day} 
                        isFirst={index === 0}
                        isLast={index === (itinerary.days.length - 1)}
                      />
                      <div className="ml-16 space-y-6">
                        {day.activities.map((activity, actIndex) => (
                          <div 
                            key={actIndex} 
                            className="group space-y-2 p-4 -mx-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-blue-600 font-medium shrink-0 w-20">{activity.time}</span>
                              <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                {activity.activity}
                              </span>
                            </div>
                            <div className="space-y-2 pl-[88px]">
                              <p className="text-sm text-gray-600">{activity.description}</p>
                              {activity.location && (
                                <p className="text-xs text-gray-500 flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  {activity.location}
                                </p>
                              )}
                              {activity.tips && (
                                <div className="mt-2">
                                  <div className="text-xs text-blue-600 flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{activity.tips}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Summary and Actions */}
          <div className="space-y-6">
            {/* Travel Tips Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Travel Tips</h2>
              <ul className="space-y-3">
                {itinerary?.additionalTips.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Budget Breakdown</h2>
              <div className="p-4 bg-blue-50 rounded-xl flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Estimated Cost</span>
                <span className="text-lg font-semibold text-blue-600">{itinerary?.estimatedBudget.total}</span>
              </div>
              <div className="space-y-3">
                {itinerary?.estimatedBudget.breakdown.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.category}</span>
                      <span className="text-blue-600">{item.amount}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                             transition-all duration-300 flex items-center justify-center gap-2
                             shadow-lg shadow-blue-600/20 hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Itinerary</span>
              </button>
              <button className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl
                             hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Customize Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`bg-gray-50 border-t border-gray-100 ${showResults ? 'animate-slide-up-fade' : ''}`} 
              style={{ animationDelay: '200ms' }}>
        <Footer />
      </footer>
    </div>
  );
} 