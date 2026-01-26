import { Zap, History, Compass, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import genpixLogo from "@/assets/genpix-logo.png";

const navItems = [
  { icon: Zap, label: "Generate", path: "/" },
  { icon: History, label: "History", path: "/history" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  credits?: number;
}

export function Sidebar({ credits = 1240 }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={genpixLogo} alt="GenPix" className="h-10 w-auto" />
        </Link>
        <span className="text-xs text-muted-foreground mt-1 block">PRO ENGINE v2.4</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Credits */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-genpix-cyan" />
          <span className="text-muted-foreground">Credits:</span>
          <span className="font-semibold text-foreground">{credits.toLocaleString()}</span>
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-genpix-purple to-genpix-cyan flex items-center justify-center text-sm font-semibold">
            AR
          </div>
          <div>
            <p className="text-sm font-medium">Alex Rivera</p>
            <p className="text-xs text-muted-foreground">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
