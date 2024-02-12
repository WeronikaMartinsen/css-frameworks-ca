import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
  if (!postData.id) {
    console.error("Missing ID in postData");
    return;
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  console.log(post);
}
