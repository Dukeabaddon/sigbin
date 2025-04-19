
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Settings,
  FileText,
  BatteryCharging,
} from "lucide-react";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: BatteryCharging,
      label: "Bin Status",
      path: "/",
    },
    {
      icon: BarChart,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: FileText,
      label: "System Logs",
      path: "/logs",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center min-w-[4rem] px-2 py-1 rounded-lg",
            location.pathname === item.path
              ? "text-green-600"
              : "text-gray-600 hover:text-green-600"
          )}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
