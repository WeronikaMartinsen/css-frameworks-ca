import { id } from "../api/constants.js";
import { getPost } from "../feed/get.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "../feed/deletePost.js";

export async function displayPost() {
  try {
    const getSinglePost = await getPost(id);
    const getProfile = load("profile");

    const postContainer = document.querySelector("#singlePostId");
    postContainer.classList.add("singlePostIDCard");
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
    author.href = "/profile/index.html?author=" + getSinglePost.author.name;

    const date = document.getElementById("date");
    date.classList.add("very-small");
    const currentTime = new Date();
    const postCreationTime = new Date(getSinglePost.created);

    const timeDifference = currentTime - postCreationTime;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo > 0) {
      date.innerText = daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else {
      date.innerText =
        hoursAgo > 0 ? `${hoursAgo} hours ago` : "Less than an hour ago";
    }

    if (getProfile.userName === getSinglePost.author.name) {
      // Add edit and delete buttons to post created by the user
      const editButton = document.createElement("button");

      editButton.classList.add("border-secondary");
      editButton.classList.add("btn-light");
      editButton.classList.add("btn");
      editButton.innerText = "Update Post";
      editButton.addEventListener("click", () => {
        // Navigate to the edit URL when the button is clicked
        window.location.href =
          "/feed/post/edit/index.html?id=" + getSinglePost.id;
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("border-secondary");
      deleteButton.classList.add("btn-light");
      deleteButton.classList.add("btn");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", async () => {
        await deletePost(getSinglePost.id);
        alert("Post deleted successfully.");
        window.location.href = "/feed/index.html";
      });

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("d-flex");
      btnContainer.classList.add("m-4");
      btnContainer.classList.add("justify-content-between");

      btnContainer.append(editButton);
      btnContainer.append(deleteButton);
      // Append buttons to the card
      postContainer.append(btnContainer);
    }
  } catch (error) {
    console.error("Error displaying post:", error);
  }
}
