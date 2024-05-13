/* eslint-disable no-undef */
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://performance-review-backend.onrender.com";
const fetcher = axios.create({
  baseURL,
});

export function get_default_api(url) {
  return fetcher.get(url);
}
export function post_default_api(url, { arg }) {
  return fetcher.post(url, arg);
}
export function put_default_api(url, { arg }) {
  return fetcher.put(url, arg);
}
export function delete_default_api(url) {
  return fetcher.delete(url);
}
