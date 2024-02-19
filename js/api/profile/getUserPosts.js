import { API_SOCIAL_URL, API_POSTS } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/profiles";

export async function getUsersPosts() {
  const userPostsURL = `${API_SOCIAL_URL}${action}/${userName}${API_POSTS}`;

  const response = await authFetch(userPostsURL);

  return await response.json();
}
