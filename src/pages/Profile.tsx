import React, { useEffect, useState } from "react";
import UserProfile from "../components/users/UserProfile";
import { getCurrentUser } from "../api/user";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, [setUser]);

  if (!user) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      {loading && <LoadingSpinner />}
      <UserProfile user={user?.user} onUpdate={() => {}} />
    </div>
  );
}
