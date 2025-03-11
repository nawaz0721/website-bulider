import { useState } from "react"
import { Layers, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("account")

  const [accountSettings, setAccountSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
  })

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
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
            <Link to="/settings" className="text-sm font-medium text-primary">
              Settings
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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="md:w-1/4">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
              <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent ">
                <TabsTrigger value="account" className="w-full justify-start px-2 py-1.5 text-left">Account</TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-2 py-1.5 text-left">Notifications</TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start px-2 py-1.5 text-left">Billing</TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start px-2 py-1.5 text-left">Appearance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Settings Content */}
          <div className="md:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Account Settings */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account information and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={accountSettings.name} onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={accountSettings.email} onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? <><Save className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how and when you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? <><Save className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Settings</CardTitle>
                    <CardDescription>Manage your subscription and payment methods.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Current Plan: <strong>Pro</strong></p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Manage Billing</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize your theme and colors.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Label>Dark Mode</Label>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings} disabled={isSaving}>
                      {isSaving ? <><Save className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
