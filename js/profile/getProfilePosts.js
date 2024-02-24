import { API_BASE_URL, POSTS, PROFILES } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { authorName } from "../api/constants.js";

export async function getProfilePosts() {
  const getProfilePostsURL = `${API_BASE_URL}${PROFILES}/${authorName}${POSTS}`;

  const token = load("token");

  try {
    const response = await fetch(getProfilePostsURL, {
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
