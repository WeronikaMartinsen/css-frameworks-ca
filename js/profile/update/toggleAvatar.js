export function toggleAvatarForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleAvatarFormButton = document.getElementById("toggleAvatarForm");
    const closeBtn = document.getElementById("close-btn");

    const avatarForm = document.getElementById("avatarUploadForm");

    toggleAvatarFormButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Toggle Button clicked!");

      if (avatarForm) {
        console.log("avatarForm is not null");
        avatarForm.classList.toggle("d-none");
      } else {
        console.log("avatarForm is null");
      }
    });

    closeBtn.addEventListener("click", function (event) {
      event.preventDefault();

      avatarForm.classList.toggle("d-none");
    });
  });
}
