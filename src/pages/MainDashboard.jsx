import { SidebarProvider } from "@/components/ui/sidebar";
import { Search, ChevronDown, Brain, Cloud, ChevronRight } from "lucide-react";
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
import { Divider } from "antd";
import { FaCloudflare } from "react-icons/fa";
import WebsiteCard from "@/components/WebsiteCard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default function Dashboard() {
  return (
    <SidebarProvider>
        <Navbar/>
      {/* <SidebarLayout /> */}
      <Sidebar/>
      {/* <Header /> */}
      {/* <Hero /> */}
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
                {/* <ChevronDown className="ml-auto h-5 w-5" /> */}
              </button>
            </PopoverTrigger>
            {/* <PopoverContent className="w-72 bg-black p-0" align="start">
              <div className="flex flex-col text-white">
                <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors">
                  Automated 1-click migration
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors">
                  Migrate from a backup zip file
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </PopoverContent> */}
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
        {/* Website Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WebsiteCard />
        </div>
      </div>
    </SidebarProvider>
  );
}