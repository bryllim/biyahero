import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="sticky top-4 z-50 mx-4 sm:mx-8">
      <nav className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="shrink-0">
                <Image
                  src="/biyahero_logo.png"
                  alt="BiyaHero Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
              <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-6">
                  <Link 
                    href="/" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="/experiences" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Experiences
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 shrink-0">
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
  );
} 