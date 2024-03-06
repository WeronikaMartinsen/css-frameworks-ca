import { updateAvatar } from "./updateProfile.js";

document
  .getElementById("avatarUploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const authorName = urlParams.get("author");

    if (authorName) {
      const avatarInput = document.getElementById("avatar");
      const avatarFile = avatarInput.files[0];

      if (avatarFile) {
        try {
          const response = await updateAvatar(avatarFile, authorName);

          // Handle the response as needed
          console.log("Avatar updated successfully:", response);
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      } else {
        console.error("No avatar file selected.");
      }
    } else {
      console.error("Author name not found in URL parameters.");
    }
  });
