import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load, save } from "../api/storeToken.js";

import {
  showLoadingIndicator,
  hideLoadingIndicator,
  delay,
} from "../global/functions/loader.js";

export async function getPosts() {
  const getPostsURL = API_BASE_URL + POSTS + `?_author=true`;
  const token = load("token");

  try {
    showLoadingIndicator();
    await delay(2000);
    const response = await fetch(getPostsURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = await response.json();
    if (response.ok) {
      hideLoadingIndicator();
      console.log(response.ok);
      save("posts", posts);
      return posts;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getPost(id) {
  const getPostIdUrl = API_BASE_URL + POSTS + `/` + id + `?_author=true`;
  const token = load("token");
  try {
    let response = await fetch(getPostIdUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const post = await response.json();
    if (response.ok) {
      return post;
    }
  } catch (error) {
    console.error(error);
  }
}
