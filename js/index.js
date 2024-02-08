import { registerFormListener } from "./handle/register.js";

import { loginFormListener } from "./handle/login.js";

import * as post from "./api/post/index.js";

const path = location.pathname;

if (path === "/index.html") {
  loginFormListener();
} else if (path === "/profile/register/index.html") {
  registerFormListener();
}

/* post.createPost();
post.updatePost();
post.getPost();
post.removePost(); */
/* post.getPosts().then(console.log); */
post.getPost(10159).then(console.log);
