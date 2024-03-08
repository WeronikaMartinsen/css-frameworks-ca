import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load, save } from "../api/storeToken.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../global/functions/loader.js";

import { handleError } from "../global/functions/handleError.js";

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
