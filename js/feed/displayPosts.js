import { getPosts } from "./get.js";
import { load } from "../api/storeToken.js";
import { createPostCard } from "./postCard.js";

const POSTS_PER_PAGE = 10;

export async function displayPosts() {
  try {
    let allPosts = await getPosts();
    const getProfile = load("profile");

    if (!Array.isArray(allPosts)) {
      return;
    }

    const searchInput = document.querySelector("#search");
    const postsContainer = document.querySelector("#posts");
    const filterOptionOne = document.querySelector("#new-to-old");
    const filterOptionTwo = document.querySelector("#old-to-new");
    const filterOptionThree = document.querySelector("#with-media");
    const filterOptionFour = document.querySelector("#all-posts");
    const loadMoreBtn = document.querySelector("#loadMore");

    let currentPage = 1;

    filterOptionOne.addEventListener("click", function () {

      const sortedPosts = [...allPosts].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      displayFilteredPosts(sortedPosts, getProfile, postsContainer);
    });

    filterOptionTwo.addEventListener("click", function () {
 
      const sortedPosts = [...allPosts].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
      displayFilteredPosts(sortedPosts, getProfile, postsContainer);
    });

    filterOptionThree.addEventListener("click", function () {

      const mediaPosts = allPosts.filter((post) => post.media);
      displayFilteredPosts(mediaPosts, getProfile, postsContainer);
    });

    filterOptionFour.addEventListener("click", function () {
     
      displayFilteredPosts(allPosts, getProfile, postsContainer);
    });

    searchInput.addEventListener("keyup", function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredPosts = allPosts.filter(function (post) {
        return (
          post.title.toLowerCase().includes(searchValue) ||
          post.body.toLowerCase().includes(searchValue) ||
          post.author.name.toLowerCase().includes(searchValue)
        );
      });

      displayFilteredPosts(filteredPosts, getProfile, postsContainer);
    });

    loadMoreBtn.addEventListener("click", function () {
      currentPage++;
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const nextPosts = allPosts.slice(startIndex, endIndex);
      displayFilteredPosts(nextPosts, getProfile, postsContainer, true);

      // Disable the button if there are no more posts to load
      if (endIndex >= allPosts.length) {
        loadMoreBtn.disabled = true;
      }
    });

    displayFilteredPosts(
      allPosts.slice(0, POSTS_PER_PAGE),
      getProfile,
      postsContainer
    );
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

function displayFilteredPosts(
  posts,
  getProfile,
  postsContainer,
  append = false
) {
  if (!append) {
    postsContainer.innerHTML = "";
  }

  posts.forEach((post) => {
    const card = createPostCard(post, getProfile);
    postsContainer.append(card);
  });
}
