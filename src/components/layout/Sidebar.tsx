
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
    { to: "/", label: "Ana Sayfa", icon: <Home className="h-5 w-5" /> },
    { to: "/patient-cases", label: "Hasta Vakaları", icon: <Book className="h-5 w-5" /> },
    { to: "/product-info", label: "Ürün Bilgileri", icon: <MessageSquare className="h-5 w-5" /> },
    { to: "/ai-assistant", label: "AI Asistan", icon: <Filter className="h-5 w-5" /> },
    { to: "/faq", label: "SSS", icon: <User className="h-5 w-5" /> },
    { to: "/profile", label: "Profil", icon: <User className="h-5 w-5" /> }
  ];

  return (
    <div className="hidden border-r bg-background md:block w-64 overflow-y-auto">
      <div className="flex flex-col h-full py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-primary">NEU-GUARD</h2>
          <p className="text-xs text-muted-foreground">NEUTEC İlaç</p>
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
          <h3 className="mb-2 px-3 text-xs font-medium text-muted-foreground">Hızlı Erişim</h3>
          <div className="space-y-1">
            <NavLink
              to="/favorites"
              icon={<Star className="h-5 w-5" />}
              label="Favoriler"
              isActive={currentPath === "/favorites"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
