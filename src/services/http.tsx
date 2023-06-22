import axios from 'axios'

export const URL = ''

export const http = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})