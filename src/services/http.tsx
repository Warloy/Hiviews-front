import axios from "axios";

export const baseURL = "/api/v1";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export const getConnection = async () => {
  const { data, status } = await http.get("/", {
    validateStatus: (status) => {
      return status < 500;
    }
  });
  return { data, status };
};

export type TResponseData = {
  message?: string;
  error?: string;
  statusCode?: number
  data?: any;
};
