import { API_SOCIAL_URL, name, API_POSTS } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";

export async function getProfiles() {
  const updateProfileURL = `${API_SOCIAL_URL}${action}`;

  const response = await authFetch(updateProfileURL);

  return await response.json();
}

export async function getProfile(name) {
  if (!name) {
    throw new Error("Required a name!");
  }
  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;

  const response = await authFetch(getProfileURL);

  return await response.json();
}
