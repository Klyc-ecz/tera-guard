
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Book, MessageSquare, Filter, User, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, icon, label, isActive }: NavLinkProps) => (
  <Link to={to} className="w-full">
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-primary text-white"
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { to: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { to: "/drug-info", label: "Drug Information", icon: <Book className="h-5 w-5" /> },
    { to: "/consult", label: "Ask / Consult", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/risk-analysis", label: "Risk Analysis", icon: <Filter className="h-5 w-5" /> },
    { to: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> }
  ];

  return (
    <div className="hidden border-r bg-background md:block w-64 overflow-y-auto">
      <div className="flex flex-col h-full py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">TeraGuard</h2>
        </div>
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={
                  currentPath === item.to || 
                  (item.to !== "/" && currentPath.startsWith(item.to))
                }
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 px-3 py-2">
          <h3 className="mb-2 px-3 text-xs font-medium text-muted-foreground">Favorites</h3>
          <div className="space-y-1">
            <NavLink
              to="/favorites"
              icon={<Star className="h-5 w-5" />}
              label="Saved Medications"
              isActive={currentPath === "/favorites"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
