import { load } from "../../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA } from "../../api/constants.js";
import { toggleAvatarForm } from "./toggleAvatar.js";

export async function updateAvatar(newAvatarUrl, authorName) {
  const token = load("token");
  const user = load("profile");

  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${user.userName}${MEDIA}`;

  try {
    const requestBody = {
      avatar: newAvatarUrl,
    };

    const response = await fetch(updateProfileURL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error updating avatar. Server response:", result);
    }

    return result;
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const profileMediaButton = document.getElementById("profileMedia");
  const toggleAvatarFormButton = document.getElementById("toggleAvatarForm");

  if (profileMediaButton && toggleAvatarFormButton) {
    const currentUser = load("profile");
    const urlParams = new URLSearchParams(window.location.search);
    const profileUsername = urlParams.get("author");
    const isSameUser = currentUser.userName === profileUsername;

    if (isSameUser) {
      toggleAvatarFormButton.style.display = "inline-block";
      toggleAvatarForm();
    } else {
      toggleAvatarFormButton.style.display = "none";
    }

    profileMediaButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const avatarInput = document.getElementById("avatarInput");
      const avatarImage = document.getElementById("avatar");
      const avatarImageNav = document.getElementById("avatar-nav");

      const newAvatarUrl = avatarInput.value;

      if (isSameUser) {
        if (newAvatarUrl) {
          avatarImage.src = newAvatarUrl;
          avatarImageNav.src = newAvatarUrl;

          try {
            await updateAvatar(newAvatarUrl, profileUsername);
            location.reload();
          } catch (error) {
            console.error("Error updating avatar:", error);
          }
        } else {
          console.error("Avatar URL is required.");
        }
      } else {
        console.error("You can only update your own avatar.");
      }
    });
  }
});
