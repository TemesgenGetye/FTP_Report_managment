import React, { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { signIn } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const responce = await signIn({ email, password });
    console.log(responce.user);
    if (responce.user.status === 200) {
      navigator("/");
      localStorage.setItem("token", responce.user.access_token);
      localStorage.setItem("role", responce.user.user_data.role);
      localStorage.setItem("id", responce.user.user_data.id);
      window.location.reload();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>

        <div className="text-sm text-center">
          <a
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
