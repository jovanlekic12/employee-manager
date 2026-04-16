import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://employee-manager-rr86.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
