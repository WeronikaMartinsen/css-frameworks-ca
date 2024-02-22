import { editPost } from "./editPost.js";
import { id } from "../api/constants.js";
import { getPost } from "./get.js";

export async function updatePostForm() {
  try {
    const getValuesFromPostId = await getPost(id);

    const newTitle = (document.getElementById(
      "editTitle"
    ).value = `${getValuesFromPostId.title}`);

    const newBody = (document.querySelector(
      "#editBody"
    ).value = `${getValuesFromPostId.body}`);

    const newMedia = (document.getElementById(
      "editMedia"
    ).value = `${getValuesFromPostId.media}`);

    const updateForm = document.querySelector("#updatePost");

    if (updateForm) {
      updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;

        // Corrected names for accessing form elements
        const title = form.editTitle.value;
        const body = form.editBody.value;

        const media = form.editMedia.value;

        const updatedPost = {
          title,
          body,

          media,
        };
        editPost(updatedPost);
        alert("Your post has been successfully updated!");
        window.location.href = "/feed/index.html";
      });
    }
  } catch (error) {
    console.error(error);
  }
}
