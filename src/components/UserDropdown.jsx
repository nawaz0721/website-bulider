import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const UserDropdown = () => {

  const navigate = useNavigate()
   // Get logged-in user details
    const user = Cookies.get("user");
    const userdetails = JSON.parse(user);
  
     const handleLogout = () => {
        Cookies.remove("authToken");
        Cookies.remove("user");
        navigate("/login");
        setAuthToken(null);
      };
    

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border-4"
        >
          <FaUser className="h-4 w-4 mx-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] bg-white" align="end">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-100">
              <FaUser className="h-5 w-5 text-gray-600" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userdetails.firstname + '' + userdetails.lastname}</span>
            <span className="text-xs text-gray-500">{userdetails.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-gray-500 px-3">
          Account Settings
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to={'/profile'}>
          <DropdownMenuItem className="px-3 py-2 gap-2" > 
            Personal Information
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="px-3 py-2 gap-2">
            Login Info & Security
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-2">
            Workspace Access
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2 text-red-600" onClick={handleLogout}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;