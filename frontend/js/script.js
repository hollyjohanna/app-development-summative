console.log("hello");

// ===============================================================================
//                               SHOW ALL POSTS & RENDER
// ===============================================================================

let showAllPosts = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/allWilflifePosts",
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
  console.log("The render project function is running");
  result.innerHTML = "";
  wildlifePosts.forEach((item, index) => {
    result.innerHTML += `
          <img src="${item.image_url}" alt="${item.name}">
        `;
  });
};

showAllPosts();
