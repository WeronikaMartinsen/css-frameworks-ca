import { API_POSTS, API_SOCIAL_URL, name } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";

export async function getUserPost() {
  const getUserPostURL = `${API_SOCIAL_URL}${action}/${name}${API_POSTS}`;

  const response = await authFetch(getUserPostURL);

  return await response.json();
}
