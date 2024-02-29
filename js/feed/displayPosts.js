import { getPosts } from "./get.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "./deletePost.js";

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const getProfile = load("profile");

    const searchInput = document.querySelector("#search");
    const postsContainer = document.querySelector("#posts");
    const filterOptionOne = document.querySelector("#new-to-old");
    const filterOptionTwo = document.querySelector("#old-to-new");
    const filterOptionThree = document.querySelector("#with-media");

    filterOptionOne.addEventListener("click", function () {
      const sortedPosts = [...posts].sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });

      displayFilteredPosts(sortedPosts, getProfile, postsContainer);
    });

    filterOptionTwo.addEventListener("click", function () {
      const sortedPosts = [...posts].sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
      });

      displayFilteredPosts(sortedPosts, getProfile, postsContainer);
    });
    filterOptionThree.addEventListener("click", function () {
      const mediaPosts = posts.filter((post) => post.media);

      displayFilteredPosts(mediaPosts, getProfile, postsContainer);
    });

    searchInput.addEventListener("keyup", function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredPosts = posts.filter(function (post) {
        return (
          post.title.toLowerCase().includes(searchValue) ||
          post.body.toLowerCase().includes(searchValue) ||
          post.author.name.toLowerCase().includes(searchValue)
        );
      });

      displayFilteredPosts(filteredPosts, getProfile, postsContainer);
    });

    displayFilteredPosts(posts, getProfile, postsContainer);
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

function displayFilteredPosts(posts, getProfile, postsContainer) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("singlePost");

    if (getProfile.userName === post.author.name) {
      // Add edit and delete buttons to post created by the user
      const editButton = document.createElement("button");
      editButton.classList.add("border-secondary");
      editButton.classList.add("btn-light");
      editButton.classList.add("btn");
      editButton.classList.add("d-flex");
      editButton.classList.add("align-items-center");
      editButton.textContent = "...";

      editButton.addEventListener("click", () => {
        // Navigate to the edit URL when the button is clicked
        window.location.href = "/feed/post/edit/index.html?id=" + post.id;
      });

      const deleteButton = document.createElement("i");
      deleteButton.classList.add("border-secondary");
      deleteButton.classList.add("btn-light");
      deleteButton.classList.add("d-flex");
      deleteButton.classList.add("align-items-center");
      deleteButton.classList.add("btn");
      deleteButton.classList.add("fa-solid");
      deleteButton.classList.add("fa-xmark");

      deleteButton.setAttribute("id", post.id);
      deleteButton.addEventListener("click", () => {
        deletePost(post.id);
        alert("Post deleted successfully.");
        window.location.reload();
      });

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("d-flex");
      btnContainer.classList.add("gap-2");
      btnContainer.classList.add("justify-content-end");

      const boxForContainer = document.createElement("div");
      boxForContainer.classList.add("w-100");

      boxForContainer.classList.add("justify-content-end");

      boxForContainer.append(btnContainer);
      // Append buttons to the card
      btnContainer.append(editButton);
      btnContainer.append(deleteButton);

      card.append(boxForContainer);
    }

    const tagContainer = document.createElement("div");
    tagContainer.classList.add("mt-3");
    tagContainer.classList.add("d-flex");
    tagContainer.classList.add("justify-content-start");
    tagContainer.classList.add("align-items-start");
    tagContainer.classList.add("w-100");

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

    const containerForTitle = document.createElement("div");
    containerForTitle.classList.add("d-flex");
    containerForTitle.classList.add("justify-content-start");
    containerForTitle.classList.add("gap-2");

    const titleElement = document.createElement("a");
    titleElement.classList.add("h4");
    titleElement.classList.add("mt-5");
    titleElement.textContent = post.title;
    titleElement.href =
      "/feed/singlePost.html?id=" + post.id + `author=` + post.author.name;
    titleElement.addEventListener("click", () => {
      window.location.href = titleElement.href;
    });

    const cardBody = document.createElement("p");
    cardBody.classList.add("card-body");
    cardBody.textContent = post.body;

    const mediaElement = document.createElement("img");
    mediaElement.classList.add("post-image");

    // Check if post.media exists, if yes, set src to post.media; otherwise, set it to the default source
    mediaElement.src = post.media
      ? post.media
      : "https://picsum.photos/id/18/2500/1667";
    mediaElement.alt = post.title;
    mediaElement.classList.add("w-100");

    const avatarElement = document.createElement("img");
    avatarElement.classList.add("custom-avatar-size");
    avatarElement.src = post.author.avatar;
    avatarElement.src = post.author.avatar
      ? post.author.avatar
      : "/images/avatar.png";
    avatarElement.alt = "Author Avatar";
    avatarElement.classList.add("rounded-circle");
    avatarElement.classList.add("mr-2");

    const boxForAuthorAndDate = document.createElement("div");
    boxForAuthorAndDate.classList.add("d-flex");
    boxForAuthorAndDate.classList.add("justify-content-start");
    boxForAuthorAndDate.classList.add("align-item-start");
    boxForAuthorAndDate.classList.add("flex-column");
    boxForAuthorAndDate.classList.add("w-100");

    const authorElement = document.createElement("a");
    authorElement.classList.add("text-secondary");
    authorElement.classList.add("text-bold");
    authorElement.textContent = post.author.name;
    authorElement.href = "/profile/index.html?author=" + post.author.name;

    const postID = document.createElement("span");
    postID.classList.add("post-id");
    postID.textContent = post.id;

    const date = document.createElement("span");
    date.classList.add("very-small");
    const currentTime = new Date();
    const postCreationTime = new Date(post.created);

    const timeDifference = currentTime - postCreationTime;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo > 0) {
      date.innerText = daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else {
      date.innerText =
        hoursAgo > 0 ? `${hoursAgo} hours ago` : "Less than an hour ago";
    }

    boxForAuthorAndDate.append(authorElement);

    boxForAuthorAndDate.append(date);

    containerForTitle.append(avatarElement);
    containerForTitle.append(boxForAuthorAndDate);

    titleContainer.append(titleElement);

    card.append(containerForTitle);
    card.append(titleContainer);
    card.append(cardBody);
    card.append(tagContainer);
    card.append(mediaElement);

    postsContainer.append(card);
  });
}
