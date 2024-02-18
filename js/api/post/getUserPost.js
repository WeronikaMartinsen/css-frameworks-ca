import { API_SOCIAL_URL, API_POSTS, API_PROFILES } from "../constants.js";
import { authFetch } from "../authorizationFetch.js";

export async function getUserPost(name) {
  if (!name) {
    throw new Error("Required a name!");
  }

  const getUserPostURL = `${API_SOCIAL_URL}${API_PROFILES}/${name}${API_POSTS}`;
  console.log("getUserPost URL:", getUserPostURL);

  try {
    const response = await authFetch(getUserPostURL);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text(); // Retrieve error message if available
      console.error(
        `Request failed with status ${response.status}. ${errorMessage}`
      );
      throw new Error(
        `Request failed with status ${response.status}. ${errorMessage}`
      );
    }

    const jsonData = await response.json();
    console.log("JSON Data:", jsonData);

    return jsonData;
  } catch (error) {
    console.error("Error in getUserPost:", error.message);
    throw error;
  }
}
