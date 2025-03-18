import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search, ChevronDown, Brain, Cloud, ChevronRight, Badge } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, Divider } from "antd";
import { FaCloudflare } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "@/constant/constant";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch templates added by the logged-in user
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);

        // Get the logged-in user's ID
        const user = Cookies.get("user");
        const userdetails = JSON.parse(user);
        const userId = userdetails?._id;

        if (!userId) {
          console.error("User ID not found");
          setIsLoading(false);
          return;
        }

        // Fetch templates created by the logged-in user
        const response = await axios.get(
          `${AppRoutes.template}?userID=${userId}`
        );
        console.log("Templates Response:", response.data);

        setTemplates(response.data); // Set the fetched templates
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

    const authToken = Cookies.get("authToken"); // Check if user is authenticated
  

  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />
      <div className="mx-auto w-full mt-12 ml-16 p-6 space-y-6">
        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <button className="flex items-center gap-4 rounded-lg border p-4 text-left hover:border-gray-400 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B5132C] text-white">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-semibold">Create a website</h2>
              <p className="text-sm text-gray-500">
                Use AI, templates or themes
              </p>
            </div>
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-4 rounded-lg border p-4 text-left hover:border-gray-400 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B5132C] text-white">
                  <FaCloudflare className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-semibold">Create a custom website</h2>
                  <p className="text-sm text-gray-500">
                    Manually design and customize your website.
                  </p>
                </div>
              </button>
            </PopoverTrigger>
          </Popover>
        </div>
        <Divider className="w-full" orientation="right">
          Websites: 1 of 1
        </Divider>
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4">
            <Checkbox id="select-all" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {/* Add more filter options as needed */}
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
        {/* Template Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Show loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-4 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg"></div>
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))
          ) : templates.length > 0 ? (
            // Show templates
            templates.map((template) => (
              <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                      <div className="aspect-video overflow-hidden bg-muted/30">
                        <img
                          src={
                            template.image ||
                            "/placeholder.svg?height=200&width=400"
                          }
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {template.name}
                          </CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            {template.category}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2 line-clamp-2">
                          {template.description || "No description available"}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between gap-4 pt-2 pb-4 ">
                        <Button
                          variant="outline"
                          className="flex-1 transition-colors text-white hover:bg-white hover:text-black"
                          onClick={() => handlePreview(template)}
                        >
                          Preview
                        </Button>
                        {authToken ? (
                          <Button
                            variant="outline"
                            className="flex-1 text-white hover:bg-white hover:text-black"
                            onClick={() => handleUseTemplate(template)}
                          >
                            Use Template
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="flex-1 text-white hover:bg-white hover:text-black"
                            onClick={() => {
                              toast.error(
                                "You need to be logged in to use this template."
                              );
                              setTimeout(() => {
                                navigate("/login");
                              }, 2000); // Adjust the delay as needed
                            }}
                          >
                            Use Template
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
            ))
          ) : (
            // Show message if no templates are found
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No templates found. Create one to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
