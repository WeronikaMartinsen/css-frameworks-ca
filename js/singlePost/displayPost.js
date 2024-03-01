import { id } from "../api/constants.js";
import { getPost } from "../feed/get.js";
import { load } from "../api/storeToken.js";
import { createPostCard } from "../feed/postCard.js";

/**
 * Displays a single post with detailed information and, if the author matches the logged-in user, includes edit and delete buttons.
 * @async
 * @function displayPost
 * @throws {Error} Throws an error if there is an issue retrieving or displaying the post.
 * @returns {Promise<void>} A promise that resolves when the post is successfully retrieved and displayed.
 */
export async function displayPost() {
  try {
    const getSinglePost = await getPost(id);
    const getProfile = load("profile");

    const postContainer = document.querySelector("#singlePostId");
    postContainer.classList.add("singlePost");

    // Call the createPostCard function to generate the post card
    const card = createPostCard(getSinglePost, getProfile);

    // Append the generated post card to the post container
    postContainer.appendChild(card);

    // ... (other post details)
  } catch (error) {
    console.error("Error displaying post:", error);
  }
}
