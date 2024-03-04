import { API_BASE_URL, POSTS, PROFILES } from "../api/constants.js";
import { load } from "../api/storeToken.js";
import { getProfileForm } from "./getProfileForm.js";
import { confirmDelatePost } from "../global/feedbackConfirmDelete.js";

/**
 * Fetches and displays posts for a specific user profile.
 * @async
 * @function displayProfilePosts
 * @throws {Error} Throws an error if there is an issue fetching or displaying posts.
 */
export async function displayProfilePosts() {
  try {
    const profile = await getProfileForm();
    // Extract authorName from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get("author");

    // If authorName is available, fetch and display posts
    if (authorName) {
      const getProfilePostsURL = `${API_BASE_URL}${PROFILES}/${authorName}${POSTS}`;
      const token = load("token");
      const currentUser = load("profile").userName;

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
          // Create a div for the post card
          const card = document.createElement("div");
          card.classList.add("custom-card-width-profile");

          // Author

          console.log(post);
          const avatarElement = document.createElement("img");
          avatarElement.classList.add("custom-avatar-size");
          avatarElement.classList.add("rounded-circle");
          avatarElement.classList.add("mr-2");
          avatarElement.classList.add("m-2");

          // Check if the profile object and avatar property exist
          if (profile && profile.avatar) {
            avatarElement.src = profile.avatar;
          } else {
            // If not, set a default avatar or leave it empty
            avatarElement.src = "/images/avatar.png"; // replace with your default avatar path
          }
          console.log("Avatar URL:", avatarElement.src);
          console.log("Profile:", profile);
          console.log("Avatar URL:", profile && profile.avatar);

          const authorElement = document.createElement("a");
          authorElement.textContent = authorName;
          authorElement.href = "/profile/index.html?author=" + authorName;

          // Date
          const date = document.createElement("span");
          date.classList.add("very-small");
          const currentTime = new Date();
          const postCreationTime = new Date(post.created);
          const timeDifference = currentTime - postCreationTime;
          const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
          const daysAgo = Math.floor(hoursAgo / 24);
          if (daysAgo > 0) {
            date.innerText =
              daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
          } else {
            date.innerText =
              hoursAgo > 0 ? `${hoursAgo} hours ago` : "Less than an hour ago";
          }

          const containerAvatar = document.createElement("div");
          containerAvatar.classList.add("d-flex");
          containerAvatar.classList.add("align-item-center");

          const containerAuthorDate = document.createElement("div");
          containerAuthorDate.classList.add("d-flex");
          containerAuthorDate.classList.add("flex-column");
          containerAuthorDate.classList.add("p-0");
          containerAuthorDate.classList.add("m-1");
          containerAuthorDate.classList.add("align-item-center");

          const containerForAvatarAuthorDate = document.createElement("div");
          containerForAvatarAuthorDate.classList.add("d-flex");
          containerForAvatarAuthorDate.classList.add("justify-content-start");
          containerForAvatarAuthorDate.classList.add("align-item-center");
          containerForAvatarAuthorDate.classList.add("gap-2");

          containerAvatar.append(avatarElement);
          containerAuthorDate.append(authorElement);
          containerAuthorDate.append(date);

          containerForAvatarAuthorDate.append(containerAvatar);
          containerForAvatarAuthorDate.append(containerAuthorDate);

          card.append(containerForAvatarAuthorDate);

          // Append the title element to the card
          const titleElement = document.createElement("h5");
          titleElement.classList.add("px-3");
          titleElement.classList.add("mt-2");
          titleElement.textContent = post.title;
          titleElement.href =
            "/feed/singlePost.html?id=" + post.id + `author=` + authorName;
          titleElement.addEventListener("click", () => {
            window.location.href = titleElement.href;
          });
          card.appendChild(titleElement);

          // Body
          const bodyElement = document.createElement("p");
          bodyElement.textContent = post.body;
          bodyElement.classList.add("text-center");
          bodyElement.classList.add("px-3");
          card.appendChild(bodyElement);

          // Media
          const mediaElement = document.createElement("img");
          mediaElement.classList.add("profile-card-img");
          mediaElement.src = post.media
            ? post.media
            : "https://picsum.photos/id/18/2500/1667";
          mediaElement.alt = post.title;
          const mediaContainer = document.createElement("div");
          mediaContainer.classList.add("custom-width-profile-media-cont");
          mediaContainer.append(mediaElement);
          card.append(mediaContainer);

          // Edit and Delete buttons
          if (authorName === currentUser) {
            const editButton = document.createElement("button");
            editButton.classList.add("border-secondary");
            editButton.classList.add("btn-light");
            editButton.classList.add("btn");
            editButton.classList.add("d-flex");
            editButton.classList.add("align-items-center");
            editButton.innerText = "Update Post";
            editButton.addEventListener("click", () => {
              window.location.href = `/feed/post/edit/index.html?id=${post.id}`;
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("border-secondary");
            deleteButton.classList.add("btn-light");
            deleteButton.classList.add("d-flex");
            deleteButton.classList.add("align-items-center");
            deleteButton.classList.add("btn");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("id", post.id);
            deleteButton.addEventListener("click", () => {
              confirmDelatePost(
                "Are you sure you want to delete this post?",
                post.id
              );
            });

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("d-flex");
            btnContainer.classList.add("gap-2");
            btnContainer.classList.add("justify-content-end");
            const boxForContainer = document.createElement("div");
            boxForContainer.classList.add("w-100");
            boxForContainer.classList.add("justify-content-end");
            boxForContainer.classList.add("mb-2");
            boxForContainer.classList.add("mt-2");
            boxForContainer.classList.add("px-2");

            btnContainer.append(editButton);
            btnContainer.append(deleteButton);

            boxForContainer.append(btnContainer);
            card.append(boxForContainer);
          }

          // Append the card to postsContainer
          postsContainer.appendChild(card);
        });
      } else {
        console.error("Error fetching profile posts:", response.statusText);
      }
    } else {
      console.error("Author name not found in URL parameters.");
      console.log("Author information not available or does not match.");
      console.log("authorName:", authorName);
    }
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
