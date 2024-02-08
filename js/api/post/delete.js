import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(postData) {
  if (!id) {
    throw new Error("Update requires a postID");
  }
  const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

  const response = await authFetch(updatePostURL, {
    method,
  });
  const post = await response.json();
  console.log(post);
}
