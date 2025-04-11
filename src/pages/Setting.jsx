"use client"
import { useState } from "react"
import { Save, User, Bell, CreditCard, Palette, ChevronRight, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import { motion } from "framer-motion"

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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="md:w-1/4">
            <Card className="sticky top-24 border-0 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent rounded-none">
                    <TabsTrigger
                      value="account"
                      className="w-full justify-start px-4 py-3 text-left border-l-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-none transition-all"
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-3 text-gray-500 data-[state=active]:text-blue-600" />
                        <span>Account</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start px-4 py-3 text-left border-l-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-none transition-all"
                    >
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-3 text-gray-500 data-[state=active]:text-blue-600" />
                        <span>Notifications</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="billing"
                      className="w-full justify-start px-4 py-3 text-left border-l-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-none transition-all"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-3 text-gray-500 data-[state=active]:text-blue-600" />
                        <span>Billing</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="w-full justify-start px-4 py-3 text-left border-l-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-none transition-all"
                    >
                      <div className="flex items-center">
                        <Palette className="h-4 w-4 mr-3 text-gray-500 data-[state=active]:text-blue-600" />
                        <span>Appearance</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </div>
                    </TabsTrigger>
                    <Separator className="my-2" />
                    <TabsTrigger
                      value="security"
                      className="w-full justify-start px-4 py-3 text-left border-l-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-none transition-all"
                    >
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-3 text-gray-500 data-[state=active]:text-blue-600" />
                        <span>Security</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="md:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Account Settings */}
              <TabsContent value="account">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Account Settings
                      </CardTitle>
                      <CardDescription>Manage your account information and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={accountSettings.name}
                          onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={accountSettings.email}
                          onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                          className="h-10"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          This email will be used for account-related notifications.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={accountSettings.company}
                          onChange={(e) => setAccountSettings({ ...accountSettings, company: e.target.value })}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-sm font-medium">
                          Language
                        </Label>
                        <select
                          id="language"
                          className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="en">English (US)</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                      <Button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isSaving ? (
                          <>
                            <Save className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-blue-600" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription>Manage how and when you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Marketing Emails</Label>
                              <p className="text-sm text-gray-500">Receive emails about new features and updates</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Account Notifications</Label>
                              <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Security Alerts</Label>
                              <p className="text-sm text-gray-500">
                                Receive emails about security updates and login attempts
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">New Comments</Label>
                              <p className="text-sm text-gray-500">Receive notifications when someone comments</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Updates</Label>
                              <p className="text-sm text-gray-500">Receive notifications about platform updates</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                      <Button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isSaving ? (
                          <>
                            <Save className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                        Billing Settings
                      </CardTitle>
                      <CardDescription>Manage your subscription and payment methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-blue-800">Current Plan: Pro</h3>
                            <p className="text-sm text-blue-600">Your plan renews on August 1, 2023</p>
                          </div>
                          <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">ACTIVE</div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Method</h3>
                          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border">
                            <div className="flex items-center">
                              <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center mr-4">
                                <CreditCard className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">Visa ending in 4242</p>
                                <p className="text-sm text-gray-500">Expires 12/2024</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Change
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Billing History</h3>
                          <div className="border rounded-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jul 1, 2023</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$29.00</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Paid
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                      Download
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jun 1, 2023</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$29.00</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Paid
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                      Download
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                      <div className="flex gap-3">
                        <Button variant="outline">Cancel Subscription</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Manage Billing</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <CardTitle className="flex items-center">
                        <Palette className="h-5 w-5 mr-2 text-blue-600" />
                        Appearance
                      </CardTitle>
                      <CardDescription>Customize your theme and colors.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Theme</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border border-gray-200 rounded-md p-3 cursor-pointer hover:border-blue-500 transition-colors">
                            <div className="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
                            <p className="text-sm font-medium text-center">Light</p>
                          </div>
                          <div className="border border-gray-200 rounded-md p-3 cursor-pointer hover:border-blue-500 transition-colors">
                            <div className="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2"></div>
                            <p className="text-sm font-medium text-center">Dark</p>
                          </div>
                          <div className="border border-blue-500 rounded-md p-3 cursor-pointer bg-blue-50">
                            <div className="h-20 bg-gradient-to-b from-white to-gray-900 border border-gray-200 rounded-md mb-2"></div>
                            <p className="text-sm font-medium text-center text-blue-600">System</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Display Options</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Dark Mode</Label>
                              <p className="text-sm text-gray-500">Use dark theme for the interface</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">Reduced Motion</Label>
                              <p className="text-sm text-gray-500">Minimize animations throughout the interface</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                            <div>
                              <Label className="font-medium">High Contrast</Label>
                              <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Font Size</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">A</span>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              defaultValue="3"
                              className="w-full mx-4 accent-blue-600"
                            />
                            <span className="text-lg font-bold">A</span>
                          </div>
                          <p className="text-xs text-gray-500 text-center">Adjust the font size of the interface</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                      <Button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isSaving ? (
                          <>
                            <Save className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-600" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>Manage your account security and authentication options.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Password</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" className="h-10" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" className="h-10" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" className="h-10" />
                          </div>
                          <Button className="mt-2">Change Password</Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <div className="bg-gray-50 p-4 rounded-md border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Two-Factor Authentication</p>
                              <p className="text-sm text-gray-500">
                                Add an extra layer of security to your account by requiring a verification code
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Sessions</h3>
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-4 rounded-md border">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-gray-500">
                                  Chrome on Windows • New York, USA • Started 2 hours ago
                                </p>
                              </div>
                              <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                                ACTIVE
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md border">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Previous Session</p>
                                <p className="text-sm text-gray-500">
                                  Safari on macOS • San Francisco, USA • 3 days ago
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Revoke
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end bg-gray-50 border-t py-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Log Out All Devices</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
