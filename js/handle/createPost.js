import { createPost } from "../api/post/create.js";

export function createPostListener() {
  //This function grab the user from the form

  const createPostForm = document.querySelector("#createPost");

  if (createPostForm) {
    createPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const createPostForm = event.target;
      const createPostData = new FormData(createPostForm);

      const post = Object.fromEntries(createPostData.entries());

      createPost(post);
    });
  }
}
