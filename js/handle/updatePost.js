import { getPost, updatePost } from "../api/post/index.js";

export async function updateFormListener() {
  const updateForm = document.querySelector("#updatePost");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;

  if (!id) {
    console.error("ID not found in URL");
    return;
  }

  if (updateForm) {
    const button = updateForm.querySelector("button");
    button.disabled = true; // Corrected property name

    try {
      const post = await getPost(id);

      updateForm.title.value = post.title;
      updateForm.body.value = post.body;
      updateForm.media.value = post.media;

      button.disabled = false;

      updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const updateFormData = new FormData(updateForm);
        const updatedPost = Object.fromEntries(updateFormData.entries());
        updatedPost.id = id;

        await updatePost(updatedPost);
      });
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  }
}
