'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { destinationData } from '@/data/destinations'
import type { Destination, ExperienceData } from '@/data/destinations'
import PlaceholderImage from '@/components/PlaceholderImage'
import Navbar from '@/components/Navbar'

type Filters = {
  location: string;
  bestTime: string;
  priceRange: string;
};

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  const router = useRouter();

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100
                 hover:shadow-lg transition-all duration-500 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 overflow-hidden">
        <PlaceholderImage />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600">
            {destination.name}
          </h3>
          <p className="text-sm text-gray-600">{destination.location}</p>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {destination.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/destination/${destination.id}`)}
            className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 
                     bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex 
                     items-center justify-between"
          >
            <span>See Details</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => router.push(`/plan/${destination.id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                     hover:bg-blue-700 rounded-lg inline-flex items-center 
                     justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Plan
          </button>
        </div>
      </div>
    </div>
  );
}

const SelectWrapper = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string; }>
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 appearance-none bg-white border border-gray-200 
                 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300
                 pr-10 cursor-pointer hover:border-gray-300 transition-colors"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-400" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  </div>
);

export default function ExperiencePage() {
  const params = useParams();
  const experienceType = params.type as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ExperienceData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMapView, setIsMapView] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    bestTime: '',
    priceRange: ''
  });

  useEffect(() => {
    try {
      const experienceData = destinationData[experienceType as keyof typeof destinationData];
      if (!experienceData) {
        throw new Error('Experience type not found');
      }
      setData(experienceData);
    } catch (err) {
      setError(true);
    }
  }, [experienceType]);

  const filterDestinations = (destinations: Destination[]) => {
    return destinations.filter(dest => {
      const matchesSearch = !searchTerm || 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !filters.location || 
        dest.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesBestTime = !filters.bestTime || 
        dest.bestTime.toLowerCase().includes(filters.bestTime.toLowerCase());

      const matchesPriceRange = !filters.priceRange || 
        !('priceRange' in dest) || 
        dest.priceRange === filters.priceRange;

      return matchesSearch && matchesLocation && matchesBestTime && matchesPriceRange;
    });
  };

  const getLocationOptions = () => {
    if (!data) return [];
    return Array.from(new Set(
      [...data.popular, ...data.alternatives].map(dest => dest.location)
    )).sort();
  };

  const filterSection = data && (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SelectWrapper
        label="Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        options={[
          { value: '', label: 'All Locations' },
          ...getLocationOptions().map(location => ({
            value: location,
            label: location
          }))
        ]}
      />

      <SelectWrapper
        label="Best Time to Visit"
        value={filters.bestTime}
        onChange={(e) => setFilters({ ...filters, bestTime: e.target.value })}
        options={[
          { value: '', label: 'Any Time' },
          { value: 'january', label: 'January' },
          { value: 'february', label: 'February' },
          { value: 'march', label: 'March' },
          { value: 'april', label: 'April' },
          { value: 'may', label: 'May' },
          { value: 'june', label: 'June' },
          { value: 'july', label: 'July' },
          { value: 'august', label: 'August' },
          { value: 'september', label: 'September' },
          { value: 'october', label: 'October' },
          { value: 'november', label: 'November' },
          { value: 'december', label: 'December' }
        ]}
      />

      <SelectWrapper
        label="Price Range"
        value={filters.priceRange}
        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
        options={[
          { value: '', label: 'Any Price' },
          { value: '$', label: 'Budget ($)' },
          { value: '$$', label: 'Mid-Range ($$)' },
          { value: '$$$', label: 'Luxury ($$$)' }
        ]}
      />
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Failed to load destinations</p>
          <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const popularDestinations = filterDestinations(data.popular || []);
  const alternativeDestinations = filterDestinations(data.alternatives || []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Add Filter Section */}
        {filterSection}

        {/* Destinations Grid */}
        <div className="space-y-8">
          {alternativeDestinations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Hidden Gems</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {alternativeDestinations.map((item, index) => (
                  <DestinationCard key={item.id} destination={item} index={index} />
                ))}
              </div>
            </div>
          )}

          {popularDestinations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Popular Destinations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularDestinations.map((item, index) => (
                  <DestinationCard key={item.id} destination={item} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} BiyaHero. All rights reserved.
      </footer>
    </div>
  );
} 