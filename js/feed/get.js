import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load, save } from "../api/storeToken.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../global/functions/loader.js";

import { handleError } from "../global/functions/handleError.js";

/**
 * Fetches all posts from the API and saves them in the application state.
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws {Error} Throws an error if the API request fails or if an unexpected error occurs.
 * @example
 * const posts = await getPosts();
 * console.log(posts); // Array of post objects
 */

export async function getPosts() {
  const getPostsURL = API_BASE_URL + POSTS + `?_author=true`;
  const token = load("token");

  try {
    showLoadingIndicator();
    const response = await fetch(getPostsURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await response.json();
    if (response.ok) {
      hideLoadingIndicator();

      save("posts", posts);
      return posts;
    }
  } catch (error) {
    handleError("Error fecthing posts.");
  }
}


/**
 * Fetches a specific post by ID from the API.
 * @param {number} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 * @throws {Error} Throws an error if the API request fails or if an unexpected error occurs.
 * @example
 * const postId = 123;
 * const post = await getPost(postId);
 * console.log(post); // Post object
 */
export async function getPost(id) {
  const getPostIdUrl = API_BASE_URL + POSTS + `/` + id + `?_author=true`;
  const token = load("token");
  try {
    showLoadingIndicator();
    let response = await fetch(getPostIdUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const post = await response.json();
    if (response.ok) {
      hideLoadingIndicator();
      return post;
    }
  } catch (error) {
    handleError("Error fetching post.");
  }
}
