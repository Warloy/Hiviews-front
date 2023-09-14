import axios from "axios";

export const baseURL = "/api/v1";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export type TResponseData = {
  message?: string;
  error?: string;
  statusCode?: number
  data?: any;
};