import { createPost } from "./createPost.js";
import { userFeedback } from "../global/functions/userFeedback.js";

export function getNewPost() {
  try {
    const getForm = document.querySelector("#createPost");

    if (getForm) {
      getForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const body = form.body.value;
        const media = form.media.value;

        const newPost = {
          title,
          body,
          media,
        };
        createPost(newPost);
        userFeedback("You post has been added!", () => {
          // Callback function to execute after the timeout
          location.reload();
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}
