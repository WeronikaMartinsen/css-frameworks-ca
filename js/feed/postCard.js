import { confirmDelatePost } from "../global/feedbackConfirmDelete.js";

export function createPostCard(post, getProfile, includeButtons = true) {
  const card = document.createElement("div");
  card.classList.add("singlePost");
  card.classList.add("text-wrap");

  const boxForAuthorAndDate = document.createElement("div");
  boxForAuthorAndDate.classList.add("d-flex");
  boxForAuthorAndDate.classList.add("justify-content-start");
  boxForAuthorAndDate.classList.add("align-item-start");
  boxForAuthorAndDate.classList.add("flex-column");

  const containerForTitle = document.createElement("div");
  containerForTitle.classList.add("d-flex");
  containerForTitle.classList.add("align-item-center");
  containerForTitle.classList.add("gap-2");
  containerForTitle.classList.add("w-100");

  const tagContainer = document.createElement("div");
  tagContainer.classList.add("d-flex");
  tagContainer.classList.add("justify-content-end");
  tagContainer.classList.add("align-items-end");
  tagContainer.classList.add("w-100");
  tagContainer.classList.add("px-2");

  // Loop through the tags array and create an element for each tag
  post.tags.forEach((tag, index) => {
    // Add # before each tag
    const tagWithHash = `#${tag}`;

    const tagElement = document.createElement("a");
    tagElement.textContent = tagWithHash;

    tagElement.classList.add("p-1");
    tagElement.classList.add("text-dark");

    // Append the tag element to the container
    tagContainer.appendChild(tagElement);
  });

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("d-flex");
  titleContainer.classList.add("justify-content-start");
  titleContainer.classList.add("align-items-start");
  titleContainer.classList.add("flex-column");
  titleContainer.classList.add("w-100");

  const titleElement = document.createElement("a");
  titleElement.classList.add("h5");
  titleElement.classList.add("mt-3");
  titleElement.classList.add("px-2");
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
  containerCardBody.classList.add("bodyContainer");

  const cardBody = document.createElement("span");
  cardBody.classList.add("px-2");
  cardBody.classList.add("w-100");
  cardBody.textContent = post.body;

  const mediaElement = document.createElement("img");
  mediaElement.classList.add("post-image");

  // Check if post.media exists, if yes, set src to post.media; otherwise, set it to the default source
  mediaElement.src = post.media
    ? post.media
    : "https://picsum.photos/id/18/2500/1667";
  mediaElement.alt = post.title;
  mediaElement.classList.add("w-100");
  mediaElement.classList.add("mt-2");

  const avatarElement = document.createElement("img");
  avatarElement.classList.add("custom-avatar-size");
  avatarElement.src = post.author?.avatar
    ? post.author.avatar
    : "/images/avatar.png";
  avatarElement.alt = "Author Avatar";
  avatarElement.classList.add("rounded-circle");
  avatarElement.classList.add("mr-2");
  avatarElement.classList.add("m-2");
  console.log(post.author.avatar);

  const authorElement = document.createElement("a");
  authorElement.classList.add("text-secondary");
  authorElement.classList.add("mt-1");
  authorElement.classList.add("text-bold");
  authorElement.textContent = post.author?.name || ""; // Check if post.author exists before accessing properties
  authorElement.href =
    "/profile/index.html?author=" + (post.author?.name || "");

  const postID = document.createElement("span");
  postID.classList.add("post-id");
  postID.textContent = post.id;

  const date = document.createElement("span");
  date.classList.add("very-small");
  date.classList.add("text-nowrap");
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

  boxForAuthorAndDate.append(authorElement);
  boxForAuthorAndDate.append(date);

  titleContainer.append(titleElement);

  containerCardBody.append(cardBody);
  card.append(containerForTitle);
  card.append(titleContainer);
  card.append(containerCardBody);
  card.append(tagContainer);
  card.append(mediaElement);

  containerForTitle.append(avatarElement);
  containerForTitle.append(boxForAuthorAndDate);

  if (
    includeButtons &&
    getProfile &&
    getProfile.userName === post.author.name
  ) {
    // Add edit and delete buttons to post created by the user
    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.classList.add("d-flex");
    editButton.classList.add("align-items-center");
    editButton.textContent = "...";

    editButton.addEventListener("click", () => {
      // Navigate to the edit URL when the button is clicked
      window.location.href = "/feed/post/edit/index.html?id=" + post.id;
    });

    const deleteButton = document.createElement("i");

    deleteButton.classList.add("d-flex");
    deleteButton.classList.add("align-items-center");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("fa-solid");
    deleteButton.classList.add("fa-xmark");

    deleteButton.setAttribute("id", post.id);
    deleteButton.addEventListener("click", () => {
      confirmDelatePost("Are you sure you want to delete this post?", post.id);
    });

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex");
    btnContainer.classList.add("justify-content-end");
    btnContainer.classList.add("ml-auto");
    btnContainer.classList.add("m-1");

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
