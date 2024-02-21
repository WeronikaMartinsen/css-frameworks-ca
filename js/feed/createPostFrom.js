import { createPost } from "./createPost.js";

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
        alert("Your post has been successfully created!");
        location.reload();
      });
    }
  } catch (error) {
    console.error(error);
  }
}
