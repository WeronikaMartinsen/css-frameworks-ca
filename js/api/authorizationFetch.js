import { load } from "../getToken";

export function headers() {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bear ${token}`
  },
}

export async function authFetch(url, options) {
  return fetch(url, {
    ...options,
    headers: headers()
  })
}
