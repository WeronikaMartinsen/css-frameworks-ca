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
  const post = await response.json();
  console.log(post);
}
