
import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User, ShieldCheck, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="hidden text-xl font-bold sm:inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TeraGuard
              </span>
            </div>
          </Link>
        </div>
        
        <div className="relative hidden w-1/3 lg:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for medication or active ingredient..."
            className="w-full pl-8"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
