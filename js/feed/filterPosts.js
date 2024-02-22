export function applyFilter(filterOption, posts, getProfile, postsContainer) {
  let sortedPosts = [];

  switch (filterOption) {
    case "new-to-old":
      sortedPosts = posts
        .slice()
        .sort((a, b) => new Date(b.created) - new Date(a.created));
      break;
    case "old-to-new":
      sortedPosts = posts
        .slice()
        .sort((a, b) => new Date(a.created) - new Date(b.created));
      break;
    // Add more cases for additional sort options

    default:
      sortedPosts = posts; // Default to displaying posts without sorting
  }

  displayFilteredPosts(sortedPosts, getProfile, postsContainer);
}
