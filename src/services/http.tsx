import axios from "axios";

export const baseURL = "";

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});