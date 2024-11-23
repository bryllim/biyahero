'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateItinerary } from '@/services/gemini';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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

function LoadingScreen({ retryCount }: { retryCount: number }) {
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
        <p className="text-gray-600 animate-pulse">
          {retryCount > 0 
            ? `Retrying to generate itinerary... (Attempt ${retryCount})` 
            : 'Generating your personalized itinerary...'}
        </p>
      </div>
    </div>
  );
}

// Mock data for recommended small businesses
const mockRecommendations = {
  restaurants: [
    {
      id: 1,
      name: "Aling Maria's Carinderia",
      type: "Local Eatery",
      rating: 4.8,
      priceRange: "$",
      description: "Authentic Filipino home-cooked meals",
      location: "Poblacion, Makati",
      image: "https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg",
      tags: ["Local Favorite", "Budget Friendly"]
    },
    {
      id: 2,
      name: "Casa Verde Garden Cafe",
      type: "Cafe",
      rating: 4.6,
      priceRange: "$$",
      description: "Farm-to-table Filipino fusion cuisine",
      location: "Tagaytay",
      image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      tags: ["Organic", "Family Owned"]
    }
  ],
  accommodations: [
    {
      id: 3,
      name: "Bahay Kubo Resort",
      type: "Homestay",
      rating: 4.7,
      priceRange: "$$",
      description: "Traditional Filipino homestay experience",
      location: "Batangas",
      image: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg",
      tags: ["Local Host", "Cultural Experience"]
    },
    {
      id: 4,
      name: "Vista Beach Cottages",
      type: "Beach Resort",
      rating: 4.5,
      priceRange: "$",
      description: "Family-run beachfront cottages",
      location: "Puerto Galera",
      image: "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg",
      tags: ["Beachfront", "Family Owned"]
    }
  ],
  activities: [
    {
      id: 5,
      name: "Juan's Island Hopping",
      type: "Tour Service",
      rating: 4.9,
      priceRange: "$$",
      description: "Personalized island hopping tours",
      location: "Coron, Palawan",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
      tags: ["Local Guide", "Small Group"]
    },
    {
      id: 6,
      name: "Mountain Brew Coffee",
      type: "Coffee Farm Tour",
      rating: 4.7,
      priceRange: "$",
      description: "Local coffee farm tours and tasting",
      location: "Sagada",
      image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg",
      tags: ["Family Owned", "Educational"]
    }
  ]
};

export default function GenerateItineraryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [error, setError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    const generateTripItinerary = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const destination = searchParams.get('destination');
        if (!destination) {
          throw new Error('No destination selected');
        }

        const params = {
          destination,
          startDate: searchParams.get('startDate') || '',
          duration: searchParams.get('duration') || '',
          budget: searchParams.get('budget') || '',
          travelStyle: searchParams.get('travelStyle') || '',
          groupSize: searchParams.get('groupSize') || '',
          otherPreferences: searchParams.get('otherPreferences') || '',
          preferences: {
            accommodation: 'mid-range',
            transportation: 'public',
            food: 'local'
          }
        };

        try {
          const preferencesStr = searchParams.get('preferences');
          if (preferencesStr) {
            const parsedPreferences = JSON.parse(preferencesStr);
            params.preferences = {
              ...params.preferences,
              ...parsedPreferences
            };
          }
        } catch (jsonError) {
          console.error('Error parsing preferences JSON:', jsonError);
        }

        const result = await generateItinerary(params);
        
        if (!isMounted) return;
        
        setItinerary(result);
        setLoading(false);
        setShowResults(true);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error generating itinerary:', err);
        if (isMounted) {
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
            retryTimeout = setTimeout(generateTripItinerary, 3000); // Retry after 3 seconds
          } else {
            setError(true);
            setLoading(false);
          }
        }
      }
    };

    generateTripItinerary();

    return () => {
      isMounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [searchParams]);

  const renderBusinessCard = (business: any, index: number) => (
    <div 
      key={`${business.id}-${index}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 
                transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
    >
      <div className="relative h-48">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{business.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{business.name}</h3>
          <span className="text-sm text-gray-600">{business.priceRange}</span>
        </div>
        <p className="text-sm text-gray-600">{business.type}</p>
        <p className="text-sm text-gray-600">{business.description}</p>
        <div className="flex items-center gap-2 pt-2">
          {business.tags.map((tag: string, tagIndex: number) => (
            <span 
              key={`${business.id}-tag-${tagIndex}`}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingScreen retryCount={retryCount} />;
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
          <p className="text-gray-600">We couldn't generate your itinerary after multiple attempts.</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                setRetryCount(0);
                setError(false);
                setLoading(true);
              }}
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
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Support Local Businesses Column */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Support Local Businesses
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-3 space-y-4">
                  {/* Restaurants Section */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2 px-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Where to Eat
                    </h3>
                    <div className="space-y-3">
                      {mockRecommendations.restaurants.map((business, index) => 
                        renderBusinessCard(business, index)
                      )}
                    </div>
                  </div>

                  {/* Accommodations Section */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2 px-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Where to Stay
                    </h3>
                    <div className="space-y-3">
                      {mockRecommendations.accommodations.map((business, index) => 
                        renderBusinessCard(business, index)
                      )}
                    </div>
                  </div>

                  {/* Activities Section */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2 px-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What to Do
                    </h3>
                    <div className="space-y-3">
                      {mockRecommendations.activities.map((business, index) => 
                        renderBusinessCard(business, index)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Itinerary Content */}
          <div className="col-span-6 space-y-4">
            {itinerary && (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h1 className="text-xl font-bold text-gray-800 mb-3">{itinerary.title}</h1>
                  <p className="text-gray-600 text-sm">{itinerary.overview}</p>
                </div>

                {/* Itinerary Days */}
                <div className="space-y-4">
                  {itinerary.days.map((day, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="relative pl-12">
                        <TimelineIndicator 
                          day={day.day} 
                          isFirst={index === 0}
                          isLast={index === itinerary.days.length - 1}
                        />
                        
                        <div className="space-y-4">
                          {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-500">
                                  {activity.time}
                                </span>
                                <h3 className="text-base font-semibold text-gray-800">
                                  {activity.activity}
                                </h3>
                              </div>
                              
                              <p className="text-sm text-gray-600 pl-16">
                                {activity.description}
                              </p>

                              {activity.location && (
                                <div className="pl-16 flex items-center gap-2 text-xs text-gray-500">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  <span>{activity.location}</span>
                                </div>
                              )}

                              {activity.tips && (
                                <div className="pl-16">
                                  <div className="text-xs text-blue-600 flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                                    <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{activity.tips}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Budget and Tips Column */}
          <div className="col-span-3">
            <div className="sticky top-24 space-y-4">
              {itinerary && (
                <>
                  {/* Budget Section */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Estimated Budget</h2>
                    <div className="space-y-3">
                      <p className="text-base font-medium text-gray-800">
                        Total: <span className="text-blue-600">{itinerary.estimatedBudget.total}</span>
                      </p>
                      <div className="space-y-2">
                        {itinerary.estimatedBudget.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.category}</p>
                              <p className="text-xs text-gray-600">{item.details}</p>
                            </div>
                            <span className="text-sm font-medium text-gray-800">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Travel Tips */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Travel Tips</h2>
                    <ul className="space-y-2">
                      {itinerary.additionalTips.map((tip, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                          <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Buttons */}
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg 
                                     hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download PDF</span>
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg 
                                     hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>Share Itinerary</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 