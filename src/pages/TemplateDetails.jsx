"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, MoreVertical, ExternalLink } from "lucide-react";
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

export default function TemplateDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("pages");
  const [template, setTemplate] = useState(null);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  // Fetch template details and pages
  const fetchTemplateDetails = async () => {
    try {
      const response = await axios.get(`${AppRoutes.userTemplate}/${id}`);
      const templateData = response.data;

      setTemplate(templateData);
      setPages(templateData.pages || []);
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

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Section */}
          <div className="w-64 border-r bg-gray-50 flex flex-col p-3">
            <Card
              key={template?._id}
              className="overflow-hidden border-0 shadow-md"
            >
              <img
                src={template?.image || "/placeholder.svg?height=200&width=400"}
                alt={template?.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="bg-white p-3 flex flex-col">
                <CardTitle className="text-xl">{template?.name}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">
                  {template?.description || "No description available"}
                </CardDescription>
              </div>
            </Card>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <Tabs defaultValue="pages" className="flex-1 flex flex-col">
              <div className="border-b">
                <TabsList className="px-4">
                  {["Pages", "Header", "Footer"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className={`${
                        activeTab === tab.toLowerCase()
                          ? "border-b-2 border-blue-500"
                          : ""
                      }`}
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
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleEditTemplate}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Use Template
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Edit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.length > 0 ? (
                      pages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            {page.name}
                          </TableCell>
                          <TableCell className="text-blue-500">
                            /{page.id}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() =>
                                navigate(`/editor/${id}`)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan="3"
                          className="text-center text-gray-500 py-4"
                        >
                          No pages found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Header Tab */}
              {/* <TabsContent value="header" className="flex-1 p-4 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">
                  Header Components
                </h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Edit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {headerComponents.length > 0 ? (
                      headerComponents.map((header) => (
                        <TableRow key={header.id}>
                          <TableCell>{header.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() =>
                                navigate(`/editor/${id}/${header.id}`)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan="2"
                          className="text-center text-gray-500 py-4"
                        >
                          No headers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent> */}

              {/* Footer Tab */}
              {/* <TabsContent value="footer" className="flex-1 p-4 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">
                  Footer Components
                </h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Edit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {footerComponents.length > 0 ? (
                      footerComponents.map((footer) => (
                        <TableRow key={footer.id}>
                          <TableCell>{footer.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={() =>
                                navigate(`/editor/${id}/${footer.id}`)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan="2"
                          className="text-center text-gray-500 py-4"
                        >
                          No footers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent> */}
            {["header", "footer"].map((tab) => (
              <TabsContent key={tab} value={tab} className="flex-1 p-4">
                <div className="flex items-center justify-center h-full text-gray-500">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} content would be
                  displayed here
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
