import { Layers, UserCircle, LogOut, LayoutDashboard } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("user");
    console.log(userData);
    
    if (token) {
      setAuthToken(token);
      if (userData) setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full pl-5 pr-5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">WebCraft</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link to="/templates" className="text-sm font-medium hover:text-primary">
            Templates
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {authToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                <UserCircle className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{user?.firstname || "User"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white">
                <DropdownMenuItem className="bg-white hover:bg-slate-200" onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4 mr-2 " />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-white hover:bg-slate-200" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button className="text-sm font-medium">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
