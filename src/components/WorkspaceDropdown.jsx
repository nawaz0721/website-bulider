import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TiUserAdd } from "react-icons/ti";
const WorkspaceDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-start gap-1 outline-none text-xs ">
        <div>
          <h1 className="text-left text-xs font-semibold">
            Salar{"'"}s Workspace
          </h1>
          <p className="text-left text-xs text-gray-200">Role: Owner</p>
        </div>
        <ChevronDown className="h-3 w-3 mt-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] text-xl border bg-white" align="start">
        {/* Header */}
        <div className="flex items-center p-4 gap-3 border-b">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600 text-white font-medium text-lg">
            S
          </div>
          <div>
            <h2 className="text-xs font-semibold">Salar{"'"}s Workspace</h2>
            <p className="text-xs text-gray-500">Role: Owner</p>
          </div>
        </div>
        {/* Plan Status */}
        <div className="p-4 border-b bg-gray-100">
          <p className="text-xs font-extralight text-gray-600">
            Workspace is currently on Web4x{"'"}s Free Plan. <br />
            <a
              href="#"
              className="text-blue-600 text-xs underline hover:underline"
            >
              Pricing
            </a>
          </p>
        </div>
        {/* User & Team Management Section */}
        <div className="p-3 border-b">
          <DropdownMenuLabel className="text-xs font-medium text-gray-500">
            User & Team
          </DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <DropdownMenuItem className="py-0.5 bg-white hover:text-gray-400 text-[13px] font-medium">
              Users
            </DropdownMenuItem>
            <Button
              size="sm"
              className="h-8 px-2 flex items-center justify-center text-base bg-emerald-500 hover:bg-emerald-600"
            >
              <TiUserAdd />
              Invite
            </Button>
          </div>
        </div>
        {/* Activity & White Label */}
        <div className="p-3 border-b space-y-0.5">
          <DropdownMenuItem className="py-0.5 hover:text-gray-400 text-[13px] font-medium">
            Activity Log
          </DropdownMenuItem>
          <DropdownMenuItem className="py-0.5 hover:text-gray-400 text-[13px] font-medium">
            White label
          </DropdownMenuItem>
        </div>
        {/* Workspace Settings */}
        <div className="p-3">
          <DropdownMenuLabel className="text-xs font-medium text-gray-500">
            Workspace Settings
          </DropdownMenuLabel>
          <div className="space-y-0.5">
            <DropdownMenuItem className="py-0.5 hover:text-gray-400 text-[13px] font-medium">
              Workspace Info
            </DropdownMenuItem>
            <DropdownMenuItem className="py-0.5 hover:text-gray-400 text-[13px] font-medium">
              Subscription Plan
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WorkspaceDropdown;