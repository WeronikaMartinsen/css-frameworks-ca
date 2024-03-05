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
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null; // or handle the error appropriately
    }

    const currentUser = await response.json();
    console.log("got profiles", currentUser);
    return currentUser;
  } catch (error) {
    console.error(error);
    return null; // or handle the error appropriately
  }
}
