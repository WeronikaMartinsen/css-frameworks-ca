import { API_BASE_URL, POSTS } from "../api/constants.js";

import { load } from "../api/storeToken.js";

import { handleError } from "../global/functions/handleError.js";

import { userFeedback } from "../global/functions/userFeedback.js";

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
    handleError("Error when trying to delate post");
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload();
    });
  }
}
