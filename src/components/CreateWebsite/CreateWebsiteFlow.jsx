"use client"

import { useState } from "react"
import WebsiteTypeStep from "./steps/WebsiteTypeStep"


function CreateWebsiteFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    websiteType: "",
    businessType: "",
    businessSubtype: "",
    companyName: "",
    companyDescription: "",
    hasDomain: null,
  })

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WebsiteTypeStep formData={formData} updateFormData={updateFormData} onNext={handleNext} />
      default:
        return null
    }
  }

  return <div className="min-h-screen bg-white">{renderStep()}</div>
}

export default CreateWebsiteFlow

