import {
  API_SOCIAL_URL,
  API_PROFILES,
  authorName,
  API_POSTS,
} from "../constants.js";
import { load } from "../getToken.js";
import { authFetch } from "../authorizationFetch.js";
import { loadingIndicator } from "../../global.js/loading.indicator.js";

export async function getUserPost() {
  loadingIndicator();

  const getUserPostURL = `${API_SOCIAL_URL}${API_PROFILES}/${authorName}${API_POSTS}`;
  const token = load("token");
  console.log("Token:", token);

  try {
    const response = await authFetch(getUserPostURL);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonData = await response.json();

    // Log the retrieved JSON data
    console.log("JSON Data:", jsonData);

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to allow the caller to handle it
  }
}
