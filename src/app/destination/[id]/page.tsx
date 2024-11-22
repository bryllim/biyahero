'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchDestinationDetails } from '@/services/gemini'
import Footer from '@/components/Footer'

interface Activity {
  name: string;
  description: string;
}

interface CuisineItem {
  name: string;
  description: string;
}

interface DestinationDetails {
  name: string;
  description: string;
  bestTimeToVisit: {
    period: string;
    details: string;
  };
  activities: Activity[];
  cuisine: CuisineItem[];
  travelTips: string[];
  transportation: {
    howToGetThere: string;
    localTransport: string;
  };
  accommodation: {
    budget: string[];
    midRange: string[];
    luxury: string[];
  };
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1559494007-9f5847c49d94";

function DestinationSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-[400px] bg-gray-200 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function DestinationPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState<DestinationDetails | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadDestinationDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchDestinationDetails(params.id as string);
        setDestination(details as DestinationDetails);
      } catch (err) {
        console.error('Error loading destination:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDestinationDetails();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-4 z-50 mx-4 sm:mx-8">
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
      <div className="max-w-4xl mx-auto px-8 py-12">
        <DestinationSkeleton />
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-gray-600">Failed to load destination details</p>
        <Link 
          href="/experiences"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back
        </Link>
      </div>
    </div>
  );

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-4 z-50 mx-4 sm:mx-8">
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
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-12">
          {/* Hero Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden animate-fade-in">
            <img
              src={PLACEHOLDER_IMAGE}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
              <p className="text-lg text-white/90">{destination.description}</p>
            </div>
          </div>

          {/* Best Time to Visit */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-4 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-800">Best Time to Visit</h2>
            <div className="space-y-2">
              <p className="text-blue-600 font-medium">{destination.bestTimeToVisit.period}</p>
              <p className="text-gray-600">{destination.bestTimeToVisit.details}</p>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-semibold text-gray-800">Things to Do</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {destination.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg 
                           transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{activity.name}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Local Cuisine */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-semibold text-gray-800">Local Cuisine</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {destination.cuisine.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg 
                           transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Tips */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-4 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-800">Travel Tips</h2>
            <ul className="space-y-3">
              {destination.travelTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transportation */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-800">Getting There & Around</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">How to Get There</h3>
                <p className="text-gray-600">{destination.transportation.howToGetThere}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Local Transportation</h3>
                <p className="text-gray-600">{destination.transportation.localTransport}</p>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
            <h2 className="text-2xl font-semibold text-gray-800">Where to Stay</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Options</h3>
                <ul className="space-y-2">
                  {destination.accommodation.budget.map((place, index) => (
                    <li key={index} className="text-gray-600">{place}</li>
                  ))}
                </ul>
              </div>
              <div 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Mid-Range Options</h3>
                <ul className="space-y-2">
                  {destination.accommodation.midRange.map((place, index) => (
                    <li key={index} className="text-gray-600">{place}</li>
                  ))}
                </ul>
              </div>
              <div 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg 
                         transition-all duration-300 animate-slide-up"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">Luxury Options</h3>
                <ul className="space-y-2">
                  {destination.accommodation.luxury.map((place, index) => (
                    <li key={index} className="text-gray-600">{place}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 