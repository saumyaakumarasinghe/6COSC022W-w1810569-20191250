import axios from "axios";

// This is the base URL where your backend is running
const baseURL = "http://localhost:8000/api/v1";

// Create an axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// This will be called before each request to add auth headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  // Add the token to the headers if it exists
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Add the API key to the headers if it exists
  if (apiKey) {
    config.headers["x-api-key"] = apiKey;
  }

  return config;
});

// This function will handle login
export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post("/oauth/login", {
      email,
      password,
    });

    // Store the tokens in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("apiKey", response.data.apiKey);
    }

    return response.data;
  } catch (error) {
    // If something goes wrong, throw the error
    throw error;
  }
}

export default api;
