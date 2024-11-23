import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';
import Image from 'next/image';
import TravelReceiptModal from './TravelReceiptModal';

interface TravelMapProps {
  user: User;
}

export default function TravelMapCard({ user }: TravelMapProps) {
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const visitedLocations = {
    'Siargao Islands': { cx: "652.55", cy: "855.00341" },
    'Banaue Rice Terraces': { cx: "290.31", cy: "219.65668" },
    'Chocolate Hills': { cx: "501.48", cy: "842.53835" },
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'instagram') => {
    const text = `I've visited ${user.visitedPlaces.length} amazing places in the Philippines! Check out my travel map on Biyahero.`;
    const url = window.location.href;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/` // Opens Instagram, users can share manually
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-900">Travel Map</h2>
        </div>
        
        <button 
          className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
          onClick={() => setIsReceiptModalOpen(true)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Share Travel Receipt
        </button>
      </div>
      
      <div className="relative">
        {/* Increased height with aspect ratio */}
        <div className="relative w-full aspect-[702/1209] h-[400px]">
          <Image
            src="/philippines.svg"
            alt="Philippines Map"
            fill
            className="object-contain"
            style={{ filter: 'opacity(0.1)' }}
          />
        </div>

        {/* Overlay for markers */}
        <div className="absolute inset-0">
          {Object.entries(visitedLocations).map(([location, coords]) => (
            <div
              key={location}
              className="absolute"
              style={{
                left: `${(parseInt(coords.cx) / 702) * 100}%`,
                top: `${(parseInt(coords.cy) / 1209) * 100}%`,
              }}
            >
              {/* Pulse animation */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                <div className="animate-ping absolute h-3 w-3 rounded-full bg-blue-200 opacity-75"></div>
                <div className="relative h-2 w-2 rounded-full bg-blue-500"></div>
              </div>
              
              {/* Label */}
              <div 
                className="absolute left-2 -top-2 whitespace-nowrap"
              >
                <span className="text-[10px] bg-white/90 text-gray-600 px-1.5 py-0.5 rounded-full shadow-sm">
                  {location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-gray-500">
          {user.visitedPlaces.length} places visited in the Philippines
        </span>
        <span className="text-[10px] text-gray-400">
          Share your travel map with friends
        </span>
      </div>

      {/* Add Modal */}
      <TravelReceiptModal 
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        user={user}
      />
    </div>
  );
} 