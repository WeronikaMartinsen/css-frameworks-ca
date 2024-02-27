import { load } from "../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA, authorName } from "../api/constants.js";

export async function updateProfile(data) {
  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${authorName}${MEDIA}`;
  const token = load("token");

  try {
    const response = await fetch(updateProfileURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error updating profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
