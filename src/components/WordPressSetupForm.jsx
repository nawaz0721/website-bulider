"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Check, Loader2, Globe, Mail, User, Lock, X, AlertCircle, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AppRoutes } from "@/constant/constant"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"

export default function WordPressSetupModal({
  isOpen,
  onClose,
  onInstall,
  isProgressModalOpen,
  setIsProgressModalOpen,
  formData,
}) {
  const [pass, setPassword] = useState("")
  const [passVisible, setPassVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState({
    saveData: { completed: false, loading: false },
    installWP: { completed: false, loading: false },
    installPlugin: { completed: false, loading: false },
    installTemplate: { completed: false, loading: false }, // Add this line
    createSite: { completed: false, loading: false },
  })

  const [localFormData, setLocalFormData] = useState({
    title: "",
    stitle: "",
    uname: "",
    Email: "",
  })

  const navigate = useNavigate()

  let userDetails = null
  try {
    const user = Cookies?.get("user")
    if (user) {
      userDetails = JSON.parse(user)
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err)
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
    // Generate initial password when component mounts
    generatePassword()
  }, [])

  // Function to generate 6-digit alphanumeric password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const updateFormData = (newData) => {
    setLocalFormData((prev) => ({ ...prev, ...newData }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const completeForm = { ...localFormData, pass, userID: userDetails._id }

    // Validate all fields are filled
    if (
      !completeForm.title ||
      !completeForm.stitle ||
      !completeForm.uname ||
      !completeForm.Email ||
      !completeForm.pass
    ) {
      toast.error("Please fill out all fields")
      return
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(completeForm.Email)) {
      toast.error("Please enter a valid email address")
      return
    }

    onInstall(completeForm) // Pass form data to parent

    // Step 1: Save Data
    setSteps((prev) => ({
      ...prev,
      saveData: { completed: false, loading: true },
    }))

    try {
      const { data: savedData } = await axios.post(AppRoutes.wordpress, completeForm, {
        headers: { "Content-Type": "application/json" },
      })

      var completeFormID = savedData._id
      setSteps((prev) => ({
        ...prev,
        saveData: { completed: true, loading: false },
      }))
      setCurrentStep(1)
    } catch (e) {
      console.log(e)
      setSteps((prev) => ({
        ...prev,
        saveData: { completed: false, loading: false },
      }))
      return
    }

    // Step 2: Install WordPress
    setSteps((prev) => ({
      ...prev,
      installWP: { completed: false, loading: true },
    }))

    try {
      const response = await fetch(AppRoutes.install, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(completeForm).toString(),
      })

      const result = await response.text()
      // Save the installation path to cookies
      Cookies.set("path", result, { expires: 1 })

      if (!result) {
        toast.error("Installation path missing in response")
        return
      }

      // Update MongoDB with path
      const res = await axios.patch(`${AppRoutes.wordpress}/${completeFormID}`, {
        paths: result,
      })

      setSteps((prev) => ({
        ...prev,
        installWP: { completed: true, loading: false },
      }))
      setCurrentStep(2)

      // Step 3: Install Plugin
      setSteps((prev) => ({
        ...prev,
        installPlugin: { completed: false, loading: true },
      }))

      try {
        await fetch(AppRoutes.plugin, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: result,
        })

        setSteps((prev) => ({
          ...prev,
          installPlugin: { completed: true, loading: false },
        }))
        setCurrentStep(3)

        // Step 4: Install Template (only if template is selected)
        const templateId = Cookies.get('selectedTemplateId')
        if (templateId) {
          setSteps((prev) => ({
            ...prev,
            installTemplate: { completed: false, loading: true },
          }))
          setCurrentStep(4)

          try {
            const path = Cookies.get('path')
            await fetch(`${AppRoutes.createtemplate}?path=${path}&template=${templateId}`)
            await fetch(`${AppRoutes.createtemplate}?path=${path}&template=${templateId}`)
            setSteps((prev) => ({
              ...prev,
              installTemplate: { completed: true, loading: false },
            }))
            setCurrentStep(5)
          } catch (e) {
            console.log("Template installation error", e)
            setSteps((prev) => ({
              ...prev,
              installTemplate: { completed: false, loading: false },
            }))
          }
        } else {
          // Skip to step 5 if no template selected
          setCurrentStep(5)
        }

        // Step 5: Complete and Navigate
        setTimeout(() => {
          setIsProgressModalOpen(false)
          navigate("/main-dashboard")
        }, 2000)

      } catch (e) {
        console.log("Error", e)
        setSteps((prev) => ({
          ...prev,
          installPlugin: { completed: false, loading: false },
        }))
      }
    } catch (error) {
      console.error("❌ Installation Error:", error)
      setSteps((prev) => ({
        ...prev,
        installWP: { completed: false, loading: false },
      }))
    }
  }

  const totalProgress = Math.floor(
    (steps.saveData.completed ? 20 : 0) +
    (steps.installWP.completed ? 20 : 0) +
    (steps.installPlugin.completed ? 20 : 0) +
    (steps.installTemplate.completed ? 20 : 0) +
    (steps.createSite.completed ? 20 : 0)
  )

  if (!isOpen && !isProgressModalOpen) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Card className="w-full max-w-md shadow-2xl bg-white border-0">
                <CardHeader className="relative pb-4 border-b">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 rounded-full p-3 shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="pt-6">
                    <CardTitle className="text-2xl font-bold text-center">WordPress Setup</CardTitle>
                    <CardDescription className="text-center pt-1">
                      Complete the setup process for your WordPress site
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 rounded-full hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        Site Title
                      </label>
                      <Input
                        id="title"
                        placeholder="My WordPress Site"
                        value={localFormData.title}
                        onChange={(e) => updateFormData({ title: e.target.value })}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="stitle" className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        Site Subtitle
                      </label>
                      <Input
                        id="stitle"
                        placeholder="Just another WordPress site"
                        value={localFormData.stitle}
                        onChange={(e) => updateFormData({ stitle: e.target.value })}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="uname" className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        Username
                      </label>
                      <Input
                        id="uname"
                        placeholder="admin"
                        value={localFormData.uname}
                        onChange={(e) => updateFormData({ uname: e.target.value })}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={localFormData.Email}
                        onChange={(e) => updateFormData({ Email: e.target.value })}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={
                      !localFormData.title ||
                      !localFormData.stitle ||
                      !localFormData.uname ||
                      !localFormData.Email ||
                      !pass
                    }
                  >
                    Install WordPress
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProgressModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Card className="w-full max-w-md shadow-2xl bg-white border-0">
                <CardHeader className="pb-4 border-b">
                  <CardTitle className="text-2xl font-bold">WordPress Installation</CardTitle>
                  <CardDescription>Setting up your WordPress site</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <Progress value={totalProgress} className="h-2.5 bg-gray-100" />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">Installation Progress</p>
                      <p className="text-sm font-medium">{totalProgress}%</p>
                    </div>
                  </div>

                  <div className="space-y-5 text-black">
                    {Object.entries({
                      saveData: "Saving Data",
                      installWP: "Installing WordPress",
                      installPlugin: "Installing Plugins",
                      installTemplate: "Installing Template",
                      createSite: "Creating WordPress Site",
                    }).map(([key, label], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-3 rounded-lg ${
                          steps[key].completed
                            ? "bg-green-50"
                            : steps[key].loading
                              ? "bg-blue-50"
                              : "bg-gray-50 opacity-70"
                        }`}
                      >
                        {steps[key].loading ? (
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          </div>
                        ) : steps[key].completed ? (
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-5 w-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            {index + 1}
                          </div>
                        )}
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              steps[key].completed
                                ? "text-green-800"
                                : steps[key].loading
                                  ? "text-blue-800"
                                  : "text-gray-500"
                            }`}
                          >
                            {label}
                          </p>
                          {steps[key].loading && (
                            <p className="text-xs text-blue-600 mt-0.5">
                              {key === "saveData" && "Storing your configuration..."}
                              {key === "installWP" && "Setting up WordPress core files..."}
                              {key === "installPlugin" && "Adding essential WordPress plugins..."}
                              {key === "installtemplate" && " Setting up WordPress template..."}
                              {key === "createSite" && "Finalizing your WordPress installation..."}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {steps.createSite.completed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-8 text-center bg-green-50 p-4 rounded-lg border border-green-100"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-green-800 font-bold text-lg">Installation Complete!</p>
                      <p className="text-green-600 mt-1">Redirecting to template selection...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}