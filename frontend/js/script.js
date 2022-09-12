console.log("hello");

// ===============================================================================
//                               SHOW ALL POSTS & RENDER
// ===============================================================================
const grid = document.getElementById("feed-grid-cont");

let showAllPosts = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/allWildlifePosts",
    success: (posts) => {
      console.log(posts);
      renderPosts(posts);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

let renderPosts = (wildlifePosts) => {
  console.log("The render post function is running");
  grid.innerHTML = "";
  wildlifePosts.forEach((item, index) => {
    grid.innerHTML += `
      <div class="grid-item post">
        <div class="post-data-cont-top">
          <div class="post-avatar-cont">
            <img alt="">
          </div>
          <div class="post-like-cont">
            <i class="bi bi-heart"></i>
          </div>
        </div>
        <div class="post-data-cont-bottom">
          <i class="bi bi-geo-fill"></i>
          <h4 class="post-location">${item.location}</h4>
          <p class="view-more">View more</p>
        </div>
        <div class="post-hover"></div>
        <img src="${item.image_url}" alt="${item.name}" class="post-img">
      </div>
        `;
  });
};

showAllPosts();
