import { API_SOCIAL_URL, API_POSTS, author } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";

export async function getProfiles() {
  const updateProfileURL = `${API_SOCIAL_URL}${action}`;

  const response = await authFetch(updateProfileURL);

  return await response.json();
}

export async function getProfile(author) {
  const getProfileURL = `${API_SOCIAL_URL}${action}/${author}`;

  const response = await authFetch(getProfileURL);

  return await response.json();
}

export async function getUserPosts() {
  const getUserPostURL = `${API_SOCIAL_URL}${action}/${author}${API_POSTS}`;
  const response = await authFetch(getUserPostURL);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `Request failed with status ${response.status}. ${errorMessage}`
    );
  }

  return await response.json();
}
