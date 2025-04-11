"use client"

import { FaUser, FaLock, FaBuilding, FaSignOutAlt } from "react-icons/fa"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

const UserDropdown = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || null)

  // Get logged-in user details
  const user = Cookies.get("user")
  const userdetails = JSON.parse(user)

  const handleLogout = () => {
    Cookies.remove("authToken")
    Cookies.remove("user")
    navigate("/login")
    setAuthToken(null)
  }

  // Get initials for avatar
  const getInitials = () => {
    if (!userdetails) return "U"
    return `${userdetails.firstname?.[0] || ""}${userdetails.lastname?.[0] || ""}`
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-10 w-10 rounded-full border-2 border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
        >
          {userdetails?.avatar ? (
            <AvatarImage
              src={userdetails.avatar || "/placeholder.svg"}
              alt={userdetails.firstname}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
              {getInitials()}
            </div>
          )}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 p-0 overflow-hidden"
        align="end"
        sideOffset={8}
        alignOffset={0}
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {/* User Profile Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                {userdetails?.avatar ? (
                  <AvatarImage src={userdetails.avatar || "/placeholder.svg"} alt={userdetails.firstname} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                    {getInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {userdetails.firstname} {userdetails.lastname}
                </span>
                <span className="text-xs text-gray-600 truncate max-w-[200px]">{userdetails.email}</span>
                <Link to="/profile" className="text-xs text-blue-600 hover:text-blue-800 hover:underline mt-1">
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="p-2">
            <DropdownMenuLabel className="text-xs font-medium text-gray-500 px-3 py-2">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem className="px-3 py-2.5 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaUser className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Personal Information</span>
                    <span className="text-xs text-gray-500">Update your profile details</span>
                  </div>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="px-3 py-2.5 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <FaLock className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Login Info & Security</span>
                  <span className="text-xs text-gray-500">Manage your password and security</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="px-3 py-2.5 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FaBuilding className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Workspace Access</span>
                  <span className="text-xs text-gray-500">Manage workspace permissions</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>

          <DropdownMenuSeparator className="my-1" />

          {/* Sign Out */}
          <div className="p-2">
            <DropdownMenuItem
              className="px-3 py-2.5 rounded-md flex items-center gap-3 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
              onClick={handleLogout}
            >
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <FaSignOutAlt className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Sign Out</span>
                <span className="text-xs text-red-500">Log out of your account</span>
              </div>
            </DropdownMenuItem>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
