"use client"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Save, Camera, User, MapPin, Globe, Mail, Github, Twitter, Linkedin, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { AppRoutes } from "@/constant/constant"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import Header from "@/components/Header"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef()
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    title: "",
    location: "",
    bio: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
    avatar: "",
  })

  const user = Cookies.get("user")
  const userdetails = JSON.parse(user)

  // GET user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${AppRoutes.profile}/${userdetails._id}`)
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast.error("Failed to load profile data")
      }
    }

    fetchProfile()
  }, [userdetails._id])

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  // Avatar click triggers file input
  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  // Preview + upload image
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, or GIF)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    // Show preview
    setPreview(URL.createObjectURL(file))
    setIsUploading(true)

    // Upload to backend
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const res = await axios.post(`${AppRoutes.profileAvatar}/${userdetails._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setProfile({ ...profile, avatar: res.data.avatarUrl }) // Assuming backend returns avatarUrl
      toast.success("Profile image updated!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to upload image")
      // Revert preview on error
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  // PUT update profile
  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Basic validation
    if (!profile.firstname || !profile.lastname || !profile.email) {
      toast.error("Name and email are required")
      setIsSaving(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profile.email)) {
      toast.error("Please enter a valid email address")
      setIsSaving(false)
      return
    }

    // Website validation if provided
    if (profile.website && !profile.website.startsWith("http")) {
      setProfile({ ...profile, website: `https://${profile.website}` })
    }

    const extras = {
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      website: profile.website,
      github: profile.github,
      twitter: profile.twitter,
      linkedin: profile.linkedin,
      avatar: profile.avatar,
    }

    try {
      await axios.put(`${AppRoutes.profile}/${userdetails._id}`, {
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        extras,
      })

      toast.success("Your profile has been saved successfully")

      // Update user cookie with new name if changed
      if (userdetails.firstname !== profile.firstname || userdetails.lastname !== profile.lastname) {
        const updatedUser = {
          ...userdetails,
          firstname: profile.firstname,
          lastname: profile.lastname,
        }
        Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    } finally {
      setIsSaving(false)
    }
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      {/* Profile Content */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-6">
        
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and account settings</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div className="md:col-span-1" initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
              <CardContent className="pt-0 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative -mt-16 mb-4 cursor-pointer ${isUploading ? "opacity-70" : ""}`}
                    onClick={handleAvatarClick}
                  >
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                      <AvatarImage
                        src={preview || profile.avatar || "/placeholder.svg?height=128&width=128" || "/placeholder.svg"}
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                        {profile.firstname?.[0]}
                        {profile.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      disabled={isUploading}
                    >
                      {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold">
                    {profile.firstname} {profile.lastname}
                  </h2>
                  <p className="text-gray-500">{profile.title || "Add your title"}</p>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{profile.email || "Add your email"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{profile.location || "Add your location"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Website</p>
                      <p className="text-gray-900">
                        {profile.website ? (
                          <a
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {profile.website.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          "Add your website"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {(profile.github || profile.twitter || profile.linkedin) && (
                  <>
                    <Separator className="my-6" />
                    <div className="flex justify-center gap-4">
                      {profile.github && (
                        <a
                          href={`https://github.com/${profile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {profile.twitter && (
                        <a
                          href={`https://twitter.com/${profile.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {profile.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${profile.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="md:col-span-2" initial="hidden" animate="visible" variants={fadeIn}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Edit Profile
                </CardTitle>
                <CardDescription>Update your profile information and social links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      value={profile.firstname}
                      onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      value={profile.lastname}
                      onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="h-10"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Professional Title
                  </Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="h-10"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    className="min-h-[100px] resize-y"
                  />
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Social Links</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="h-10"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                      <Github className="h-4 w-4 text-gray-500" />
                      GitHub
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">github.com/</span>
                      <Input
                        id="github"
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                        className="h-10 pl-[90px]"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-sm font-medium flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-gray-500" />
                      Twitter
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">twitter.com/</span>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                        className="h-10 pl-[90px]"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-gray-500" />
                      LinkedIn
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">linkedin.com/in/</span>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        className="h-10 pl-[110px]"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
