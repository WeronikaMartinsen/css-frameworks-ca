export function userFeedback(message, callback) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlayUserFeedback");

  const messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");

  const content = document.createElement("span");
  content.classList.add("text-center");
  content.classList.add("text-wrap");

  content.textContent = message;

  const containerForCloseBtn = document.createElement("div");
  containerForCloseBtn.classList.add("ms-auto");
  containerForCloseBtn.classList.add("mb-2");

  const closeBtn = document.createElement("i");

  closeBtn.classList.add("d-flex");
  closeBtn.classList.add("align-items-center");
  closeBtn.classList.add("btn");
  closeBtn.classList.add("fa-solid");
  closeBtn.classList.add("d-flex");
  closeBtn.classList.add("justify-content-end");
  closeBtn.classList.add("align-item-end");
  closeBtn.classList.add("fa-xmark");
  closeBtn.classList.add("text-end");

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  containerForCloseBtn.append(closeBtn);
  overlay.append(containerForCloseBtn);
  messageBox.append(content);

  document.body.append(overlay);
  overlay.append(messageBox);

  const waitForCallback = async () => {
    if (callback) {
      await callback();
    }
    overlay.remove();
  };

  setTimeout(waitForCallback, 2000);
}
