import { registerFormListener } from "./handle/register.js";

import { loginFormListener } from "./handle/login.js";

import * as post from "./api/post/index.js";

import * as templates from "./templates/index.js";

import * as postMethods from "./api/post/index.js";

const path = location.pathname;

if (path === "/index.html") {
  loginFormListener();
} else if (path === "/profile/register/index.html") {
  registerFormListener();
}

post.createPost();
post.getPost();
post.getPosts();
post.removePost();
post.updatePost();

async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post");
  templates.renderPostTemplates(posts, container);
}
testTemplate();
