"use client"

const themes = [
  { id: "classic", name: "Classic", description: "This is your paragraph." },
  { id: "flat", name: "Flat", description: "This is your paragraph." },
  { id: "material", name: "Material", description: "This is your paragraph." },
  { id: "minimalistic", name: "Minimalistic", description: "This is your paragraph." },
  { id: "soft", name: "Soft", description: "This is your paragraph." },
]

const colorPalettes = [
  ["#8B4513", "#F5DEB3", "#1B365D", "#CD853F"],
  ["#FF69B4", "#E6E6FA", "#4B0082", "#FFD700"],
  ["#556B2F", "#FFFF00", "#FF4500", "#D3D3D3"],
  // Add more color combinations
]

function StyleCustomizationStep({ formData, updateFormData, onBack, onGenerate }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Style your future website</h1>
        <p className="text-gray-600">Play with fonts, colors, and styles to craft the look of your future website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center text-sm text-gray-500 mb-4">
            This is not the final website, but a mockup to preview its look and feel.
          </div>
          {/* Add preview content here */}
        </div>

        {/* Customization Section */}
        <div>
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-4">COLORS</h3>
            <div className="grid grid-cols-4 gap-2">
              {colorPalettes.map((palette, index) => (
                <div key={index} className="flex flex-wrap gap-1">
                  {palette.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        updateFormData({
                          selectedColors: [...formData.selectedColors, color],
                        })
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">THEMES</h3>
            <div className="space-y-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    formData.selectedTheme === theme.id ? "border-blue-500" : "hover:border-gray-300"
                  }`}
                  onClick={() => updateFormData({ selectedTheme: theme.id })}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{theme.name}</h4>
                      <p className="text-sm text-gray-500">{theme.description}</p>
                    </div>
                    <button className="px-4 py-1 bg-black text-white text-sm rounded">Button</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="px-6 py-2 border rounded-md hover:bg-gray-50">
          Back
        </button>
        <button onClick={onGenerate} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Generate
        </button>
      </div>

      {/* Progress Tabs */}
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between text-sm">
          <div className="text-gray-400">SITE TYPE</div>
          <div className="text-gray-400">SITE INFO</div>
          <div className="text-gray-400">PAGES</div>
          <div className="font-medium">COLORS & FONTS</div>
        </div>
      </div>
    </div>
  )
}

export default StyleCustomizationStep

