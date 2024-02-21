import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load } from "../api/storeToken.js";

export async function createPost(newPost) {
  const createPostURL = API_BASE_URL + POSTS;
  const token = load("token");
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    };

    console.log("Request body:", JSON.stringify(newPost));

    const response = await fetch(createPostURL, postData);
    const resultNewPost = await response.json();

    if (resultNewPost.ok) {
      return resultNewPost;
    }
  } catch (error) {
    console.error(error);
  }
}
