"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AppRoutes } from "@/constant/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function WordPressSetupModal({
  isOpen,
  onClose,
  onInstall,
  isProgressModalOpen,
  setIsProgressModalOpen,
  formData,
}) {
  const [pass, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState({
    saveData: { completed: false, loading: false },
    installWP: { completed: false, loading: false },
    installPlugin: { completed: false, loading: false },
    createSite: { completed: false, loading: false },
  });

  const [localFormData, setLocalFormData] = useState({
    title: "",
    stitle: "",
    uname: "",
    Email: "",
  });

  const router = useNavigate();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const updateFormData = (newData) => {
    setLocalFormData((prev) => ({ ...prev, ...newData }));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6)
      return { text: "Weak", color: "bg-red-500", percentage: 33 };
    if (password.length < 8)
      return { text: "Medium", color: "bg-yellow-500", percentage: 66 };
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return { text: "Strong", color: "bg-green-500", percentage: 100 };
    return { text: "Medium", color: "bg-yellow-500", percentage: 66 };
  };

  const passwordStrength = getPasswordStrength(pass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeForm = { ...localFormData, pass };
       
  // Validate all fields are filled
  if (!completeForm.title || !completeForm.stitle || !completeForm.uname || !completeForm.Email || !completeForm.pass) {
    toast.error("Please fill out all fields");
    return;
  }

  // Validate email format
  if (!/^\S+@\S+\.\S+$/.test(completeForm.Email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Validate password strength
  if (completeForm.pass.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }
    onInstall(completeForm); // Pass form data to parent
    
    // Step 1: Save Data
    setSteps((prev) => ({
      ...prev,
      saveData: { completed: false, loading: true },
    }));

    try {
      const { data: savedData } = await axios.post(AppRoutes.wordpress, completeForm, {
        headers: { "Content-Type": "application/json" },
      });

      // let completeFormID = null;
      var completeFormID = savedData._id;
      setSteps((prev) => ({
        ...prev,
        saveData: { completed: true, loading: false },
      }));
      setCurrentStep(1);
    } catch (e) {
      console.log(e);
      setSteps((prev) => ({
        ...prev,
        saveData: { completed: false, loading: false },
      }));
      return;
    }

    // Step 2: Install WordPress
    setSteps((prev) => ({
      ...prev,
      installWP: { completed: false, loading: true },
    }));

    try {
      const response = await fetch(AppRoutes.install, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(completeForm).toString(),
      });
    
      const result = await response.text();
      console.log(result);

      // const installPath = result?.path;
      const installPath = JSON.stringify(result);
      console.log("Installation Path:", installPath);
    
      if (!installPath) {
        toast.error("Installation path missing in response");
        return;
      }
      console.log("Installation path");
      // `${AppRoutes.wordpress}/${completeFormID}`
      // ✅ Update MongoDB with path
      const res = await axios.patch(`${AppRoutes.wordpress}/${completeFormID}`, {
        paths: installPath,
      })
      console.log("Path Updated" + res.data);
    
      setSteps((prev) => ({
        ...prev,
        installWP: { completed: true, loading: false },
      }));
      setCurrentStep(2);

      // Step 3 & 4: Install Plugin and Create Site
      setSteps((prev) => ({
        ...prev,
        installPlugin: { completed: false, loading: true },
      }));

      try {
        await fetch(AppRoutes.plugin, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: result,
        });

        setSteps((prev) => ({
          ...prev,
          installPlugin: { completed: true, loading: false },
          createSite: { completed: true, loading: false },
        }));
        setCurrentStep(4);

        setTimeout(() => {
          setIsProgressModalOpen(false);
          router("/wordprestemplatedetails");
        }, 2000);
      } catch (e) {
        console.log("Error", e);
        setSteps((prev) => ({
          ...prev,
          installPlugin: { completed: false, loading: false },
        }));
      }
    } catch (error) {
      console.error("❌ Installation Error:", error);
      setSteps((prev) => ({
        ...prev,
        installWP: { completed: false, loading: false },
      }));
    }
  };

  const totalProgress =
    (steps.saveData.completed ? 25 : 0) +
    (steps.installWP.completed ? 25 : 0) +
    (steps.installPlugin.completed ? 25 : 0) +
    (steps.createSite.completed ? 25 : 0);

  if (!isOpen && !isProgressModalOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">WordPress Setup</CardTitle>
              <CardDescription>
                Complete the setup process for your WordPress site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Site Title
                  </label>
                  <Input
                    id="title"
                    placeholder="My WordPress Site"
                    value={localFormData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="stitle" className="text-sm font-medium">
                    Site Subtitle
                  </label>
                  <Input
                    id="stitle"
                    placeholder="Just another WordPress site"
                    value={localFormData.stitle}
                    onChange={(e) => updateFormData({ stitle: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="uname" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="uname"
                    placeholder="admin"
                    value={localFormData.uname}
                    onChange={(e) => updateFormData({ uname: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={localFormData.Email}
                    onChange={(e) => updateFormData({ Email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={passVisible ? "text" : "password"}
                      placeholder="Secure password"
                      value={pass}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setPassVisible(!passVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {passVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {pass && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">{passwordStrength.text}</span>
                      </div>
                      <Progress
                        value={passwordStrength.percentage}
                        className={passwordStrength.color}
                      />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onClose} className="text-white">
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Install WordPress
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {isProgressModalOpen && (
        <div className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">WordPress Installation</CardTitle>
              <CardDescription>Setting up your WordPress site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={totalProgress} className="h-2 " />
                <p className="text-sm text-right mt-1 text-muted-foreground">
                  {totalProgress}% Complete
                </p>
              </div>

              <div className="space-y-4 text-black">
                {Object.entries({
                  saveData: "Saving Data",
                  installWP: "Installing WordPress",
                  installPlugin: "Installing Plugins",
                  createSite: "Creating WordPress Site"
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3">
                    {steps[key].loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : steps[key].completed ? (
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-muted-foreground/30" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${
                        steps[key].completed || steps[key].loading
                          ? "text-black"
                          : "text-muted-foreground"
                      }`}>
                        {label}
                      </p>
                      {steps[key].loading && (
                        <p className="text-xs text-muted-foreground text-black">
                          {key === 'saveData' && 'Storing your configuration...'}
                          {key === 'installWP' && 'Setting up WordPress core files...'}
                          {key === 'installPlugin' && 'Adding essential WordPress plugins...'}
                          {key === 'createSite' && 'Finalizing your WordPress installation...'}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {steps.createSite.completed && (
                <div className="mt-6 text-center">
                  <p className="text-green-500 font-medium">
                    Installation Complete!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Redirecting to template selection...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}