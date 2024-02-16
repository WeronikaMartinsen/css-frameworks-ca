import * as listeners from "./handle/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/post/index.js";

export default function router() {
  const path = location.pathname;

  switch (path) {
    case "index.html":
      listeners.loginFormListener();
      return;
    case "/profile/register/index.html":
      listeners.registerFormListener();
      return;
    case "/feed/index.html":
      listeners.createPostListener();
      return;
    case "/feed/post/edit/index.html":
      listeners.updateFormListener();
      return;
    case "/profile/index.html":
      listeners.updateProfileFormListener();
      return;
  }
}

async function displayPosts() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post");
  templates.renderPostTemplates(posts, container);
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
      templates.renderPostTemplate(post, container);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPost();
});
