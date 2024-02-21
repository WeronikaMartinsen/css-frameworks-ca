import { id } from "../api/constants.js";

import { getPost } from "../feed/get.js";

export async function displayPost() {
  try {
    const getSinglePost = await getPost(id);

    const postContainer = document.querySelector("#singlePostId");
    postContainer.classList.add("singlePost");
    postContainer.classList.add("px-5");

    const postTitle = document.getElementById("title");
    postTitle.innerText = getSinglePost.title;

    const media = document.getElementById("media");
    media.classList.add("post-image");

    media.src = getSinglePost.media
      ? getSinglePost.media
      : "https://picsum.photos/id/18/2500/1667";
    media.alt = getSinglePost.title;

    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.classList.add("w-100");

    const body = document.getElementById("body");
    body.innerText = getSinglePost.body;

    const author = document.getElementById("author");
    author.innerText = getSinglePost.author.name;
    author.href = "/profile.index.html?author=" + getSinglePost.author.name;

    const date = document.getElementById("date");
    let postDate = new Date(getSinglePost.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    date.innerText = postDate;

    mediaContainer.append(media);

    postContainer.append(postTitle);
    postContainer.append(mediaContainer);
    postContainer.append(body);
    postContainer.append(author);
    postContainer.append(date);
  } catch {}
}
