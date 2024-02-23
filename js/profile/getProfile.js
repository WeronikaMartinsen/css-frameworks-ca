/* import { load } from "../api/storeToken.js";

import { API_BASE_URL, PROFILES, authorName } from "../api/constants.js";

export async function getProfile() {
  const getProfileURL = `${API_BASE_URL}${PROFILES}/${authorName}`;

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
      return currentUser;
    }
  } catch (error) {
    console.error(error);
  }
}
 */
