/* import { updateProfile } from "./updateProfile.js";
import { load } from "../api/storeToken.js";
import { authorName } from "../api/constants.js";

export function openFileInput() {
  const avatarInput = document.getElementById("avatar");
  avatarInput.style.display = "block";
}

export async function updateProfileForm() {
  try {
    // Load the user profile from storage
    const getStorageProfile = load("profile");

    // Check if the stored profile's userName is not equal to the authorName constant
    if (getStorageProfile.userName !== authorName) {
      console.error("Cannot update profile for a different user.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const authorNameParam = urlParams.get("author");

    if (!authorNameParam) {
      console.error("Author name not found in URL parameters.");
      return;
    }

    const avatarInput = document.getElementById("avatar");
    const newAvatar = avatarInput.value;

    const updatedProfile = await updateProfile({
      authorName: authorNameParam,
      avatar: newAvatar,
    });

    const profileImage = document.getElementById("profileImage");
    profileImage.src = updatedProfile.avatar;

    // Optionally, add an event listener to the updateButton
    const updateButton = document.getElementById("updateButton");
    updateButton.addEventListener("click", () => {
      // Do something when the button is clicked
    });
  } catch (error) {
    console.error(error);
  }
}
 */
/* import { updateProfile } from "./updateProfile.js";

export async function updateProfileForm() {
  try {
    const avatarInput = document.getElementById("avatarInput");
    const updateButton = document.getElementById("updateButton");
    const profileImage = document.getElementById("profileImage");

    updateButton.addEventListener("click", async () => {
      const file = avatarInput.files[0];

      if (!file) {
        console.error("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        // Call the updateProfile function
        const updatedImageUrl = await updateProfile(formData);

        // Update the profile image source
        profileImage.src = updatedImageUrl;

        console.log("Profile image updated successfully.");
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
 */
