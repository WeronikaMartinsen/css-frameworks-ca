import { API_BASE_URL, POSTS, PROFILES } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { authorName } from "../api/constants.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
  delay,
} from "../global/functions/loader.js";

import { handleError } from "../global/functions/handleError.js";

export async function getProfilePosts() {
  const getProfilePostsURL = `${API_BASE_URL}${PROFILES}/${authorName}${POSTS}`;
  const token = load("token");

  try {
    showLoadingIndicator();
    await delay(3000);

    const response = await fetch(getProfilePostsURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const posts = await response.json();
      hideLoadingIndicator();
      return posts;
    }
  } catch (error) {
    handleError("Error fetching users posts.");
  }
}
