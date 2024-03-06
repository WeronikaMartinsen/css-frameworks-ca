import { updateAvatar } from "./updateProfile.js";

document
  .getElementById("uploadButton")
  .addEventListener("click", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get("author");

    if (authorName) {
      const avatarInput = document.getElementById("avatar");
      const avatarUrl = avatarInput.value;

      if (avatarUrl) {
        try {
          const response = await updateAvatar(avatarUrl, authorName);
          // Handle the response as needed
          console.log("Avatar updated successfully:", response);
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      } else {
        console.error("Avatar URL is required.");
      }
    } else {
      console.error("Author name not found in URL parameters.");
    }
  });
