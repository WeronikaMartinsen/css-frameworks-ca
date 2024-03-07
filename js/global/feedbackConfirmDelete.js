import { deletePost } from "../feed/deletePost.js";
import { userFeedback } from "./functions/userFeedback.js";

export function confirmDelatePost(message, postId) {
  console.log("confirm delete post called");
  const overlay = document.createElement("div");
  overlay.classList.add("overlayConfirmDelate", "border");

  const messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");

  const content = document.createElement("span");
  content.classList.add("text-center");
  content.classList.add("text-wrap");

  content.textContent = message;

  const containerForCloseBtn = document.createElement("div");
  containerForCloseBtn.classList.add("ms-auto");

  const deleteButton = document.createElement("i");

  deleteButton.classList.add(
    "d-flex",
    "align-items-center",
    "btn",
    "fa-solid",
    "justify-content-end",
    "align-item-end",
    "fa-xmark"
  );

  deleteButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-confirm");

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Delete";
  yesBtn.classList.add("btn", "btn-secondary", "custom-shadow");
  yesBtn.addEventListener("click", async () => {
    try {
      await deletePost(postId);
      document.body.removeChild(overlay);
      userFeedback("Your post has been successfully deleted!", async () => {
        location.reload();
      });
    } catch (error) {}
  });

  const noBtn = document.createElement("button");
  noBtn.classList.add("btn", "border-secondary", "custom-shadow");

  noBtn.textContent = "Close";
  noBtn.addEventListener("click", () => {
    deletePost(false);
    document.body.removeChild(overlay);
  });

  buttonsContainer.append(noBtn);
  buttonsContainer.append(yesBtn);

  containerForCloseBtn.append(deleteButton);
  overlay.append(containerForCloseBtn);
  messageBox.append(content);
  messageBox.append(buttonsContainer);

  document.body.append(overlay);
  overlay.append(messageBox);
}
