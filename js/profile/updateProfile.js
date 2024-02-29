/* import { load } from "../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA, authorName } from "../api/constants.js";

export async function updateProfile(update) {
  const token = load("token");

  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${authorName}${MEDIA}`;
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
    } else {
      console.error("Error updating profile. Server response:", result);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}
 */
