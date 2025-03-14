import React, { useState } from 'react';
import { Search } from 'lucide-react';

function BusinessTypeStep({ formData, updateFormData, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const businessTypes = [
    { type: 'Real Estate', subtypes: ['Real Estate Agent', 'Real Estate Forum', 'Real Estate School', 'Real Estate Lawyer'] },
    { type: 'E-Commerce', subtypes: ['Online Store', 'Dropshipping', 'Handmade Goods', 'Clothing & Fashion'] },
    { type: 'Health & Wellness', subtypes: ['Fitness Trainer', 'Yoga Instructor', 'Mental Health Counselor', 'Nutritionist'] },
    { type: 'Technology', subtypes: ['Software Company', 'IT Consulting', 'App Development', 'Cybersecurity'] },
    { type: 'Local Business', subtypes: ['Restaurant', 'Cafe', 'Barbershop', 'Pet Grooming'] }
  ];

  // Filter business types based on search input
  const filteredSubtypes = businessTypes
    .flatMap((business) => business.subtypes.map((subtype) => ({ subtype, type: business.type })))
    .filter(({ subtype }) => subtype.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handle selection
  const handleSelect = (type, subtype) => {
    updateFormData({ businessType: type, businessSubtype: subtype });
    setSearchTerm(subtype); // Set input value to selected option
    setDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">What type of website are you creating?</h1>
        <p className="text-gray-600">This helps us guide your experience.</p>
      </div>

      {/* Search Input */}
      <div className="mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search business type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDropdownVisible(e.target.value.length > 0);
            }}
            onFocus={() => setDropdownVisible(searchTerm.length > 0)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>

        {/* Dropdown List */}
        {dropdownVisible && (
          <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
            {filteredSubtypes.length > 0 ? (
              filteredSubtypes.map(({ type, subtype }) => (
                <div
                  key={subtype}
                  onClick={() => handleSelect(type, subtype)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  {subtype} <span className="text-gray-500 text-xs">({type})</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-2">No results found.</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons (Always below the dropdown) */}
      <div className="mt-64">
        <div className="flex justify-between">
          <button onClick={onBack} className="px-6 py-2 border rounded-md hover:bg-gray-50">
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!formData.businessSubtype}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Progress Tabs (Always below the navigation buttons) */}
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-center gap-10 text-sm">
          <div className="font-medium">SITE TYPE</div>
          <div className="text-gray-400">SITE INFO</div>
        </div>
      </div>
    </div>
  );
}

export default BusinessTypeStep;
