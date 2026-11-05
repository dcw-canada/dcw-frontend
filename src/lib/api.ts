import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL must be set to the backend API base URL.');
}

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;
