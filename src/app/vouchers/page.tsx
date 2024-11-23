'use client'

import { useState } from 'react';
import ProfileNavbar from '@/components/ProfileNavbar';
import { 
  TicketIcon, 
  GiftIcon, 
  SparklesIcon,
  ClockIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  BeakerIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

// Mock data for vouchers
const voucherData = [
  {
    id: 1,
    title: "₱500 Hotel Discount",
    description: "Get ₱500 off on your next hotel booking",
    points: 5000,
    category: "Hotels",
    expiresIn: "30 days",
    merchant: "Various Hotels",
    stock: 50,
    icon: BuildingStorefrontIcon
  },
  {
    id: 2,
    title: "Free Island Hopping Tour",
    description: "Complimentary island hopping tour for 2 persons",
    points: 8000,
    category: "Tours",
    expiresIn: "60 days",
    merchant: "Local Tour Operators",
    stock: 25,
    icon: BeakerIcon
  },
  {
    id: 3,
    title: "Restaurant Voucher",
    description: "₱300 worth of food and beverages",
    points: 3000,
    category: "Dining",
    expiresIn: "45 days",
    merchant: "Partner Restaurants",
    stock: 100,
    icon: ShoppingBagIcon
  }
];

const categories = ['All', 'Hotels', 'Tours', 'Dining', 'Transport'];
const sortOptions = ['Newest', 'Points: Low to High', 'Points: High to Low', 'Expiring Soon'];

export default function VouchersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [userPoints] = useState(12500); // Mock user points

  const handleRedeem = (voucherId: number, points: number) => {
    if (userPoints >= points) {
      console.log(`Redeeming voucher ${voucherId}`);
      // Add redemption logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header with Points Display */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Rewards & Vouchers
              </h1>
              <p className="text-gray-600 mt-1">
                Redeem your points for exclusive rewards
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
              <SparklesIcon className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-600">{userPoints.toLocaleString()} points</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {voucherData.map((voucher) => (
            <div 
              key={voucher.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <voucher.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{voucher.title}</h3>
                      <p className="text-sm text-gray-600">{voucher.merchant}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                    <TicketIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {voucher.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {voucher.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>Expires in {voucher.expiresIn}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowPathIcon className="w-4 h-4" />
                      <span>{voucher.stock} left</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(voucher.id, voucher.points)}
                    disabled={userPoints < voucher.points}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${userPoints >= voucher.points
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {userPoints >= voucher.points ? 'Redeem' : 'Insufficient Points'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {voucherData.length === 0 && (
          <div className="text-center py-12">
            <GiftIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No vouchers available</h3>
            <p className="text-gray-600">Check back later for new rewards</p>
          </div>
        )}
      </main>
    </div>
  );
} 