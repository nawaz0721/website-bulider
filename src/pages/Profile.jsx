import { useState } from "react"
import { Layers, Save, Camera, Github, Twitter, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)

  const [profile, setProfile] = useState({
    name: "Ahmed Nawaz ",
    title: "Frontend Developer",
    email: "nawaz@gmail.com",
    location: "Karachi, PK",
    bio: "Frontend developer with 5 years of experience building modern web applications. I specialize in React, Next.js, and JavaScript.",
    website: "https://nawaz.com",
    github: "nawaz",
    twitter: "nawaz",
    linkedin: "nawaz",
  })

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-5 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WebCraft</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              My Projects
            </Link>
            <Link to="/templates" className="text-sm font-medium hover:text-primary">
              Templates
            </Link>
            <Link to="/dashboard/profile" className="text-sm font-medium text-primary">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.title}</p>

                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p>{profile.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Website</p>
                    <p>{profile.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information and social links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        github.com/
                      </span>
                      <Input
                        id="github"
                        className="rounded-l-none"
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        twitter.com/
                      </span>
                      <Input
                        id="twitter"
                        className="rounded-l-none"
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        linkedin.com/in/
                      </span>
                      <Input
                        id="linkedin"
                        className="rounded-l-none"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

