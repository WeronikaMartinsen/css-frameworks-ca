import { getPosts } from "./get.js";

import { load } from "../api/storeToken.js";

import { deletePost } from "./deletePost.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const getProfile = load("profile");
    const postsContainer = document.querySelector("#posts");

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
        editButton.innerText = "Update Post";
        editButton.addEventListener("click", () => {
          console.log("Edit post:", post.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("border-secondary");
        deleteButton.classList.add("btn-light");
        deleteButton.classList.add("btn");
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("id", post.id);
        deleteButton.addEventListener("click", () => {
          deletePost(post.id);
          alert("Post deleted successfully.");
          window.location.reload();
        });

        // Append buttons to the card
        card.append(editButton);
        card.append(deleteButton);
      }

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("d-flex");
      buttonsContainer.classList.add("justify-content-space-around");

      const titleElement = document.createElement("a");
      titleElement.classList.add("card-title");
      titleElement.classList.add("h3");
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

      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("w-100");

      const authorElement = document.createElement("a");
      authorElement.classList.add("author");
      authorElement.textContent = post.author.name;
      authorElement.href = "/profile.index.html?author=" + post.author.name;

      const postID = document.createElement("span");
      postID.classList.add("post-id");
      postID.textContent = post.id;

      const date = document.createElement("span");
      let postDate = new Date(post.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      date.innerText = postDate;

      mediaContainer.append(mediaElement);
      // Append card body to card
      card.append(titleElement);
      card.append(cardBody);
      card.append(mediaContainer);
      card.append(authorElement);
      card.append(postID);
      card.append(date);
      card.append(buttonsContainer);

      // Append card to posts container
      postsContainer.append(card);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
