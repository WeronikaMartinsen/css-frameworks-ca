import { load } from "./getToken.js";

export function headers() {
  const token = load("token");
  if (!token) {
    throw new Error("Token not available.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error in authFetch:", error.message);
    throw error; // Rethrow the error to allow the caller to handle it
  }
}
