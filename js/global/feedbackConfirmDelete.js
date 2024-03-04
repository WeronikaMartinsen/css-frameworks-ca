import { deletePost } from "../feed/deletePost.js";

export function confirmDelatePost(message, postId) {
  console.log("confirm delete post called");
  const overlay = document.createElement("div");
  overlay.classList.add("overlayConfirmDelate");

  const messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");

  const content = document.createElement("h4");
  content.classList.add("text-center");
  content.classList.add("text-wrap");

  content.textContent = message;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-confirm");

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Delete";
  yesBtn.classList.add("btn");
  yesBtn.classList.add("btn-secondary");
  yesBtn.addEventListener("click", async () => {
    await deletePost(postId);
    alert("Post deleted successfully.");
    window.location.href = "/feed/index.html";
  });

  const noBtn = document.createElement("button");
  noBtn.classList.add("btn");
  noBtn.classList.add("border-secondary");
  noBtn.textContent = "Close";
  noBtn.addEventListener("click", () => {
    deletePost(false);
    document.body.removeChild(overlay);
  });

  buttonsContainer.append(noBtn);
  buttonsContainer.append(yesBtn);

  messageBox.append(content);
  messageBox.append(buttonsContainer);

  document.body.append(overlay);
  overlay.append(messageBox);
}
