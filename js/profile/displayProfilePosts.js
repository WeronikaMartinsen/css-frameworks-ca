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

    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get("author");

    // If authorName is available, fetch and display posts
    if (authorName) {
      const getProfilePostsURL = `${API_BASE_URL}${PROFILES}/${authorName}${POSTS}`;

      const token = load("token");
      const currentUser = load("profile").userName;

      console.log("Fetching profile posts for author:", authorName);
      const response = await fetch(getProfilePostsURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const posts = await response.json();
        console.log("Fetched posts:", posts);

        const postsContainer = document.querySelector(".user-posts");

        posts.forEach((post) => {
          const card = document.createElement("div");
          card.classList.add("custom-card-width-profile");

          // Author

          const avatarElement = document.createElement("img");
          avatarElement.classList.add(
            "custom-avatar-size",
            "rounded-circle",
            "mr-2",
            "m-2"
          );

          // Check if the profile object and avatar property exist
          if (profile && profile.avatar) {
            avatarElement.src = profile.avatar;
          } else {
            // If not, set a default avatar or leave it empty
            avatarElement.src = "/images/avatar.png"; // replace with your default avatar path
          }

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
          containerAvatar.classList.add("d-flex", "align-items-center");

          const containerAuthorDate = document.createElement("div");
          containerAuthorDate.classList.add(
            "d-flex",
            "flex-column",
            "p-0",
            "m-1",
            "align-item-center"
          );

          const containerForAvatarAuthorDate = document.createElement("div");
          containerForAvatarAuthorDate.classList.add(
            "d-flex",
            "justify-content-start",
            "align-item-center",
            "gap-2"
          );

          containerAvatar.append(avatarElement);
          containerAuthorDate.append(authorElement);
          containerAuthorDate.append(date);

          containerForAvatarAuthorDate.append(containerAvatar);
          containerForAvatarAuthorDate.append(containerAuthorDate);

          card.append(containerForAvatarAuthorDate);

          // Append the title element to the card
          const titleElement = document.createElement("h5");
          titleElement.classList.add("px-3", "mt-2");

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
          bodyElement.classList.add("text-center", "px-3");
          card.appendChild(bodyElement);

          // Media
          const mediaElement = document.createElement("img");
          mediaElement.classList.add("profile-card-img", "custom-shadow");
          mediaElement.src = post.media
            ? post.media
            : "https://picsum.photos/id/64/4326/2884";
          mediaElement.alt = post.title;
          const mediaContainer = document.createElement("div");
          mediaContainer.classList.add("custom-width-profile-media-cont");
          mediaContainer.append(mediaElement);
          card.append(mediaContainer);

          // Edit and Delete buttons
          if (authorName === currentUser) {
            const editButton = document.createElement("button");
            editButton.classList.add(
              "custom-shadow",
              "d-flex",
              "align-items-center",
              "btn",
              "fa-solid",
              "fa-pen-to-square"
            );

            editButton.addEventListener("click", () => {
              window.location.href = `/feed/post/edit/index.html?id=${post.id}`;
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add(
              "custom-shadow",
              "d-flex",
              "align-items-center",
              "btn",
              "fa-solid",
              "fa-trash"
            );

            deleteButton.setAttribute("id", post.id);
            deleteButton.addEventListener("click", () => {
              confirmDelatePost(
                "Are you sure you want to delete this post?",
                post.id
              );
            });

            const btnContainer = document.createElement("div");
            btnContainer.classList.add(
              "d-flex",
              "gap-2",
              "justify-content-end"
            );

            const boxForContainer = document.createElement("div");
            boxForContainer.classList.add(
              "w-100",
              "justify-content-end",
              "mb-2",
              "mt-2",
              "px-2"
            );

            btnContainer.append(editButton);
            btnContainer.append(deleteButton);

            boxForContainer.append(btnContainer);
            card.append(boxForContainer);
          }

          // Append the card to postsContainer
          postsContainer.appendChild(card);
        });
      } else {
      }
    }
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}
