import { id } from "../api/constants.js";
import { getPost } from "../feed/get.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "../feed/deletePost.js";

export async function displayPost() {
  try {
    const getSinglePost = await getPost(id);
    const getProfile = load("profile");

    const postContainer = document.querySelector("#singlePostId");
    postContainer.classList.add("singlePost");
    postContainer.classList.add("px-5");

    const postTitle = document.getElementById("title");
    postTitle.innerText = getSinglePost.title;

    const media = document.getElementById("media");
    media.classList.add("w-100");

    media.src = getSinglePost.media
      ? getSinglePost.media
      : "https://picsum.photos/id/18/2500/1667";
    media.alt = getSinglePost.title;

    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.classList.add("custom-width");

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

    if (getProfile.userName === getSinglePost.author.name) {
      // Add edit and delete buttons to post created by the user
      const editButton = document.createElement("a");
      editButton.href = "/feed/post/edit/index.html?id=" + getSinglePost.id;
      editButton.classList.add("border-secondary");
      editButton.classList.add("btn-light");
      editButton.classList.add("btn");
      editButton.innerText = "Update Post";
      editButton.addEventListener("click", () => {
        console.log("Edit post:", getSinglePost.id);
      });

      const deleteButton = document.createElement("i");
      deleteButton.classList.add("border-secondary");
      deleteButton.classList.add("btn-light");
      deleteButton.classList.add("btn");
      deleteButton.classList.add("fa-solid");
      deleteButton.classList.add("fa-xmark");
      deleteButton.addEventListener("click", async () => {
        await deletePost(getSinglePost.id);
        alert("Post deleted successfully.");
        window.location.href = "/feed/index.html";
      });

      // Append buttons to the card
      postContainer.appendChild(editButton);
      postContainer.appendChild(deleteButton);
    }
  } catch (error) {
    console.error("Error displaying post:", error);
  }
}
