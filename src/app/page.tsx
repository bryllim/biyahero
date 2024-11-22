'use client'

import Image from "next/image";
import Link from 'next/link';

const experiences = [
  { 
    id: 1, 
    name: "Beaches", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: "Discover pristine white sand beaches and crystal-clear waters perfect for swimming, diving, and island hopping.",
    bgColor: "bg-blue-50",
    popularImage: "https://images.unsplash.com/photo-1551966775-8b8c7a8b7755", // Boracay image
    hiddenGemImage: "https://images.unsplash.com/photo-1597953601374-1ff2d5640c85" // Calaguas Islands image
  },
  { 
    id: 2, 
    name: "Mountains", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description: "Explore majestic peaks, trek through lush forests, and experience breathtaking views of the Philippine highlands.",
    bgColor: "bg-blue-50",
    popularImage: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg", // Mt. Pulag image
    hiddenGemImage: "https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg" // Mt. Ulap image
  },
  { 
    id: 3, 
    name: "Food", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    description: "Savor authentic Filipino cuisine, from street food adventures to traditional family recipes passed down generations.",
    bgColor: "bg-blue-50"
  },
  { 
    id: 4, 
    name: "Festivals", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    description: "Immerse yourself in vibrant cultural celebrations, colorful parades, and traditional Filipino festivities.",
    bgColor: "bg-blue-50"
  },
  { 
    id: 5, 
    name: "Shopping", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    description: "Browse modern malls, discover local markets, and find unique Filipino crafts and souvenirs.",
    bgColor: "bg-blue-50"
  },
  { 
    id: 6, 
    name: "Heritage", 
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "Visit historical landmarks, ancient churches, and museums showcasing the rich Filipino cultural heritage.",
    bgColor: "bg-blue-50"
  },
];

const navLinks = ["Home", "About", "Experiences", "Contact"];

export default function Home() {
  const handleExperienceClick = (experienceName: string) => {
    const experienceType = experienceName.toLowerCase();
    window.location.href = `/experiences/${experienceType}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Updated Floating Navbar with Auth Buttons */}
      <div className="sticky top-4 z-50 mx-4 sm:mx-8">
        <nav className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-blue-600">BiyaHero</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <button 
                      key={link} 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      {link}
                    </button>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <Link 
                    href="/login" 
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
                <button className="md:hidden text-2xl text-blue-600">☰</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center">
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 z-0 before:absolute before:inset-0 before:content-['']  before:bg-cover before:bg-center before:opacity-50 before:pointer-events-none" />

        {/* Gradient Overlay - White to Transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-90 z-10" />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 z-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(226 232 240) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Main Content */}
        <main className="relative z-30 flex-grow px-8 py-24 md:py-32 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Hero Section - Left Column */}
            <section className="space-y-10 animate-fade-in">
              {/* Hero Text */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
                  <p className="text-sm font-medium text-blue-600">
                    Your Gateway to Philippine Adventures
                  </p>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight leading-tight">
                  Experience the <span className="text-blue-600">Philippines</span>{" "}
                  like never before
                </h1>
                <p className="text-xl text-gray-600 max-w-xl font-light leading-relaxed">
                  Choose your adventure based on experiences, not just destinations.
                  Let us guide you to your perfect Philippine getaway.
                </p>
                
                {/* Developer Credits */}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50/50 backdrop-blur-sm rounded-full border border-gray-100">
                    <span className="text-xs text-gray-500">
                      Built for Hack the Future by{' '}
                      <span className="font-medium text-gray-700">
                        Bryl Lim, Carl Saginsin, Arjohn Capucion
                      </span>
                    </span>
                  </div>
                </div>
              </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm text-gray-600">Destinations</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">10k+</p>
                <p className="text-sm text-gray-600">Happy Travelers</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-600">Local Guides</p>
              </div>
            </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/signup"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl
                           hover:bg-blue-700 transition-all duration-300 transform hover:translate-y-[-2px]
                           shadow-lg shadow-blue-500/20"
                >
                  <span className="font-medium">Create Account</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/list-business"
                  className="group flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 
                           rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="font-medium">List Business</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Verified Locals</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Secure Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
              </div>
            </section>

            {/* Experience Cards - Right Column */}
            <section className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-10" />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experiences.map((exp, index) => (
                  <button
                    key={exp.id}
                    className="experience-card p-6 text-left animate-fade-in w-full cursor-pointer bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleExperienceClick(exp.name)}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="experience-icon inline-block text-4xl p-2 bg-blue-50 rounded-xl">
                          {exp.icon}
                        </span>
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.name}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div>
                <span className="text-xl font-bold text-blue-600">BiyaHero</span>
              </div>
              <p className="text-sm text-gray-600">
                Discover the Philippines through unique experiences.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Experiences</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Destinations</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Travel Guides</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Local Tips</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-gray-800 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Press</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Cookie Policy</li>
                <li className="hover:text-gray-800 cursor-pointer transition-colors">Sitemap</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} BiyaHero. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
