import { API_SOCIAL_URL } from "../constants.js";

import { authFetch } from "../authorizationFetch.js";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;
  const response = await authFetch(createPostURL, {
    method,
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create post: ${response.statusText}`);
  }

  const createdPost = await response.json();

  // Return the ID of the created post
  return createdPost.id;
}
