import Link from 'next/link';
import Image from 'next/image';
import { 
  UserCircleIcon, 
  TrophyIcon, 
  TicketIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

export default function ProfileNavbar() {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/biyahero_logo.png"
                alt="BiyaHero Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/leaderboard" 
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <TrophyIcon className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link 
              href="/vouchers" 
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <TicketIcon className="w-5 h-5" />
              <span>Vouchers</span>
            </Link>
            
            <Link 
              href="/profile/settings" 
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              <UserCircleIcon className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 