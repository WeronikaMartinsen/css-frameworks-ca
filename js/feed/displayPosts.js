import { getPosts } from "./get.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "./deletePost.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const getProfile = load("profile");

    const searchInput = document.querySelector("#search");
    const postsContainer = document.querySelector("#posts");

    searchInput.addEventListener("keyup", function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredPosts = posts.filter(function (post) {
        return (
          post.title.toLowerCase().includes(searchValue) ||
          post.body.toLowerCase().includes(searchValue) ||
          post.author.name.toLowerCase().includes(searchValue)
        );
      });

      displayFilteredPosts(filteredPosts, getProfile, postsContainer);
    });

    displayFilteredPosts(posts, getProfile, postsContainer);
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

function displayFilteredPosts(posts, getProfile, postsContainer) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("singlePost");

    if (getProfile.userName === post.author.name) {
      // Add edit and delete buttons to post created by the user
      const editButton = document.createElement("a");
      editButton.href = "/feed/post/edit/index.html?id=" + post.id;
      editButton.classList.add("border-secondary");
      editButton.classList.add("btn-light");
      editButton.classList.add("btn");
      editButton.classList.add("d-flex");
      editButton.classList.add("align-items-center");
      editButton.innerText = "...";
      editButton.addEventListener("click", () => {
        console.log("Edit post:", post.id);
      });

      const deleteButton = document.createElement("i");
      deleteButton.classList.add("border-secondary");
      deleteButton.classList.add("btn-light");
      deleteButton.classList.add("d-flex");
      deleteButton.classList.add("align-items-center");
      deleteButton.classList.add("btn");
      deleteButton.classList.add("fa-solid");
      deleteButton.classList.add("fa-xmark");

      deleteButton.setAttribute("id", post.id);
      deleteButton.addEventListener("click", () => {
        deletePost(post.id);
        alert("Post deleted successfully.");
        window.location.reload();
      });

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("d-flex");
      btnContainer.classList.add("justify-content-end");

      const boxForContainer = document.createElement("div");
      boxForContainer.classList.add("w-100");
      boxForContainer.classList.add("justify-content-end");

      boxForContainer.append(btnContainer);
      // Append buttons to the card
      btnContainer.append(editButton);
      btnContainer.append(deleteButton);

      card.append(boxForContainer);
    }

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("d-flex");
    titleContainer.classList.add("justify-content-start");
    titleContainer.classList.add("align-items-start");
    titleContainer.classList.add("flex-column");
    titleContainer.classList.add("w-100");

    const titleElement = document.createElement("a");
    titleElement.classList.add("card-title");
    titleElement.classList.add("h4");
    titleElement.classList.add("text-center");
    titleElement.textContent = post.title;
    titleElement.href =
      "/feed/singlePost.html?id=" + post.id + `author=` + post.author.name;
    titleElement.addEventListener("click", () => {
      window.location.href = titleElement.href;
    });

    const cardBody = document.createElement("p");
    cardBody.classList.add("card-body");
    cardBody.textContent = post.body;

    const mediaElement = document.createElement("img");
    mediaElement.classList.add("post-image");

    // Check if post.media exists, if yes, set src to post.media; otherwise, set it to the default source
    mediaElement.src = post.media
      ? post.media
      : "https://picsum.photos/id/18/2500/1667";
    mediaElement.alt = post.title;
    mediaElement.classList.add("rounded-4");
    mediaElement.classList.add("w-100");

    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("custom-width");
    mediaContainer.classList.add("mt-2");

    const authorContainer = document.createElement("div");
    authorContainer.classList.add("d-flex");
    authorContainer.classList.add("justify-content-end");
    authorContainer.classList.add("w-100");

    const authorElement = document.createElement("a");
    authorElement.classList.add("text-secondary");
    authorElement.textContent = post.author.name;
    authorElement.href = "/profile.index.html?author=" + post.author.name;

    const postID = document.createElement("span");
    postID.classList.add("post-id");
    postID.textContent = post.id;

    const date = document.createElement("span");
    date.classList.add("very-small");
    const currentTime = new Date();
    const postCreationTime = new Date(post.created);

    const timeDifference = currentTime - postCreationTime;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo > 0) {
      date.innerText = daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else {
      date.innerText =
        hoursAgo > 0 ? `${hoursAgo} hours ago` : "Less than an hour ago";
    }

    titleContainer.append(titleElement);
    titleContainer.append(date);

    mediaContainer.append(cardBody);
    mediaContainer.append(mediaElement);

    authorContainer.append(authorElement);

    card.append(titleContainer);
    card.append(mediaContainer);
    card.append(authorContainer);

    postsContainer.append(card);
  });
}
