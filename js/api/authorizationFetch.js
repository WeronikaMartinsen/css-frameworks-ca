import { load } from "./getToken.js";

export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
export async function authFetch(url, options) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
