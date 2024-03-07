import { load } from "../../api/storeToken.js";
import { API_BASE_URL, PROFILES, MEDIA } from "../../api/constants.js";
import { toggleAvatarForm } from "./toggleAvatar.js";

export async function updateAvatar(newAvatarUrl, authorName) {
  const token = load("token");
  const user = load("profile");

  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${user.userName}${MEDIA}`;

  try {
    console.log("New Avatar URL:", newAvatarUrl);
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

    if (response.ok) {
      return result;
    } else {
      console.error("Error updating avatar. Server response:", result);
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM Content Loaded!");

  const profileMediaButton = document.getElementById("profileMedia");
  const toggleAvatarFormButton = document.getElementById("toggleAvatarForm");

  if (profileMediaButton && toggleAvatarFormButton) {
    const currentUser = load("profile");

    // Load the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileUsername = urlParams.get("author");

    // Compare if the username from the profile and URL are the same
    const isSameUser = currentUser.userName === profileUsername;

    if (isSameUser) {
      toggleAvatarFormButton.style.display = "inline-block"; // Show the button
      toggleAvatarForm(); // Initialize the toggleAvatarForm functionality
    } else {
      toggleAvatarFormButton.style.display = "none"; // Hide the button
    }

    profileMediaButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const avatarInput = document.getElementById("avatarInput");
      const avatarImage = document.getElementById("avatar");
      console.log("Avatar Input Value:", avatarInput.value);
      const newAvatarUrl = avatarInput.value;

      if (isSameUser) {
        if (newAvatarUrl) {
          avatarImage.src = newAvatarUrl;

          try {
            const response = await updateAvatar(newAvatarUrl, profileUsername);
            console.log("Avatar updated successfully:", response);
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
