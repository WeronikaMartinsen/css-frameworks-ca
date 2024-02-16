import { API_SOCIAL_URL } from "../constants.js";
import { authFetch } from "../authorizationFetch.js";

const action = "/posts";
const method = "delete";

export async function removePost(id) {
  if (!id) {
    throw new Error("Delete requires a postID");
  }

  const removePostURL = `${API_SOCIAL_URL}${action}/${id}`;

  const response = await authFetch(removePostURL, {
    method,
  });

  if (!response.ok) {
    throw new Error(`Failed to remove post: ${response.statusText}`);
  }

  const removedPost = await response.json();

  // Return the ID of the removed post
  return removedPost.id;
}
