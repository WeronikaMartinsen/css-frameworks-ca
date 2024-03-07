import { getProfile } from "./getProfile.js";

/**
 * Retrieves user profile information and updates the corresponding form elements.
 * @async
 * @function getProfileForm
 * @throws {Error} Throws an error if there is an issue retrieving or updating the user profile.
 * @returns {Promise<void>} A promise that resolves when the profile information is successfully retrieved and updated.
 * @example
 * ```javascript
 * // Example of using the getProfileForm function
 * try {
 *   await getProfileForm();
 *   console.log("User profile information retrieved and updated successfully.");
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 * ```
 * Note: Ensure that the HTML elements with IDs "name," "email," and "avatar" exist in the DOM.
 */

// getProfileForm.js

export async function getProfileForm() {
  try {
    const profile = await getProfile();

    const currentUserName = document.querySelector("#name");
    const currentUserEmail = document.querySelector("#email");
    const currentUserAvatar = document.querySelector("#avatar");
    const currentUserAvatarInput = document.querySelector("#avatarInput");

    currentUserName.textContent = profile.name;
    currentUserEmail.textContent = profile.email;
    currentUserAvatarInput.value = profile.avatar;
    currentUserAvatar.src = profile.avatar || "/images/avatar.png";
    currentUserAvatar.alt = "Profile picture of myself.";

    return profile;
  } catch (error) {
    console.error(error);
  }
}
