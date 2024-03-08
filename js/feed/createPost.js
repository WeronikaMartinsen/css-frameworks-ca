import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { handleError } from "../global/functions/handleError.js";

/**
 * Creates a new post.
 *
 * @param {Object} newPost - The data for the new post.
 * @param {string} newPost.title - The title of the post.
 * @param {string} newPost.content - The content of the post.
 * @param {string} newPost.imageUrl - The URL of the post's image.
 * @returns {Promise<Object>} A Promise that resolves with the result of the post creation.
 * @throws Will throw an error message if the post creation fails.
 */
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

    const response = await fetch(createPostURL, postData);
    const resultNewPost = await response.json();

    if (resultNewPost.ok) {
      return resultNewPost;
    }
  } catch (error) {
    handleError("Error adding post. Please try again.");
  }
}
