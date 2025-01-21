import React, { useEffect, useState } from "react";
import { User as UserIcon, Mail, Building, Badge } from "lucide-react";
import type { User } from "../../types";
import LoadingSpinner from "../common/LoadingSpinner";
import { updateUser } from "../../api/user";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title);
  const [headOffice, setHeadOffice] = useState(user.head_office);

  async function handleSave() {
    const updatedUser = {
      name,
      role,
      email,
      title,
      head_office: headOffice,
    };

    console.log(updatedUser);

    const response = await updateUser(updatedUser);
    if (response.success) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
  }
  useEffect(() => {
    setName(user.name);
    setRole(user.role);
    setEmail(user.email);
    setTitle(user.title);
    setHeadOffice(user.head_office);
  }, [user]);

  if (!user) return <LoadingSpinner />;
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-gray-500" />
          </div>
          <div className="ml-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 text-2xl min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md  focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md  focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Badge className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Head Office
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Building className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={headOffice}
                onChange={(e) => setHeadOffice(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
