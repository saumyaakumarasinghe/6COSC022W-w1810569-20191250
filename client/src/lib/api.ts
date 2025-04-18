import axios from "axios";

// Create an Axios instance with a base URL from env or fallback
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
});

// Request interceptor: Attach auth token and API key to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    // Add Bearer token to Authorization header if present
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add API key header if available
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    // Reject the request if there's an error setting headers
    return Promise.reject(error);
  },
);

// Response interceptor: Normalize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Attach a friendly error message to the error object
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    } else if (error.response?.data?.error) {
      error.message = error.response.data.error;
    }
    return Promise.reject(error);
  },
);

export { api };

// Interface for login response payload
interface LoginResponse {
  token: string;
  userId: number;
  apiKey: string;
  role: "ADMIN" | "USER";
}

// Auth function: Calls the login API and returns typed response
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post("/oauth/login", { email, password });
  return {
    token: response.data.token,
    userId: response.data.userId,
    apiKey: response.data.apiKey,
    role: response.data.role,
  };
}

// Default export for the axios instance
export default api;
