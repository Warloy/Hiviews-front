import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  validateStatus: (status) => {
    return status < 500;
  }
});

export const getConnection = async () => {
  const { data, status } = await http.get("/connected");
  return { data, status };
};

export type TResponseData = {
  message?: string;
  error?: string;
  statusCode?: number
  data?: any;
  token?: string;
};
