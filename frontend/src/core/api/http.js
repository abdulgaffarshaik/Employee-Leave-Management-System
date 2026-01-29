const BASE_URL = "http://localhost:5000/api";

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    body: options.body,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    }
  });

  // 🔐 Handle unauthorized
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return Promise.reject("Unauthorized");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request Failed");
  }

  return data;
};
