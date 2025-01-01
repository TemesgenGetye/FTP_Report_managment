import { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { getCurrentUser } from "../api/user";
import { Link } from "react-router-dom";

interface User {
  name: string;
}

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const role = localStorage.getItem("role");

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
        <div className="text-2xl font-bold">{role}</div>

        {/* Notification and User Info */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <Link
            to={"/notifications"}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Link
              to={"/profile"}
              className=" flex items-center gap-2 text-sm font-medium"
            >
              {currentUser?.user?.name}
              <FaUserCircle className="w-8 h-8 text-gray-400" />
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to={"/"}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full flex items-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
