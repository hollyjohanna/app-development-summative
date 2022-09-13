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

closeCreateModal = document.getElementById("exit-modal-icon")

addPostBtn.onclick = () => {
    console.log("clicked!");
    $(".create-post-modal").css("display", "flex");
}

closeCreateModal.onclick = () => {
    console.log("closing");
    $(".create-post-modal").css("display", "none");
}

//===========================================================
//                   MODAL OPENING AND CLOSING
//===========================================================

renderPostBtn = document.getElementById("render-post-btn");

renderPostBtn.onclick = () => {
    console.log("clicked");
    if (imageURLInput.value == "") {
        console.log("Input is empty, please include something.")
    } else if (locationInput.value == "") {
        console.log("Input is empty, please include something.")
    } else if (titleInput.value == "") {
        console.log("Input is empty, please include something.")
    } else if (captionInput.value == "") {
        console.log("Input is empty, please include something.")
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
            },
            success: () => {
                console.log("A new student was added.");
                showAllPosts();
            },
            error: () => {
                console.log("Error: cannot reach the backend");
            },
        });
        $(".create-post-modal").css("display", "none");
    }
  console.log("clicked");
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
    },
    success: () => {
      console.log("A new student was added.");
      showAllPosts();
    },
    error: () => {
      console.log("Error: cannot reach the backend");
    },
  });
};

// ==========================================================================
//                         CHECK LOGIN CONDITIONS
// ==========================================================================

let checkLogin = () => {
  const userDetails = document.getElementById("user-details");
  let navContent;
  if (sessionStorage.userID) {
    console.log(sessionStorage.userName);
    console.log(sessionStorage);
    navContent = `
    <span id="username">@${sessionStorage.userName}</span>
    <span id="dp" style="background-image: url('${sessionStorage.profileImg}')"></span>
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
