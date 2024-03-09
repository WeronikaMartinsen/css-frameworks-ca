import { editPost } from "./editPost.js";
import { id } from "../api/constants.js";
import { getPost } from "./get.js";
import { userFeedback } from "../global/functions/userFeedback.js";
import { handleError } from "../global/functions/handleError.js";

/**
 * Updates the post form with values from the specified post ID.
 * Submits the updated post when the form is submitted.
 * @async
 * @function updatePostForm
 * @throws {Error} Throws an error if there is an issue retrieving or updating the post.
 */
export async function updatePostForm() {
  try {
    const getValuesFromPostId = await getPost(id);

    document.getElementById("editTitle").value = getValuesFromPostId.title;
    document.querySelector("#editBody").value = getValuesFromPostId.body;
    document.getElementById("editMedia").value = getValuesFromPostId.media;

    const updateForm = document.querySelector("#updatePost");

    if (updateForm) {
      updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;

        const title = form.editTitle.value;
        const body = form.editBody.value;
        const media = form.editMedia.value;

        const updatedPost = {
          title,
          body,
          media,
        };
        editPost(updatedPost);
        userFeedback("You post has been updated!", () => {
          // Callback function to execute after the timeout
          window.location.href = "/feed/index.html";
        });
      });
    }
  } catch (error) {
    handleError("Error editing post.");
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload();
    });
  }
}
