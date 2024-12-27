import React, { useEffect, useState } from "react";
import { Bell, LogOut, Search, User } from "lucide-react";
import { getCurrentUser } from "../api/user";

interface User {
  name: string;
}

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">
              {currentUser?.user?.name}
            </span>
            <div className="flex item-center gap-2">
              <User className="w-8 h-8 p-1 bg-gray-200 rounded-full" />
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <span className="flex item-center gap-2">
                  <LogOut />
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
