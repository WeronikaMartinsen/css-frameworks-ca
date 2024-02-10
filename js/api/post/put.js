import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {
  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  console.log(post);
}
