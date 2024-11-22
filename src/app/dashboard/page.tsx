'use client'

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const mockBusinessData = {
  name: "Sample Business",
  type: "Restaurant",
  status: "pending",
  stats: {
    views: {
      count: 245,
      trend: '+12.5%',
      isPositive: true
    },
    inquiries: {
      count: 12,
      trend: '+5.2%',
      isPositive: true
    },
    bookings: {
      count: 8,
      trend: '-2.1%',
      isPositive: false
    }
  },
  recentActivity: [
    { 
      type: 'view',
      message: 'Someone viewed your business',
      time: '2 minutes ago',
      icon: (
        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    { 
      type: 'inquiry',
      message: 'New inquiry received',
      time: '1 hour ago',
      icon: (
        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      type: 'booking',
      message: 'New booking confirmed',
      time: '3 hours ago',
      icon: (
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      type: 'review',
      message: 'New 5-star review received',
      time: '1 day ago',
      icon: (
        <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
  ],
  analytics: {
    weeklyViews: [120, 145, 160, 180, 165, 190, 245],
    topSources: [
      { name: 'Direct Search', value: 45, color: 'bg-blue-600' },
      { name: 'Experience Page', value: 30, color: 'bg-purple-600' },
      { name: 'Recommendations', value: 25, color: 'bg-green-600' },
    ]
  }
};

// Fixed mock chat data with proper string escaping
const mockChatData = {
  messages: [
    { 
      id: 1,
      sender: 'guest',
      name: 'John Smith',
      message: "Hi, I'm interested in booking for next weekend. Do you have availability?",
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'business',
      message: 'Hello John! Yes, we do have availability for next weekend. How many people will be in your group?',
      time: '10:31 AM'
    },
    {
      id: 3,
      sender: 'guest',
      name: 'John Smith',
      message: "We'll be a group of 4 adults. What's your best rate?",
      time: '10:33 AM'
    },
    {
      id: 4,
      sender: 'business',
      message: 'For a group of 4, we can offer our special weekend package at ₱3,500 per person. This includes breakfast and access to all amenities.',
      time: '10:34 AM'
    }
  ]
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showNotifications, setShowNotifications] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const timeRanges = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Add message handling logic here
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                  {mockBusinessData.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{mockBusinessData.type}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                 bg-yellow-100 text-yellow-800 animate-pulse">
                    {mockBusinessData.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors group"
                  >
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white">3</span>
                    </div>
                    <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 
                                  py-2 z-50 animate-slideDown">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                      </div>
                      {mockBusinessData.recentActivity.slice(0, 3).map((activity, index) => (
                        <div key={index} 
                             className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg shrink-0">
                              {activity.icon}
                            </div>
                            <div>
                              <p className="text-sm text-gray-800">{activity.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                                 transition-all duration-300 transform hover:-translate-y-0.5
                                 active:translate-y-0 shadow-md hover:shadow-lg">
                  Edit Business
                </button>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex justify-end">
              <div className="inline-flex bg-white rounded-xl p-1 border border-gray-200">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedTimeRange(range.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      ${selectedTimeRange === range.value 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Chat Column */}
              <div className="lg:col-span-4 flex flex-col h-[800px] border border-gray-200 rounded-2xl overflow-hidden 
                            hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">Live Chat</h2>
                      <p className="text-sm text-gray-500 mt-1">3 unread messages</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Online</span>
                    </div>
                  </div>
                </div>
                
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 custom-scrollbar">
                  {mockChatData.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'business' ? 'items-end' : 'items-start'
                      } animate-slideUpFade`}
                    >
                      {msg.sender === 'guest' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {msg.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{msg.name}</span>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl shadow-sm
                          ${msg.sender === 'business'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-100 rounded-tl-none'
                          }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <span 
                          className={`text-xs mt-2 block ${
                            msg.sender === 'business' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 
                                 focus:ring-blue-100 transition-all duration-300 hover:border-blue-200"
                      />
                      <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                                 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                      <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <span className="flex-1"></span>
                      <span className="text-xs text-gray-400">Press Enter to send</span>
                    </div>
                  </form>
                </div>
              </div>

              {/* Main Dashboard Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(mockBusinessData.stats).map(([key, stat], index) => (
                    <div 
                      key={key} 
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-200 
                                transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600 capitalize">{key}</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {stat.count}
                            </p>
                            <span className={`text-sm font-medium flex items-center gap-1
                              ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              <svg className={`w-3 h-3 transform ${stat.isPositive ? 'rotate-0' : 'rotate-180'}`} 
                                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              {stat.trend}
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                          key === 'views' ? 'bg-blue-50 text-blue-600' :
                          key === 'inquiries' ? 'bg-purple-50 text-purple-600' :
                          'bg-green-50 text-green-600'
                        }`}>
                          {key === 'views' && (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                          {key === 'inquiries' && (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          )}
                          {key === 'bookings' && (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity and Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-200 
                                transition-all duration-300 hover:shadow-lg">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {mockBusinessData.recentActivity.map((activity, index) => (
                        <div 
                          key={index} 
                          className="p-6 flex items-center justify-between hover:bg-gray-50 
                                 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                              {activity.icon}
                            </div>
                            <div className="text-sm text-gray-800">{activity.message}</div>
                          </div>
                          <div className="text-sm text-gray-500">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analytics Section */}
                  <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-200 
                                transition-all duration-300 hover:shadow-lg">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-800">Traffic Sources</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {mockBusinessData.analytics.topSources.map((source, index) => (
                          <div key={index} className="space-y-2 group">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                                {source.name}
                              </span>
                              <span className="font-medium text-gray-800">{source.value}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${source.color} transition-all duration-1000 ease-out
                                          transform origin-left scale-x-0 animate-growWidth`}
                                style={{ 
                                  width: `${source.value}%`,
                                  animationDelay: `${index * 200}ms`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 