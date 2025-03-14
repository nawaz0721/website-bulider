import { Clock } from "lucide-react";
  import { Button } from "@/components/ui/button";

  import { FaBookOpen, FaBell, FaUser } from "react-icons/fa";
  import { IoPieChart } from "react-icons/io5";
  import { Tooltip } from "antd";
  import TalkToSales from "./TalkToSales";
import UserDropdown from "./UserDropdown";
import WorkspaceDropdown from "./WorkspaceDropdown";
  const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 right-0 h-14 border-b ml-4 border-gray-200 bg-[#B5132C] text-white px-4">
        <div className="flex h-full items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8">
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <rect width="24" height="24" fill="black" />
              </svg>
            </div>
            <WorkspaceDropdown />
            <div className="ml-10 h-14 w-px bg-red-400" />
          </div>
          {/* Center Section */}
          <div className="mt-8 left-[26%] absolute -translate-x-1/2 -translate-y-1/2">
            <Button
              className="text-black bg-white hover:text-white hover:bg-black w-full transition-colors border-white"  variant="outline"
            >
              Get Free Custom Domain
            </Button>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-2">
            <TalkToSales />
            <div className="mx-2 h-6 w-px bg-red-400" />
            <Tooltip placement="bottom" title={"Progress indicator"}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:text-black hover:bg-transparent"
              >
                <Clock className="h-5 w-5" />
              </Button>
            </Tooltip>
            <div className="mx-2 h-6 w-px bg-red-400" />
            <Tooltip placement="bottom" title={"Knowledge base"}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:text-black hover:bg-transparent"
              >
                <FaBookOpen className="h-5 w-5" />
              </Button>
            </Tooltip>
            <Tooltip placement="bottom" title={"Usage summary"}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:text-black hover:bg-transparent"
              >
                <IoPieChart className="h-5 w-5" />
              </Button>
            </Tooltip>
            <Tooltip placement="bottom" title={"Notifications"}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:text-black hover:bg-transparent"
              >
                <FaBell className="h-5 w-5" />
              </Button>
            </Tooltip>
            <UserDropdown />
          </div>
        </div>
      </nav>
    );
  };
  export default Navbar;