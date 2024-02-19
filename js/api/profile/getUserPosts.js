import { API_SOCIAL_URL, API_POSTS, author } from "../constants.js";
import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";

export async function getUserPosts() {
  const getUserPostURL = `${API_SOCIAL_URL}${action}/${author}${API_POSTS}`;

  try {
    const response = await authFetch(getUserPostURL);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}. ${errorMessage}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getUserPosts:", error.message);
    throw error;
  }
}
