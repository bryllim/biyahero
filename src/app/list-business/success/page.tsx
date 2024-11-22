'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ListingSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Business Successfully Listed!
          </h1>
          
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you for joining BiyaHero! Our team will review your listing and get back to you within 24-48 hours.
          </p>

          <div className="flex justify-center gap-4 pt-6">
            <Link 
              href="/"
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50"
            >
              Return Home
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 