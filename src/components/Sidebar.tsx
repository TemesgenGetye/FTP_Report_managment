import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Home,
  FileText,
  List,
  Clock,
  CheckSquare,
  User,
  Bell,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "All Reports", path: "/reports" },
    { icon: List, label: "All plans", path: "/plans" },
    { icon: Clock, label: "Drafts", path: "/reports/drafts" },
    { icon: CheckSquare, label: "Submitted", path: "/reports/submitted" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];


  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold w-10/12">Menu</h1>
        <Menu className="w-6 h-6" />
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
              location.pathname === item.path ? "bg-gray-800 text-white" : ""
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Link to={"/faq"} className="fixed flex items-center px-6 py-3 bottom-4 left-0 text-center text-blue-400 underline">Help and Suport</Link>
    </div>
  );
}
