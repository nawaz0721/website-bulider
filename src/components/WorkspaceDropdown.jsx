"use client"

import { ChevronDown, Users, Activity, Settings, Zap, Crown, Briefcase, PlusCircle } from "lucide-react"
import { TiUserAdd } from "react-icons/ti"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

const WorkspaceDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-start gap-2 outline-none group">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm group-hover:shadow-md transition-all duration-200">
          S
        </div>
        <div>
          <h1 className="text-left text-sm font-semibold group-hover:text-blue-600 transition-colors">
            Salar{"'"}s Workspace
          </h1>
          <p className="text-left text-xs text-gray-400 flex items-center">
            <Crown className="h-3 w-3 mr-1 text-amber-500" />
            Owner
          </p>
        </div>
        <ChevronDown className={`h-4 w-4 mt-1.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[320px] text-xl border border-gray-100 bg-white rounded-xl shadow-xl p-0 overflow-hidden"
        align="start"
        sideOffset={8}
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-medium text-lg shadow-sm">
                S
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Salar{"'"}s Workspace</h2>
                <p className="text-xs text-gray-600 flex items-center">
                  <Crown className="h-3 w-3 mr-1 text-amber-500" />
                  Owner
                </p>
              </div>
            </div>
          </div>

          {/* Plan Status */}
          <div className="p-4 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Free Plan</p>
                  <p className="text-xs text-gray-600">Limited features</p>
                </div>
              </div>
              <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full px-3">
                Upgrade
              </Button>
            </div>
            <div className="mt-3 w-full bg-blue-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full w-[35%]"></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">3 of 10 projects used</p>
          </div>

          {/* User & Team Management Section */}
          <div className="p-3 border-b border-gray-100">
            <DropdownMenuLabel className="text-xs font-medium text-gray-500 px-2 py-1">User & Team</DropdownMenuLabel>

            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">Team Members</span>
              </div>
              <Button
                size="sm"
                className="h-8 px-3 flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-full"
              >
                <TiUserAdd className="h-4 w-4" />
                Invite
              </Button>
            </DropdownMenuItem>
          </div>

          {/* Activity & White Label */}
          <div className="p-3 border-b border-gray-100">
            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">Activity Log</span>
                <p className="text-xs text-gray-500">View recent activities</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">White Label</span>
                <p className="text-xs text-gray-500">Customize branding</p>
              </div>
            </DropdownMenuItem>
          </div>

          {/* Workspace Settings */}
          <div className="p-3">
            <DropdownMenuLabel className="text-xs font-medium text-gray-500 px-2 py-1">
              Workspace Settings
            </DropdownMenuLabel>

            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Settings className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">Workspace Info</span>
                <p className="text-xs text-gray-500">Manage workspace details</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Crown className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">Subscription Plan</span>
                <p className="text-xs text-gray-500">Manage your subscription</p>
              </div>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Create New Workspace */}
          <div className="p-3 bg-gray-50">
            <DropdownMenuItem className="px-3 py-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-white transition-colors">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <PlusCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">Create New Workspace</span>
                <p className="text-xs text-gray-500">Set up a new team space</p>
              </div>
            </DropdownMenuItem>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceDropdown
