import { API_BASE_URL, PROFILES } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { handleError } from "../global/functions/handleError.js";

/**
 * Fetches the profiles from the server.
 * @async
 * @function getProfiles
 * @returns {Promise<Object[] | null>} A Promise that resolves to an array of profiles or null if an error occurs.
 * @throws {Error} Throws an error if there is an issue fetching profiles.
 */

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
    handleError("Error fetching profiles.");
    return null;
  }
}
