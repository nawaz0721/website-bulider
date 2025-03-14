"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ConvertSite() {
  const [url, setUrl] = useState("")
  const [ownsDomain, setOwnsDomain] = useState(null)
  const [domainName, setDomainName] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ url, ownsDomain, domainName })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold mb-4">Start creating with AI</h1>
            <p className="text-gray-600 mb-8">
              Any web page you see on the web can become your homepage. Insert the URL to recreate its layout and design
              elements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div>
                <input
                  type="url"
                  placeholder="Insert URL to recreate"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Domain Question */}
              <div className="space-y-3">
                <p className="font-medium">Do you own a domain for your website?</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOwnsDomain(true)}
                    className={`px-6 py-2 rounded-md transition-colors ${
                      ownsDomain === true ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwnsDomain(false)}
                    className={`px-6 py-2 rounded-md transition-colors ${
                      ownsDomain === false ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Conditional Domain Input */}
              {ownsDomain === false && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter the desired domain name"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Proceed
              </button>
            </form>
          </div>

          {/* Right Column - Preview */}
          <div className="relative hidden lg:block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-I0fuyqjpHLh1CRSgL2RMT7oO3GHDi1.png"
              alt="Website preview with annotations"
              className="w-full h-auto"
            />

            {/* Annotation Labels */}
            <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-2">Website Elements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Header Section
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Color Palette
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Font Family
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Footer
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button - Maintained from Dashboard */}
      <div className="fixed bottom-6 right-6">
        <button className="h-14 w-14 rounded-full bg-gray-800 hover:bg-gray-700 shadow-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ConvertSite

