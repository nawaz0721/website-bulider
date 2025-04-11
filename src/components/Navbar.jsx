"use client"

import { useState, useEffect } from "react"
import { Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaBookOpen, FaBell } from "react-icons/fa"
import { IoPieChart } from "react-icons/io5"
import { Tooltip } from "antd"
import TalkToSales from "./TalkToSales"
import UserDropdown from "./UserDropdown"
import WorkspaceDropdown from "./WorkspaceDropdown"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 border-b border-gray-200 bg-[#B5132C] text-white z-20">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {/* Logo is hidden on mobile as it's in the sidebar */}
            <div className="hidden md:block h-8 w-8 ml-12">
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <rect width="24" height="24" fill="black" />
              </svg>
            </div>

            {/* Workspace dropdown - hidden on mobile */}
            <div className="hidden md:block">
              <WorkspaceDropdown />
            </div>

            {/* Divider - hidden on mobile */}
            <div className="hidden md:block ml-4 h-14 w-px bg-red-400" />
          </div>

          {/* Center Section - Domain Button */}
          <div className={cn("absolute left-1/2 transform -translate-x-1/2", isMobile ? "hidden" : "block")}>
            <Button
              className="text-black bg-white hover:text-white hover:bg-black transition-colors border-white"
              variant="outline"
            >
              Get Free Custom Domain
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Talk to Sales - hidden on mobile */}
            <div className="hidden md:block">
              <TalkToSales />
            </div>

            {/* Divider - hidden on mobile */}
            <div className="hidden md:block mx-2 h-6 w-px bg-red-400" />

            {/* Icons - some hidden on mobile */}
            <div className="hidden sm:block">
              <Tooltip placement="bottom" title="Progress indicator">
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-black hover:bg-transparent">
                  <Clock className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>

            {/* Divider - hidden on mobile */}
            <div className="hidden sm:block mx-2 h-6 w-px bg-red-400" />

            {/* Always visible icons */}
            <div className="hidden sm:flex items-center">
              <Tooltip placement="bottom" title="Knowledge base">
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-black hover:bg-transparent">
                  <FaBookOpen className="h-5 w-5" />
                </Button>
              </Tooltip>

              <Tooltip placement="bottom" title="Usage summary">
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-black hover:bg-transparent">
                  <IoPieChart className="h-5 w-5" />
                </Button>
              </Tooltip>
            </div>

            {/* Notifications - always visible */}
            <Tooltip placement="bottom" title="Notifications">
              <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-black hover:bg-transparent">
                <FaBell className="h-5 w-5" />
              </Button>
            </Tooltip>

            {/* User dropdown - always visible */}
            <UserDropdown />

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:hidden hover:text-black hover:bg-transparent ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-[#B5132C] border-b border-red-400 p-4 flex flex-col gap-4 sm:hidden z-30">
            <Button
              className="text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-white"
              variant="outline"
            >
              Get Free Custom Domain
            </Button>

            <div className="grid grid-cols-4 gap-2">
              <NavButton icon={<Clock className="h-5 w-5" />} label="Progress" />
              <NavButton icon={<FaBookOpen className="h-5 w-5" />} label="Knowledge" />
              <NavButton icon={<IoPieChart className="h-5 w-5" />} label="Usage" />
              <NavButton icon={<FaBell className="h-5 w-5" />} label="Notifications" />
            </div>

            <div className="pt-2 border-t border-red-400">
              <TalkToSales isMobile />
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

// Mobile nav button component
const NavButton = ({ icon, label }) => {
  return (
    <button className="flex flex-col items-center justify-center p-2 rounded-lg text-white hover:bg-red-800 transition-colors">
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

export default Navbar
