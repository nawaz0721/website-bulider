"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

function CreateWordPressModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    location: "council-bluffs",
    siteTitle: "",
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentStep(1);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCurrentStep(2);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCurrentStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  const navigate = useNavigate()

  return (
    <div className={`fixed inset-0 w-full bg-opacity-50 flex items-center justify-center z-50 ${darkMode ? "bg-black" : "bg-gray-200"}`}>
      <div className={`rounded-lg p-6 w-full max-w-md relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✖
        </button>
          <>
            <h2 className="text-2xl font-bold mb-2">Create a New WordPress Website</h2>
            <p className="text-gray-600 dark:text-gray-400">Build your website with AI or custom setup.</p>
            <form onSubmit={()=>{navigate("/templates")}} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Choose Location</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.location}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                >
                  {["Council Bluffs, USA", "The Dalles, USA", "London, UK", "Mumbai, India", "Sydney, Australia"].map((loc) => (
                    <option key={loc} value={loc.toLowerCase().replace(/\s+/g, "-")}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Site Title</label>
                <input
                  type="text"
                  placeholder="My Website"
                  className="w-full p-2 border rounded-md"
                  value={formData.siteTitle}
                  onChange={(e) => updateFormData({ siteTitle: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" variant="outline"
        className="h-8 border-black hover:text-white hover:bg-black bg-white text-black w-full ">
                Next
              </Button>
            </form>
          </>
      </div>
    </div>
  );
}

export default CreateWordPressModal;