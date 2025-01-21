import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import DraftReports from "./pages/DraftReports";
import SubmittedReports from "./pages/SubmittedReports";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import { getCurrentUser } from "./api/user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setIsLoggedIn(true);
      }
    }
    fetchUser();
  }, []);

  if (!isloggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/drafts" element={<DraftReports />} />
              <Route path="/reports/submitted" element={<SubmittedReports />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
