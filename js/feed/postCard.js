import { confirmDelatePost } from "../global/feedbackConfirmDelete.js";

export function createPostCard(post, getProfile, includeButtons = true) {
  const card = document.createElement("a");
  card.classList.add("singlePost", "text-wrap");

  const boxForAuthorAndDate = document.createElement("div");
  boxForAuthorAndDate.classList.add(
    "d-flex",
    "justify-content-start",
    "align-item-start",
    "flex-column"
  );

  const containerForTitle = document.createElement("div");
  containerForTitle.classList.add(
    "d-flex",
    "align-item-center",
    "gap-2",
    "w-100",
    "mb-2"
  );

  const tagContainer = document.createElement("div");
  tagContainer.classList.add("w-100", "px-2");

  // Loop through the tags array and create an element for each tag
  post.tags.forEach((tag, index) => {
    // Add # before each tag
    const tagWithHash = `#${tag}`;

    const tagElement = document.createElement("a");
    tagElement.textContent = tagWithHash;

    tagElement.classList.add("p-1", "text-dark");

    // Append the tag element to the container
    tagContainer.appendChild(tagElement);
  });

  const titleContainer = document.createElement("div");
  titleContainer.classList.add(
    "d-flex",
    "justify-content-start",
    "align-items-start",
    "flex-column",
    "w-100",
    "p-1"
  );

  const titleElement = document.createElement("a");
  titleElement.classList.add("h5", "mt-3", "px-2");
  titleElement.textContent = post.title;
  titleElement.href =
    "/feed/singlePost.html?id=" +
    post.id +
    `author=` +
    (post.author?.name || "");
  titleElement.addEventListener("click", () => {
    window.location.href = titleElement.href;
  });

  const containerCardBody = document.createElement("div");
  containerCardBody.classList.add("bodyContainer", "p-3");

  const cardBody = document.createElement("span");
  cardBody.classList.add("w-100");
  cardBody.textContent = post.body;

  const mediaElement = document.createElement("img");
  mediaElement.classList.add("post-image");
  mediaElement.href =
    "/feed/singlePost.html?id=" +
    post.id +
    `author=` +
    (post.author?.name || "");
  mediaElement.addEventListener("click", () => {
    window.location.href = mediaElement.href;
  });

  // Check if post.media exists, if yes, set src to post.media; otherwise, set it to the default source
  mediaElement.src = post.media
    ? post.media
    : "https://picsum.photos/id/12/2500/1667";
  mediaElement.alt = post.title;
  mediaElement.classList.add("w-100", "mt-2");

  const avatarElement = document.createElement("img");
  avatarElement.classList.add("custom-avatar-size", "custom-shadow");
  avatarElement.src = post.author?.avatar
    ? post.author.avatar
    : "/images/avatar.png";
  avatarElement.alt = "Author Avatar";
  avatarElement.classList.add("rounded-circle", "mr-2", "m-2");

  const authorElement = document.createElement("a");
  authorElement.classList.add("text-secondary", "mt-1", "text-bold");
  authorElement.textContent = post.author?.name || "";
  authorElement.href =
    "/profile/index.html?author=" + (post.author?.name || "");

  const postID = document.createElement("span");
  postID.classList.add("post-id");
  postID.textContent = post.id;

  const date = document.createElement("span");
  date.classList.add("very-small", "text-nowrap");

  const currentTime = new Date();
  const postCreationTime = new Date(post.created);

  const timeDifference = currentTime - postCreationTime;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(hoursAgo / 24);

  if (daysAgo > 0) {
    date.innerText = daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
  } else {
    date.innerText = hoursAgo > 0 ? `${hoursAgo} hours ago` : "1 hour ago";
  }

  boxForAuthorAndDate.append(authorElement, date);
  titleContainer.append(titleElement);
  containerCardBody.append(cardBody);
  card.append(
    containerForTitle,
    titleContainer,
    containerCardBody,
    tagContainer,
    mediaElement
  );
  containerForTitle.append(avatarElement, boxForAuthorAndDate);

  if (
    includeButtons &&
    getProfile &&
    getProfile.userName === post.author.name
  ) {
    // Add edit and delete buttons to post created by the user
    const editButton = document.createElement("button");
    editButton.className =
      "btn d-flex align-items-center text-primary custom-shadow";
    editButton.textContent = "...";

    editButton.addEventListener("click", () => {
      // Navigate to the edit URL when the button is clicked
      window.location.href = "/feed/post/edit/index.html?id=" + post.id;
    });

    const deleteButton = document.createElement("i");
    deleteButton.className =
      "d-flex align-items-center btn fa-solid fa-trash text-primary custom-shadow";
    deleteButton.setAttribute("id", post.id);
    deleteButton.addEventListener("click", () => {
      confirmDelatePost("Are you sure you want to delete this post?", post.id);
    });

    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex justify-content-end ml-auto m-1";

    const boxForContainer = document.createElement("div");
    boxForContainer.classList.add("w-100");
    boxForContainer.classList.add("ml-auto");

    boxForContainer.append(btnContainer);
    // Append buttons to the card
    btnContainer.append(editButton);
    btnContainer.append(deleteButton);

    containerForTitle.append(boxForContainer);
  }

  return card;
}
