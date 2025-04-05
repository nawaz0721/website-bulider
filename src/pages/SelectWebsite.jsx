"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import WebsiteCard from "@/components/WebsiteCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import CreateCustomModal from "@/components/CreateCustomModal";
import WordPressSetupModal from "@/components/WordPressSetupForm";

const websites = []; // Empty array means no websites exist

export default function SelectWebsite() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWordpressModalOpen, setIsWordpressModalOpen] = useState(false);
  const [isWordpressProgressModalOpen, setIsWordpressProgressModalOpen] = useState(false);
  const [wordpressFormData, setWordpressFormData] = useState(null);

  const handleWordPressInstall = async (formData) => {
    setIsWordpressModalOpen(false);
    setWordpressFormData(formData);
    setIsWordpressProgressModalOpen(true);
  };

  const handleCustomWebsiteClick = () => {
    setIsModalOpen(true);
  };

  const user = Cookies.get("user");
  const userdetails = JSON.parse(user);

  return (
    <>
      <Header />
      <div className="mx-auto w-full space-y-6">
        {websites.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="mb-12 max-w-3xl">
                <h2 className="text-lg font-medium mb-2">
                  <span className="mr-2">👋</span>
                  Hey {userdetails.firstname + " " + userdetails.lastname}
                </h2>
                <h1 className="text-3xl font-bold mb-2">
                  How do you want to build your website?
                </h1>
                <p className="text-gray-600">
                  Choose between AI-assisted website creation or fully custom
                  design.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Use AI Wordpress to create your website
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Let AI generate content and images for you.
                  </p>
                  <Button
                    onClick={() => setIsWordpressModalOpen(true)}
                    className="text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"
                    variant="outline"
                  >
                    Start with AI Wordpress
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Create a custom website
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Manually design and customize your website.
                  </p>
                  <Button
                    onClick={handleCustomWebsiteClick}
                    className="text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-black"
                    variant="outline"
                  >
                    Start Custom
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateCustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <WordPressSetupModal
        isOpen={isWordpressModalOpen}
        onClose={() => setIsWordpressModalOpen(false)}
        onInstall={handleWordPressInstall}
        isProgressModalOpen={isWordpressProgressModalOpen}
        setIsProgressModalOpen={setIsWordpressProgressModalOpen}
        formData={wordpressFormData}
      />
    </>
  );
}