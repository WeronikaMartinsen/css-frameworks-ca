import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load } from "../api/storeToken.js";

export async function deletePost(id) {
  const token = load("token");
  try {
    if (!id) {
      throw new Error("Delete requires a post ID.");
    }
    const deletePostURL = API_BASE_URL + POSTS + `/` + id;
    const response = await fetch(deletePostURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
