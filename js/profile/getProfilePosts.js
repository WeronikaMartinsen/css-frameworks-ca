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
    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      console.error("Error fetching profile posts:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching profile posts:", error);
  }
}
