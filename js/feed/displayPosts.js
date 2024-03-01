import { getPosts } from "./get.js";
import { load } from "../api/storeToken.js";
import { deletePost } from "./deletePost.js";
import { createPostCard } from "./postCard.js";
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
      const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      displayFilteredPosts(sortedPosts, getProfile, postsContainer);
    });

    filterOptionTwo.addEventListener("click", function () {
      const sortedPosts = [...posts].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
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
    const card = createPostCard(post, getProfile);
    postsContainer.append(card);
  });
}
