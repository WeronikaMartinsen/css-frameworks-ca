/* import { load } from "../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA } from "../api/constants.js";

export async function updateProfile(update) {
  const token = load("token");
  const currentUser = load("profile");

  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${currentUser.userName}${MEDIA}`;
  try {
    const updateProfile = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    };

    const response = await fetch(updateProfileURL, updateProfile);
    const result = await response.json();

    if (response.ok) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
 */
