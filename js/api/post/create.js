import { API_SOCIAL_URL } from "../constants";

const action = "/posts";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  const response = await fetch(createPostURL, {
    body: JSON.stringify(postData),
  });
  const post = await response.json();
  console.log(post);
}
