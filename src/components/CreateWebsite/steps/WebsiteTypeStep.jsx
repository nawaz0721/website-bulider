"use client"

function WebsiteTypeStep({ formData, updateFormData, onNext }) {
  const handleTypeSelect = (type) => {
    updateFormData({ websiteType: type })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <span className="text-blue-600 text-3xl inline-block mb-4">✨</span>
        <h1 className="text-4xl font-bold mb-4">
          Let's start creating
          <br />
          your website with AI
        </h1>
        <p className="text-gray-600">
          Answer a few questions and our AI will generate a personalized website with tailored content and images.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block p-4 rounded-lg border hover:border-blue-500 cursor-pointer">
          <input
            type="radio"
            name="websiteType"
            className="mr-3"
            checked={formData.websiteType === "informational"}
            onChange={() => handleTypeSelect("informational")}
          />
          I want to create an informational website
        </label>

        <label className="block p-4 rounded-lg border hover:border-blue-500 cursor-pointer">
          <input
            type="radio"
            name="websiteType"
            className="mr-3"
            checked={formData.websiteType === "ecommerce"}
            onChange={() => handleTypeSelect("ecommerce")}
          />
          I want to create a website with an online store
        </label>
      </div>

      <div className="mt-8">
        <button
          onClick={onNext}
          disabled={!formData.websiteType}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default WebsiteTypeStep

