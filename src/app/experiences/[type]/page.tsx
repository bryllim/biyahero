'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { destinationData } from '@/data/destinations'
import type { Destination, ExperienceData } from '@/data/destinations'

type SortOption = 'name' | 'rating' | 'price';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1559494007-9f5847c49d94";

function Loader() {
  const loadingTexts = [
    "Discovering hidden gems...",
    "Finding local favorites...",
    "Exploring unique experiences...",
    "Curating the best spots..."
  ];

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full mx-4 space-y-8">
        <div className="space-y-6 text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full 
                          animate-[spin_1s_linear_infinite] border-t-transparent"></div>
            <div className="absolute inset-2 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-2 border-4 border-blue-600 rounded-full 
                          animate-[spin_2s_linear_infinite] border-t-transparent"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-800 animate-pulse min-h-[28px] transition-all duration-300">
              {loadingTexts[textIndex]}
            </p>
            <p className="text-sm text-gray-600">
              Finding the perfect destinations for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-6 bg-white rounded-2xl p-12 border border-gray-100">
      <div className="p-4 bg-red-50 rounded-full">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">Something went wrong</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't load the destinations. Please try again later.
        </p>
      </div>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                   transition-colors duration-300 shadow-lg shadow-blue-500/20"
      >
        Go Back Home
      </Link>
    </div>
  );
}

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  const router = useRouter();

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100
                 hover:shadow-lg transition-all duration-500 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={PLACEHOLDER_IMAGE}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"/>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 
                         transition-colors duration-300">
              {destination.name}
            </h3>
            <p className="text-sm text-gray-600">
              {destination.location}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 min-h-[60px] line-clamp-3 group-hover:line-clamp-none
                     transition-all duration-300">
          {destination.description.length > 150 
            ? `${destination.description.substring(0, 150)}...` 
            : destination.description}
        </p>

        <button
          onClick={() => router.push(`/destination/${destination.id}`)}
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700
                     bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-300
                     flex items-center justify-center gap-2"
        >
          View More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DestinationCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="h-40 bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const params = useParams();
  const experienceType = params.type as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ExperienceData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isMapView, setIsMapView] = useState(false);

  useEffect(() => {
    const simulateLoading = async () => {
      try {
        setLoading(true);
        setError(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const experienceData = destinationData[experienceType as keyof typeof destinationData];
        
        if (!experienceData) {
          throw new Error('Experience type not found');
        }
        
        setData(experienceData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    simulateLoading();
  }, [experienceType]);

  const filterDestinations = (destinations: Destination[]) => {
    return destinations.filter(dest => 
      (dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       dest.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedFilter === 'all' || 
       (selectedFilter === 'budget' && dest.priceRange === '$') ||
       (selectedFilter === 'mid' && dest.priceRange === '$$') ||
       (selectedFilter === 'luxury' && dest.priceRange === '$$$'))
    );
  };

  if (loading) return <Loader />;
  if (error) return <ErrorState />;
  if (!data) return null;

  const popularDestinations = filterDestinations(data.popular || []);
  const alternativeDestinations = filterDestinations(data.alternatives || []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {loading && <Loader />}
      
      {/* Floating Navbar */}
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
                <button className="md:hidden text-2xl text-blue-600">☰</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
        {!loading && (
          <>
            {/* Header Section */}
            <div className="mb-12 space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
                <p className="text-sm font-medium text-blue-600">
                  {experienceType.charAt(0).toUpperCase() + experienceType.slice(1)} Experience
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                Discover Amazing {experienceType.charAt(0).toUpperCase() + experienceType.slice(1)}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                From popular destinations to hidden gems, explore the best {experienceType} experiences 
                the Philippines has to offer.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search destinations or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none 
                               focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                    <svg 
                      className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMapView(false)}
                    className={`p-3 rounded-xl transition-colors ${!isMapView 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsMapView(true)}
                    className={`p-3 rounded-xl transition-colors ${isMapView 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content View */}
            {isMapView ? (
              <div className="bg-white rounded-2xl p-8 h-[600px] flex items-center justify-center border border-gray-200">
                <p className="text-gray-600">Map view coming soon...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Hidden Gems Section */}
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          Hidden Gems
                        </h2>
                        <p className="text-sm text-gray-600">
                          Discover these lesser-known spots for a more authentic experience
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                      Array(8).fill(0).map((_, index) => (
                        <DestinationCardSkeleton key={index} />
                      ))
                    ) : (
                      alternativeDestinations.map((item, index) => (
                        <DestinationCard key={item.id} destination={item} index={index} />
                      ))
                    )}
                  </div>
                </div>

                {/* Popular Destinations Section */}
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          Popular Destinations
                        </h2>
                        <p className="text-sm text-gray-600">
                          Well-known destinations loved by many travelers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {popularDestinations.map((item, index) => (
                      <DestinationCard key={item.id} destination={item} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} BiyaHero. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 