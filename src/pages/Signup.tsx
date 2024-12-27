import React, { useEffect, useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { HEAD_OFFICE_OPTIONS } from "../types/user";
import { getUserByRole, signUp } from "../api/user";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    title: "",
    head_office: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toFetch, setToFetch] = useState("strategic_planner");

  useEffect(() => {
    if (formData.role === "strategic_planner") {
      setToFetch("none");
    } else if (formData.role === "vice_president") {
      setToFetch("strategic_planner");
    } else if (formData.role === "din") {
      setToFetch("vice_president");
    }
  }, [formData.role]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        setIsLoading(true);
        const response = await getUserByRole(toFetch);
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOptions();
  }, [toFetch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const reponse = await signUp(formData);
    if (reponse.success) {
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Full name"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <Select
          label="Role"
          name="role"
          options={HEAD_OFFICE_OPTIONS.map((option) => ({
            id: option.id,
            label: option.label,
            value: option.value,
          }))}
          required
          value={formData.role}
          onChange={handleChange}
        />

        <Input
          label="Title"
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
        />
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <Select
            label="Head Office"
            name="head_office"
            options={options?.map((opt) => ({
              id: opt?.id,
              label: opt?.name,
              value: opt?.id,
            }))}
            required
            value={formData.head_office}
            onChange={handleChange}
            disabled={formData.role === "strategic_planner"}
          />
        )}

        <Input
          label="Password"
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create account
        </button>

        <div className="text-sm text-center">
          <a
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
