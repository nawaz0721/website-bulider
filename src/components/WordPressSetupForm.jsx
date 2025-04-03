"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function WordPressSetupModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    siteTitle: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Password Strength Checker
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 8) return "Medium";
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost/install.php", {  // Replace with live URL if needed
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      const result = true
      if (result) {
          navigate("/wordprestemplatedetails");
      }

      // const result = await response.json();
  

      // if (result.status === "success") {
      //   alert("WordPress Installed Successfully!");
      //   navigate("/wordprestemplatedetails");
      // } else {
      //   alert("Error: " + result.message);
      // }
    } catch (error) {
      console.error("Installation Error:", error);
      alert("Failed to install WordPress.");
    }
  };
  

  return (
    isOpen && (
      <div
        className={`fixed inset-0 w-full bg-opacity-50 flex items-center justify-center z-50 ${
          darkMode ? "bg-black" : "bg-gray-200"
        }`}
      >
        <div
          className={`rounded-lg p-6 w-full max-w-md relative ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
          <>
            <h2 className="text-2xl font-bold mb-2">WordPress Setup</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete the setup process for your WordPress site.
            </p>
            <form
             onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Site Title
                </label>
                <input
                  type="text"
                  placeholder="My WordPress Site"
                  className="w-full p-2 border rounded-md"
                  value={formData.siteTitle}
                  onChange={(e) =>
                    updateFormData({ siteTitle: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your username"
                  className="w-full p-2 border rounded-md"
                  value={formData.username}
                  onChange={(e) =>
                    updateFormData({ username: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-sm text-blue-600"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    getPasswordStrength(password) === "Weak"
                      ? "text-red-600"
                      : getPasswordStrength(password) === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {password ? getPasswordStrength(password) : "Enter a password"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                className="h-8 border-black hover:text-white hover:bg-black bg-white text-black w-full"
              >
                Install WordPress
              </Button>
            </form>
          </>
        </div>
      </div>
    )
  );
}

export default WordPressSetupModal;
