import axios from "axios";
let accessToken = ""
if (typeof window !== 'undefined') {
 accessToken = localStorage.getItem("accessToken");
}

export const apiClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiClientWithToken = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
