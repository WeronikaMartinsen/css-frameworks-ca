import { API_BASE_URL, POSTS, PROFILES } from "../api/constants.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "../feed/deletePost.js"; // Import deletePost function if not imported

export async function displayProfilePosts() {
  try {
    // Extract authorName from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get("author");

    // If authorName is available, fetch and display posts
    if (authorName) {
      const getProfilePostsURL = `${API_BASE_URL}${PROFILES}/${authorName}${POSTS}`;
      const token = load("token");

      const response = await fetch(getProfilePostsURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const posts = await response.json();

        const postsContainer = document.querySelector(".user-posts");

        posts.forEach((post) => {
          const card = document.createElement("div");
          card.classList.add("singlePost");

          // Title
          const titleElement = document.createElement("h2");
          titleElement.textContent = post.title;
          card.appendChild(titleElement);

          // Author
          const authorElement = document.createElement("span");
          authorElement.textContent = authorName; // Set author name directly from URL
          card.appendChild(authorElement);

          // Body
          const bodyElement = document.createElement("p");
          bodyElement.textContent = post.body;
          card.appendChild(bodyElement);

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

          mediaContainer.append(mediaElement);

          card.append(mediaContainer);

          console.log("post.author:", post.author);
          console.log("authorName:", authorName);
          // Check if author information is available in the post
          if (post.author && post.author.name === authorName) {
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
              window.location.href = `/feed/post/edit/index.html?id=${post.id}`;
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
            console.log("Appending buttons to the card");

            const boxForContainer = document.createElement("div");
            boxForContainer.classList.add("w-100");
            boxForContainer.classList.add("justify-content-end");

            // Append buttons to the card
            btnContainer.append(editButton);
            btnContainer.append(deleteButton);
            boxForContainer.append(btnContainer);

            card.append(boxForContainer);
          }

          // Append card to postsContainer
          postsContainer.appendChild(card);
        });
      } else {
        console.error("Error fetching profile posts:", response.statusText);
      }
    } else {
      console.error("Author name not found in URL parameters.");
      console.log("Author information not available or does not match.");
      console.log("post.author:", post.author);
      console.log("authorName:", authorName);
    }
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
