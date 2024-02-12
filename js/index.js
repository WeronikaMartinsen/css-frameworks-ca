import * as listeners from "./handle/index.js";
import * as templates from "./templates/index.js";
import * as postMethods from "./api/post/index.js";

const path = location.pathname;

console.log(path);

if (path === "/index.html") {
  listeners.loginFormListener();
} else if (path === "/profile/register/index.html") {
  listeners.registerFormListener();
} else if (path === "/feed/index.html") {
  listeners.createPostListener();
} else if (path === "/feed/post/edit/index.html") {
  listeners.updateFormListener();
}

async function displayPosts() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post");
  templates.renderPostTemplates(posts, container);
}

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
});

/* async function displayPost() {
  const post = await postMethods.getPost();
  const singlePost = document.querySelector("#singlePost");
  templates.renderPostTemplate(post, singlePost);
}
displayPost();
 */
