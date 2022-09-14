//=======================================================
//                   CONST DECLARATIONS
//=======================================================

const addPostBtn = document.getElementById("add-post-btn");
const imageURLInput = document.getElementById("image-url-input");
const titleInput = document.getElementById("title-input");
const locationInput = document.getElementById("location-input");
const captionInput = document.getElementById("caption-input");

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

// ==========================================================
//                         ADD POSTS
// ==========================================================

//===========================================================
//                   MODAL OPENING AND CLOSING
//===========================================================

closeCreateModal = document.getElementById("exit-modal-icon");

addPostBtn.onclick = () => {
  console.log("clicked!");
  $(".create-post-modal").css("display", "flex");
};

closeCreateModal.onclick = () => {
  console.log("closing");
  $(".create-post-modal").css("display", "none");
};

//===========================================================
//                   MODAL OPENING AND CLOSING
//===========================================================

renderPostBtn = document.getElementById("render-post-btn");

renderPostBtn.onclick = () => {
  console.log("clicked");
  if (imageURLInput.value == "") {
    console.log("Input is empty, please include something.");
  } else if (locationInput.value == "") {
    console.log("Input is empty, please include something.");
  } else if (titleInput.value == "") {
    console.log("Input is empty, please include something.");
  } else if (captionInput.value == "") {
    console.log("Input is empty, please include something.");
  } else {
    $.ajax({
      url: `http://localhost:3000/addWildlifePost`,
      // use the post type to create data somewhere
      // requesting to POST our data
      type: "POST",
      // we can send objects through to the backend, using the data argument
      data: {
        // the first property (i.e. the one on the left) called name has to be spelt exactly as the schema
        image_url: imageURLInput.value,
        title: titleInput.value,
        location: locationInput.value,
        caption: captionInput.value,
        author_name: sessionStorage.userName,
        author_image_url: sessionStorage.profileImg,
        author_id: sessionStorage.userID,
      },
      success: () => {
        console.log("A new post was added.");
        showAllPosts();
      },
      error: () => {
        console.log("Error: cannot reach the backend");
      },
    });
    $(".create-post-modal").css("display", "none");
  }
};

// ==========================================================================
//                         CHECK LOGIN CONDITIONS
// ==========================================================================
let checkLogin = () => {
  const userDetails = document.getElementById("user-details");
  let newPostBtn = document.getElementById("add-post-cont");
  let navContent;
  if (sessionStorage.userID) {
    console.log(sessionStorage.userName);
    console.log(sessionStorage);
    navContent = `
    <span id="username">@${sessionStorage.userName}</span>
    <img id="dp" src="${sessionStorage.profileImg}" alt="">
    <a href="#">
    <button id="nav-logout-button">Sign Out</button>
    </a>
    `;
  } else {
    navContent = `
    <a href="login.html">
    <button id="nav-login-button">Login/Signup</button>
    </a>
    `;
    newPostBtn.style.display = "none";
  }
  userDetails.innerHTML = navContent;
};

checkLogin();

//================
// Log Out Button
//================

const logoutBtn = document.getElementById("nav-logout-button");

let logOut = () => {
  console.log("You've logged out");
  sessionStorage.clear();
  window.location.reload();
};

if (sessionStorage.userID) {
  logoutBtn.onclick = () => logOut();
}

//==========================================================
//                        COMMENTS
//==========================================================

let addComment = (wildlifePostId) => {
  // const reviewBtn = document.getElementById("submitReview");
  //add a click listener
  reviewBtn.onclick = () => {
    console.log(wildlifePostId);
    $.ajax({
      url: `http://localhost:3000/postComment`,
      type: "POST",
      data: {
        text: document.getElementById("productReview").value,
        coffee_id: coffeeId,
      },
      success: () => {
        console.log("review placed successfully");
        showAllPosts();
        $("#reviewModal").modal("hide");
      },
      error: () => {
        console.log("error cannot call API");
      },
    });
  };
};
