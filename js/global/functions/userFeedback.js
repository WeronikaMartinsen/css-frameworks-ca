export function userFeedback(message, callback) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlayUserFeedback");

  const messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");

  const content = document.createElement("span");
  content.classList.add("text-center");
  content.classList.add("text-wrap");

  content.textContent = message;

  const deleteButton = document.createElement("i");

  messageBox.append(content);

  document.body.append(overlay);
  overlay.append(messageBox);

  setTimeout(() => {
    overlay.remove();
    if (callback) {
      callback();
    }
  }, 2000);
}
