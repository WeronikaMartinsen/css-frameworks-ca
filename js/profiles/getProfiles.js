import { load } from "../api/storeToken.js";

import { API_BASE_URL, PROFILES } from "../api/constants.js";

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
    const currentUser = await response.json();
    if (response.ok) {
      console.log("got profiles");
      return currentUser;
    }
  } catch (error) {
    console.error(error);
  }
}
