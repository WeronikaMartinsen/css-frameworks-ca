import { API_BASE_URL, PROFILES } from "../api/constants.js";

import { load } from "../api/storeToken.js";

export async function getProfiles() {
  const getProfileURL = `${API_BASE_URL}${PROFILES}`;
  const token = load("token");

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const currentUser = await response.json();

    return currentUser;
  } catch (error) {
    return null;
  }
}
