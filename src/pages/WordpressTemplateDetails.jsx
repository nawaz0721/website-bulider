"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Edit,
  MoreVertical,
  ExternalLink,
  Code,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import { Card } from "antd";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default function WordpressTemplateDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("pages");
  const [activeSubTab, setActiveSubTab] = useState("pages");
  const [template, setTemplate] = useState(null);
  const [pages, setPages] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const navigate = useNavigate();

  // Fetch template details and pages
  const fetchTemplateDetails = async () => {
    try {
      //   const response = await axios.get(`${AppRoutes.userTemplate}/${id}`);
      const templateData = response.data;

      setTemplate(templateData);
      setPages(templateData.pages || []);
      setPlugins(templateData.plugins || []);
    } catch (error) {
      console.error("Error fetching template details:", error);
    }
  };

  useEffect(() => {
    fetchTemplateDetails();
  }, []);

  // Navigate to Editor with the selected template ID
  const handleEditTemplate = () => {
    navigate(`/editor/${id}`);
  };

  // Navigate to edit specific component
  const handleEditComponent = (componentType) => {
    navigate(`/editor/${id}?edit=${componentType}`);
  };

  const PreviewContent = ({ html }) => {
    return (
      <div
        className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-64"
        dangerouslySetInnerHTML={{
          __html: html || '<p class="text-gray-500">No content available</p>',
        }}
      />
    );
  };

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />

      <div className="ml-16 mt-12 p-6 w-full flex flex-col h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 flex items-center gap-1"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Live Environment
            </Badge>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <span className="text-sm text-yellow-500 flex items-center gap-2">
              ⚠️ Frontpage is not set. Please publish a page to set it as
              frontpage.
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {template?.title || "Untitled Website"}
            </h2>
            <p className="text-sm text-gray-600">
              {template?.description || "No description available."}
            </p>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden bg-white">
          {/* Sidebar Section */}
          <div className="w-64 border-r bg-gray-50 flex flex-col p-4">
            <Tabs 
              value={activeSubTab} 
              onValueChange={setActiveSubTab}
              className="flex flex-col"
            >
              {activeTab === "pages" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Page Components</h3>
                  <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                    {["Pages", "Header", "Footer"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className={`w-full justify-start px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 ${
                          activeSubTab === tab.toLowerCase()
                            ? "border-l-2 border-blue-500"
                            : ""
                        }`}
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </>
              )}
              
              {activeTab === "plugin" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Plugins</h3>
                  <div className="space-y-2">
                    {plugins.map(plugin => (
                      <div key={plugin.id} className="flex items-center p-2 hover:bg-gray-100 rounded">
                        <span className="text-sm">{plugin.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {activeTab === "menu" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Menu</h3>
                  <div className="text-sm text-gray-500 p-2">
                    Menu management will be available here
                  </div>
                </>
              )}
              
              {activeTab === "custom html & css" && (
                <>
                  <h3 className="font-medium mb-2 px-2">Custom Code</h3>
                  <div className="text-sm text-gray-500 p-2">
                    Custom HTML/CSS editor will be available here
                  </div>
                </>
              )}
            </Tabs>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col"
            >
              <div className="border-b">
                <TabsList className="px-4">
                  {["Pages", "Plugin", "Menu", "Custom HTML & CSS"].map(
                    (tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className={`${
                          activeTab === tab.toLowerCase()
                            ? "border-b-2 border-blue-500"
                            : ""
                        }`}
                      >
                        {tab}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </div>

              {/* Pages Tab Content */}
              <TabsContent value="pages" className="flex-1 p-6 overflow-auto">
                {activeSubTab === "pages" && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search pages..." className="pl-10" />
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleEditTemplate}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New Page
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pages.length > 0 ? (
                          pages.map((page) => (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium">
                                {page.name}
                              </TableCell>
                              <TableCell className="text-blue-500 hover:underline cursor-pointer">
                                /{page.slug || page.id}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2"
                                    onClick={() => navigate(`/editor/${id}`)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 px-2">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Code className="h-4 w-4 mr-2" />
                                        View Source
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan="3"
                              className="text-center text-gray-500 py-4"
                            >
                              No pages found. Create your first page.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </>
                )}

                {activeSubTab === "header" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Header Content</h2>
                      <Button
                        onClick={() => handleEditComponent("header")}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Header
                      </Button>
                    </div>

                    <Card>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription className="mb-4">
                        This is how your header will appear on the site
                      </CardDescription>
                      <PreviewContent html={template?.header?.html} />
                    </Card>

                    <Card>
                      <CardTitle>CSS Styles</CardTitle>
                      <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-64">
                        {template?.header?.css ? (
                          <pre className="text-sm">{template.header.css}</pre>
                        ) : (
                          <p className="text-gray-500">No CSS styles defined</p>
                        )}
                      </div>
                    </Card>
                  </div>
                )}

                {activeSubTab === "footer" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Footer Content</h2>
                      <Button
                        onClick={() => handleEditComponent("footer")}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Footer
                      </Button>
                    </div>

                    <Card>
                      <CardTitle>Preview</CardTitle>
                      <CardDescription className="mb-4">
                        This is how your footer will appear on the site
                      </CardDescription>
                      <PreviewContent html={template?.footer?.html} />
                    </Card>

                    <Card>
                      <CardTitle>CSS Styles</CardTitle>
                      <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-64">
                        {template?.footer?.css ? (
                          <pre className="text-sm">{template.footer.css}</pre>
                        ) : (
                          <p className="text-gray-500">No CSS styles defined</p>
                        )}
                      </div>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Plugin Tab Content */}
              <TabsContent value="plugin" className="flex-1 p-6 overflow-auto">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Installed Plugins</h2>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" /> Add Plugin
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plugins.length > 0 ? (
                      plugins.map(plugin => (
                        <Card key={plugin.id} className="hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{plugin.name}</h3>
                              <p className="text-sm text-gray-600">{plugin.description}</p>
                            </div>
                            <Badge variant={plugin.active ? "default" : "outline"}>
                              {plugin.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                            <Button variant="outline" size="sm">
                              {plugin.active ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-8 text-gray-500">
                        No plugins installed. Add your first plugin to extend functionality.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Menu Tab Content */}
              <TabsContent value="menu" className="flex-1 p-6 overflow-auto">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Menu Management</h2>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" /> Create New Menu
                    </Button>
                  </div>

                  <Card>
                    <CardTitle>Menu Structure</CardTitle>
                    <CardDescription className="mb-4">
                      Drag and drop items to organize your menu
                    </CardDescription>
                    <div className="border rounded-lg p-4 bg-gray-50 min-h-64">
                      <p className="text-gray-500 text-center py-8">
                        Menu builder will be displayed here
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Custom HTML & CSS Tab Content */}
              <TabsContent value="custom html & css" className="flex-1 p-6 overflow-auto">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Custom Code</h2>
                  
                  <Card>
                    <CardTitle>Global CSS</CardTitle>
                    <CardDescription className="mb-4">
                      Add custom CSS that will be applied globally
                    </CardDescription>
                    <div className="border rounded-lg p-4 bg-gray-50 min-h-48">
                      <pre className="text-sm text-gray-500">
                        {template?.globalCSS || "/* Add your custom CSS here */"}
                      </pre>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <CardTitle>Header/Footer Scripts</CardTitle>
                    <CardDescription className="mb-4">
                      Add scripts that will be loaded in the header or footer
                    </CardDescription>
                    <Tabs defaultValue="header">
                      <TabsList>
                        <TabsTrigger value="header">Header</TabsTrigger>
                        <TabsTrigger value="footer">Footer</TabsTrigger>
                      </TabsList>
                      <TabsContent value="header" className="pt-4">
                        <div className="border rounded-lg p-4 bg-gray-50 min-h-48">
                          <pre className="text-sm text-gray-500">
                            {template?.headerScripts || "<!-- Add header scripts here -->"}
                          </pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="footer" className="pt-4">
                        <div className="border rounded-lg p-4 bg-gray-50 min-h-48">
                          <pre className="text-sm text-gray-500">
                            {template?.footerScripts || "<!-- Add footer scripts here -->"}
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}