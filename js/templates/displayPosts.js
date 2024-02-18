import * as templates from "./templates/index.js";
import * as postMethods from "./api/post/index.js";

async function displayPosts() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post");

  // Check if the container exists before rendering post templates
  if (container) {
    templates.renderPostTemplates(posts, container);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
});

async function displayPost() {
  const postId = new URLSearchParams(window.location.search).get("id");

  if (postId) {
    try {
      const post = await postMethods.getPost(postId);
      const container = document.querySelector("#singlePostId");

      // Check if the container exists before rendering the post template
      if (container) {
        templates.renderPostTemplate(post, container);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPost();
});
