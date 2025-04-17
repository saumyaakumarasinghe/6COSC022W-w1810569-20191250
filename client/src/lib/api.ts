import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
});

// Add a request interceptor to include auth headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api };

interface LoginResponse {
  token: string;
  userId: number;
  apiKey: string;
  role: "ADMIN" | "USER";
}

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

export default api;
