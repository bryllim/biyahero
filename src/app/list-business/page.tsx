'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { BusinessType, BusinessForm } from '@/types/business';

export default function ListBusinessPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessForm>({
    name: '',
    type: 'Restaurant',
    description: '',
    location: '',
    activities: [],
    priceRange: '$',
    contactInfo: {
      phone: '',
      email: '',
      website: '',
    },
    operatingHours: '',
    images: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/list-business/success');
  };

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Location & Hours" },
    { number: 3, title: "Contact Details" }
  ];

  const businessTypes: { value: BusinessType; label: string }[] = [
    { value: 'Hotel', label: 'Hotel / Resort' },
    { value: 'Restaurant', label: 'Restaurant / Cafe' },
    { value: 'Travel Agency', label: 'Travel Agency' },
    { value: 'Tour Guide', label: 'Tour Guide' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Activity Provider', label: 'Activity Provider' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">List Your Business</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our platform and showcase your business to travelers looking for authentic Philippine experiences.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between items-center max-w-md mx-auto mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="text-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${step.number <= currentStep 
                      ? 'bg-blue-600 text-white scale-110' 
                      : 'bg-gray-200 text-gray-600'}`}
                  >
                    {step.number}
                  </div>
                  <span className="block mt-2 text-xs text-gray-600">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 mx-2">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="animate-slide-up">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="Enter your business name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {businessTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({...formData, type: type.value})}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
                              ${formData.type === type.value 
                                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                : 'border-gray-200 hover:border-blue-200'}`}
                          >
                            <span className="font-medium block">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200 resize-none"
                        rows={4}
                        placeholder="Tell travelers about your business..."
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="Enter your business address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['$', '$$', '$$$'].map((price) => (
                          <button
                            key={price}
                            type="button"
                            onClick={() => setFormData({...formData, priceRange: price as '$' | '$$' | '$$$'})}
                            className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 
                              ${formData.priceRange === price 
                                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                : 'border-gray-200 hover:border-blue-200'}`}
                          >
                            <span className="block text-lg mb-1">{price}</span>
                            <span className="block text-xs text-gray-600">
                              {price === '$' ? 'Budget' : price === '$$' ? 'Mid-range' : 'Premium'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.operatingHours}
                        onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="e.g., Mon-Sun: 9AM-6PM"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.contactInfo.phone}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, phone: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="+63"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.contactInfo.email}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, email: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.contactInfo.website}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, website: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 
                                 transition-all duration-300 hover:border-blue-200"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Photos
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, images: e.target.files})}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl
                                   transition-all duration-300 hover:border-blue-200 cursor-pointer
                                   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                   file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600
                                   hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 text-blue-600 border border-blue-600 rounded-xl 
                             hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl 
                             hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl 
                             hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 