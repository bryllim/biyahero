import { MapPinIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';
import Image from 'next/image';

interface TravelMapProps {
  user: User;
}

export default function TravelMapCard({ user }: TravelMapProps) {
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

        {/* Social Share Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => handleShare('facebook')}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
            title="Share on Facebook"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
            </svg>
          </button>
          <button 
            onClick={() => handleShare('twitter')}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 transition-colors"
            title="Share on X (Twitter)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button 
            onClick={() => handleShare('instagram')}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-pink-600 transition-colors"
            title="Share on Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
        </div>
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
    </div>
  );
} 