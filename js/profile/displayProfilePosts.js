import { authorName } from "../api/constants.js";
import { deletePost } from "../feed/deletePost.js";
import { getProfilePosts } from "./getProfilePosts.js";

export async function displayProfilePosts() {
  try {
    const posts = await getProfilePosts();

    if (!Array.isArray(posts)) {
      console.error("Error: getProfilePosts did not return an array.");
      return;
    }

    const postsContainer = document.querySelector(".user-posts");

    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("singlePost");

      // Title
      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title;
      card.appendChild(titleElement);

      // Body
      const bodyElement = document.createElement("p");
      bodyElement.textContent = post.body;
      card.appendChild(bodyElement);

      // Author
      const authorElement = document.createElement("p");
      if (post.author && post.author.name) {
        authorElement.textContent = `Author: ${post.author.name}`;
      } else {
        authorElement.textContent = "Author: Unknown";
      }
      card.appendChild(authorElement);
      {
        // Add edit and delete buttons to post created by the user
        const editButton = document.createElement("button");
        editButton.classList.add("border-secondary");
        editButton.classList.add("btn-light");
        editButton.classList.add("btn");
        editButton.classList.add("d-flex");
        editButton.classList.add("align-items-center");
        editButton.textContent = "...";

        editButton.addEventListener("click", () => {
          // Navigate to the edit URL when the button is clicked
          window.location.href = "/feed/post/edit/index.html?id=" + post.id;
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
        btnContainer.classList.add("gap-2");
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

      // Append the card to the postsContainer
      postsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
