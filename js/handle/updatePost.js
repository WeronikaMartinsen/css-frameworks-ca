import { updatePost } from "../api/post/index.js";

export function updateFormListener() {
  //This function grab the user from the form

  const updateForm = document.querySelector("#updatePost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updateForm = event.target;
      const updateFormData = new FormData(updateForm);
      const post = Object.fromEntries(updateFormData.entries());
      post.id = id;
      updatePost(post);
    });
  }
}
