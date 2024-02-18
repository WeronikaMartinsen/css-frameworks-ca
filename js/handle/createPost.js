import { createPost } from "../api/post/create.js";
import { name } from "../api/constants.js";

export function createPostListener() {
  const createPostForm = document.querySelector("#createPost");

  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const createPostForm = event.target;
      const createPostData = new FormData(createPostForm);

      const post = Object.fromEntries(createPostData.entries());

      post.name = name; // Assuming `name` is the user's name

      try {
        // Call createPost and get the ID of the created post
        const createdPostId = await createPost(post);

        console.log("Post created with ID:", createdPostId);

        // Redirect to the update page with the created post ID
        window.location.href = `/feed/post/edit/index.html?id=${createdPostId}`;
      } catch (error) {
        console.error("Error creating post:", error.message);
      }
    });
  }
}
