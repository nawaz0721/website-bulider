"use client"
import { useState } from "react";

function SiteInfoStep({ formData, updateFormData, onNext, onBack }) {
  const [showWarning, setShowWarning] = useState(false);

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    updateFormData({ companyDescription: description });
    setShowWarning(description.length > 0 && description.length < 20);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">What's your site about?</h1>
        <p className="text-gray-600">Add details about your brand or experience.</p>
      </div>

      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Enter company name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="CompanyName"
          />
        </div>

        {/* Company Description */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            Describe your company
          </label>
          <textarea
            value={formData.companyDescription}
            onChange={handleDescriptionChange}
            className="w-full p-2 border rounded-md h-32"
            placeholder="Ex. A mobile app for students to track their energy consumption and the percentage sourced from renewables."
          />
          {showWarning && (
            <p className="text-red-500 text-xs mt-1">To get better results, input no less than 20 symbols.</p>
          )}
        </div>

        {/* Domain Question */}
        <div>
          <p className="font-medium mb-2">Do you own a domain for your website?</p>
          <div className="flex gap-3">
            <button
              onClick={() => updateFormData({ hasDomain: true })}
              className={`px-6 py-2 rounded-md ${
                formData.hasDomain === true ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => updateFormData({ hasDomain: false })}
              className={`px-6 py-2 rounded-md ${
                formData.hasDomain === false ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="px-6 py-2 border rounded-md hover:bg-gray-50">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.companyName || formData.companyDescription.length < 20 || formData.hasDomain === null}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Generate
        </button>
      </div>

      {/* Progress Tabs */}
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-center gap-10 text-sm">
          <div className="text-gray-400">SITE TYPE</div>
          <div className="font-medium">SITE INFO</div>
        </div>
      </div>
    </div>
  );
}

export default SiteInfoStep;
