import { getPost, updatePost } from "../api/post/index.js";

export async function updateFormListener() {
  const form = document.querySelector("#updatePost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (!id) {
    console.error("ID not found in URL");
    // Handle the absence of ID, show an error message, or redirect, etc.
    return;
  }

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true; // Corrected property name

    const post = await getPost(id);

    form.title.value = post.title;

    button.disabled = false;

    form.body.value = post.body;
    form.media.value = post.media;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = id;

      updatePost(post);
    });
  }
}
