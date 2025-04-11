import { Layers, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("user");
    
    if (token) {
      setAuthToken(token);
      if (userData) setUser(JSON.parse(userData));
    }

    // Add scroll listener for header effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 shadow-sm supports-[backdrop-filter]:bg-white/80" 
          : "bg-white/50 supports-[backdrop-filter]:bg-white/30"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                WebCraft
              </span>
            </Link>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/templates" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
              Templates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {authToken ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-2 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{user?.firstname || "User"}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1 bg-white shadow-lg rounded-lg border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.firstname} {user?.lastname}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                  </div>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50 rounded-md m-1 transition-colors"
                    onClick={() => navigate("/main-dashboard")}
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer hover:bg-red-50 rounded-md m-1 transition-colors text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
