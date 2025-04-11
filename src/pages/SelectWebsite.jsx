"use client"

import { Search, Sparkles, Code, ArrowRight, Palette, Globe, Zap, Rocket } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import WebsiteCard from "@/components/WebsiteCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Cookies from "js-cookie"
import CreateCustomModal from "@/components/CreateCustomModal"
import WordPressSetupModal from "@/components/WordPressSetupForm"
import { motion } from "framer-motion"

const websites = [] // Empty array means no websites exist

export default function SelectWebsite() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWordpressModalOpen, setIsWordpressModalOpen] = useState(false)
  const [isWordpressProgressModalOpen, setIsWordpressProgressModalOpen] = useState(false)
  const [wordpressFormData, setWordpressFormData] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = Cookies.get("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleWordPressInstall = async (formData) => {
    setIsWordpressModalOpen(false)
    setWordpressFormData(formData)
    setIsWordpressProgressModalOpen(true)
  }

  const handleCustomWebsiteClick = () => {
    setIsModalOpen(true)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      <Header />
      <div className="mx-auto w-full">
        {websites.length > 0 ? (
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Checkbox id="select-all" />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All tags</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-1 items-center justify-end gap-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search..." className="pl-9" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {websites.map((website, index) => (
                <WebsiteCard key={index} {...website} />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50"
          >
            <div className="container mx-auto px-4 py-12">
              <motion.div variants={itemVariants} className="max-w-3xl mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Get Started
                </div>
                <h2 className="text-xl font-medium mb-3 flex items-center">
                  <span className="mr-2">👋</span>
                  Hey {user?.firstname} {user?.lastname}
                </h2>
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
                  How do you want to build your website?
                </h1>
                <p className="text-gray-600 text-lg">
                  Choose between AI-assisted website creation or fully custom design to bring your vision to life.
                </p>
              </motion.div>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Background gradient */}
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-50 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Sparkles className="h-7 w-7" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">Use AI WordPress to create your website</h3>

                    <p className="text-gray-600 mb-6">
                      Let AI generate content and images for you. Perfect for quickly launching a professional website
                      with minimal effort.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Zap className="h-3.5 w-3.5" />
                        </div>
                        <span>AI-generated content</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Globe className="h-3.5 w-3.5" />
                        </div>
                        <span>WordPress CMS included</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Rocket className="h-3.5 w-3.5" />
                        </div>
                        <span>Quick setup and deployment</span>
                      </li>
                    </ul>

                    <Button
                      onClick={() => setIsWordpressModalOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      Start with AI WordPress
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Background gradient */}
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-50 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      <Code className="h-7 w-7" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">Create a custom website</h3>

                    <p className="text-gray-600 mb-6">
                      Manually design and customize your website. Perfect for those who want complete control over their
                      site's appearance.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                          <Palette className="h-3.5 w-3.5" />
                        </div>
                        <span>Full design customization</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                          <Code className="h-3.5 w-3.5" />
                        </div>
                        <span>Advanced features</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                          <Zap className="h-3.5 w-3.5" />
                        </div>
                        <span>Drag-and-drop editor</span>
                      </li>
                    </ul>

                    <Button
                      onClick={handleCustomWebsiteClick}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      Start Custom Design
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center">
                <p className="text-gray-500 mb-4">
                  Need help deciding? Check out our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    comparison guide
                  </a>{" "}
                  or{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    contact support
                  </a>
                  .
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {isModalOpen && <CreateCustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      <WordPressSetupModal
        isOpen={isWordpressModalOpen}
        onClose={() => setIsWordpressModalOpen(false)}
        onInstall={handleWordPressInstall}
        isProgressModalOpen={isWordpressProgressModalOpen}
        setIsProgressModalOpen={setIsWordpressProgressModalOpen}
        formData={wordpressFormData}
      />
    </>
  )
}
