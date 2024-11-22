import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xl font-bold text-blue-600">BiyaHero</span>
          <div className="flex items-center gap-8">
            <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} BiyaHero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 