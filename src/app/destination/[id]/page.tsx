'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchDestinationDetails } from '@/services/gemini'
import Footer from '@/components/Footer'
import PlaceholderImage from '@/components/PlaceholderImage'

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
      <div className="w-full">
        {/* Content Container - moved up */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Hero Image Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-8">
            <div className="h-[400px] relative">
              <PlaceholderImage />
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{destination?.name}</h1>
              <p className="text-xl text-gray-600">{destination?.description}</p>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Activities Section */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Things to Do</h2>
                </div>
                <div className="grid gap-4">
                  {destination?.activities.map((activity, index) => (
                    <div 
                      key={index}
                      className="p-6 border border-gray-100 rounded-xl hover:border-blue-200 
                               transition-colors duration-300"
                    >
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {activity.name}
                      </h3>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local Cuisine Section */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Local Cuisine</h2>
                </div>
                <div className="grid gap-4">
                  {destination?.cuisine.map((item, index) => (
                    <div 
                      key={index}
                      className="p-6 border border-gray-100 rounded-xl hover:border-blue-200 
                               transition-colors duration-300"
                    >
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation Section */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Getting There & Around</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">How to Get There</h3>
                    <p className="text-gray-600">{destination?.transportation.howToGetThere}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Local Transportation</h3>
                    <p className="text-gray-600">{destination?.transportation.localTransport}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8 lg:sticky" style={{ top: "calc(1rem + 100px)" }}>
              {/* Best Time to Visit Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Best Time to Visit</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-blue-600 font-medium">{destination?.bestTimeToVisit.period}</p>
                  </div>
                  <p className="text-gray-600">{destination?.bestTimeToVisit.details}</p>
                </div>
              </div>

              {/* Travel Tips Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Travel Tips</h2>
                <ul className="space-y-3">
                  {destination?.travelTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accommodation Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Where to Stay</h2>
                <div className="space-y-6">
                  {[
                    { title: "Budget", options: destination?.accommodation.budget },
                    { title: "Mid-Range", options: destination?.accommodation.midRange },
                    { title: "Luxury", options: destination?.accommodation.luxury }
                  ].map((category, index) => (
                    <div key={index}>
                      <h3 className="text-base font-medium text-gray-800 mb-2">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.options?.map((place, placeIndex) => (
                          <li key={placeIndex} className="text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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