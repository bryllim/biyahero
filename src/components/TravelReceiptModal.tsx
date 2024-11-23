import { User, VisitedPlace } from '@/types/user';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TravelReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function TravelReceiptModal({ isOpen, onClose, user }: TravelReceiptModalProps) {
  if (!isOpen) return null;

  // Calculate some fun statistics
  const totalPlaces = user.visitedPlaces.length;
  const totalPhotos = user.visitedPlaces.reduce((acc, place) => acc + place.photos, 0);
  const totalReviews = user.visitedPlaces.reduce((acc, place) => acc + place.reviews, 0);
  
  const handleShare = (platform: 'facebook' | 'twitter' | 'instagram') => {
    const text = `🌟 Travel Achievement Unlocked! I've explored ${totalPlaces} amazing destinations in the Philippines with BiyaHero, captured ${totalPhotos} photos, and earned ${user.achievements?.totalPoints || 0} points! Join my adventure! ✈️`;
    const url = window.location.href;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/` // Opens Instagram, users can share manually
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  // Get current date for receipt
  const receiptDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl">
        {/* Receipt Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Travel Receipt</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="text-center space-y-1">
            <h3 className="font-bold text-lg">BiyaHero Travel Co.</h3>
            <p className="text-sm text-gray-500">Adventure Receipt</p>
            <p className="text-xs text-gray-400">{receiptDate}</p>
          </div>

          {/* Traveler Info */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Traveler:</p>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-400">Member since {user.joinedAt}</p>
          </div>

          {/* Dotted Line */}
          <div className="border-t border-dotted border-gray-200"></div>

          {/* Places Visited */}
          <div className="space-y-3">
            {user.visitedPlaces.map((place: VisitedPlace) => (
              <div key={place.id} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-blue-500" />
                  <span>{place.name}</span>
                </div>
                <span className="text-gray-500">{place.date}</span>
              </div>
            ))}
          </div>

          {/* Dotted Line */}
          <div className="border-t border-dotted border-gray-200"></div>

          {/* Travel Stats */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Places Visited</span>
              <span className="font-medium">{totalPlaces}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Photos Captured</span>
              <span className="font-medium">{totalPhotos}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reviews Written</span>
              <span className="font-medium">{totalReviews}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">
              ★ {user.achievements?.totalPoints || 0} Points
            </div>
            <p className="text-xs text-gray-400">
              Thank you for traveling with BiyaHero!
            </p>
          </div>
        </div>

        {/* Replace Share Button with Social Sharing Buttons */}
        <div className="p-6 border-t border-gray-100">
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-500">Share your travel receipt</p>
            
            <div className="grid grid-cols-3 gap-3">
              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 
                         bg-[#1877F2] text-white rounded-xl hover:bg-[#1864D9] 
                         transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 
                         bg-black text-white rounded-xl hover:bg-gray-800 
                         transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm font-medium">X</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleShare('instagram')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 
                         bg-gradient-to-br from-[#FF3366] to-[#FF9933] text-white 
                         rounded-xl hover:opacity-90 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm font-medium">Instagram</span>
              </button>
            </div>

            <p className="text-xs text-center text-gray-400">
              Share your travel achievements with friends and family
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 