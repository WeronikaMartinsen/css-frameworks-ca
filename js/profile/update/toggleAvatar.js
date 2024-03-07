export function toggleAvatarForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleAvatarFormButton = document.getElementById("toggleAvatarForm");
    const avatarForm = document.getElementById("avatarUploadForm");

    toggleAvatarFormButton.addEventListener("click", function (event) {
      // Prevent the default behavior of the anchor tag
      event.preventDefault();

      console.log("Button clicked!");

      // Check if the elements are found before accessing their properties
      if (toggleAvatarFormButton && avatarForm) {
        console.log("avatarForm is not null"); // Check if this log appears in the console

        avatarForm.classList.toggle("d-none");
      } else {
        console.log("avatarForm is null"); // Check if this log appears in the console
      }
    });
  });
}
