"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, MoreVertical, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export default function PreviewPage({ isOpen, onClose, template }) {
  const [activeTab, setActiveTab] = useState("pages");
  const navigate = useNavigate()

  const pages = [
    { id: "1", title: "aa", link: ".../aa/", lastModified: "2025-03-18 08:27:10", status: "Published" },
    { id: "2", title: "My account", link: ".../my-account/", lastModified: "2025-03-18 08:14:52", status: "Published" },
    { id: "3", title: "Checkout", link: ".../checkout/", lastModified: "2025-03-18 08:14:52", status: "Published" },
    { id: "4", title: "Cart", link: ".../cart/", lastModified: "2025-03-18 08:14:52", status: "Published" },
    { id: "5", title: "Shop", link: ".../shop/", lastModified: "2025-03-18 08:14:52", status: "Published" },
  ];

  // Use template => navigate to Editor with template ID (/editor/:id)
  const addPage = (template) => {
    console.log("template", template);
    navigate(`/editor/${template._id}`);
  };

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />

      <div className="ml-16 mt-12 p-6 w-full flex flex-col h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Live Environment
            </Badge>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <span className="text-sm text-yellow-500 flex items-center gap-2">
              ⚠️ Frontpage is not set. Please publish a page to set it as frontpage.
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{template?.name || "Untitled Website"}</h2>
            <p className="text-sm text-gray-600">{template?.description || "No description available."}</p>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Section */}
          <div className="w-64 border-r bg-gray-50 flex flex-col">

            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                <div className="flex items-center gap-2 p-2 rounded bg-gray-100">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Main</span>
                </div>

                <div className="mt-2">
                  {[
                    { icon: "≡", label: "Navigation", active: false },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded my-1 ${
                        item.active ? "bg-blue-50" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs bg-black text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <Tabs defaultValue="pages" className="flex-1 flex flex-col">
              <div className="border-b">
                <TabsList className="px-4">
                  {["Pages", "Header", "Footer", "Single", "Archive", "Slide"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className={`${activeTab === tab.toLowerCase() ? "border-b-2 border-blue-500" : ""}`}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Pages Tab */}
              <TabsContent value="pages" className="flex-1 p-4 overflow-auto">
                <div className="flex justify-between mb-4">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search..." className="pl-10" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700"  onClick={() => addPage(template)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Page
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Last modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Edit</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <div className="h-5 w-5 border rounded flex-shrink-0"></div>
                          {page.title}
                        </TableCell>
                        <TableCell className="text-blue-500">{page.link}</TableCell>
                        <TableCell>{page.lastModified}</TableCell>
                        <TableCell>
                          <select className="border rounded p-1 bg-white">
                            <option>Published</option>
                            <option>Draft</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Placeholder tabs */}
              {["header", "footer", "single", "archive", "slide"].map((tab) => (
                <TabsContent key={tab} value={tab} className="flex-1 p-4">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} content would be displayed here
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
