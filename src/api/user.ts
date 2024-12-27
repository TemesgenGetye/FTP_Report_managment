const API_URL = "https://report-managment-latest.onrender.com/api";
const token = localStorage.getItem("token");

export const signUp = async (data) => {
  const response = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to sign up");
  return {
    success: response.ok,
    data: response.json(),
  };
};

export const signIn = async (data) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to sign in");
  return response.json();
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch reports");
  return response.json();
};

export const updateUser = async (data) => {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return {
    success: response.ok,
    data: response.json(),
  };
};

export const getUserByRole = async (role: string) => {
  const response = await fetch(`${API_URL}/user/${role}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch reports");
  return response.json();
};
