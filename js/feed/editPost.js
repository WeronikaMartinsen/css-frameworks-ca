import { API_BASE_URL, POSTS } from "../api/constants.js";

import { id } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { handleError } from "../global/functions/handleError.js";

export async function editPost(editedPost) {
  const token = load("token");
  if (!id) {
    throw new Error("Edit post requires a post ID.");
  }
  const editPostURL = API_BASE_URL + POSTS + `/` + id;
  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedPost),
    };
    const response = await fetch(editPostURL, postData);
    const editResult = await response.json();
    if (editResult.ok) {
      return editResult;
    }
  } catch (error) {
    handleError("Error editing post. Please try again.");
  }
}
