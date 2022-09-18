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
      runOpenPosts(posts)
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
    // let authorName = sessionStorage.userName
    // let authorImageURL = sessionStorage.profile_image_url
    // let authorID = sessionStorage.userID
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
        runOpenPosts(posts)
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






//===========================
// Post Modals — Open & Close
//===========================



const appBody = document.querySelector('body')
const postModal = document.getElementById('post-modal')

let runOpenPosts = (posts) => {
  let currentPosts = document.getElementsByClassName('post')
  for (let x = 0; x < currentPosts.length; x++) {
    currentPosts[x].onclick = () => {
      let postModalCont = document.getElementById('post-modal-cont')
      postModalCont.innerHTML = ""
      console.log(posts[x]._id)
      appBody.classList.add('page-disable')
      postModal.classList.add('active-post-modal')


      // let connectComents = () => {
      //   post[x].comment.forEach(() => {
      //     return ``
      //   })
      // }






      let checkPermission = (y) => {
        if (y.author_id == sessionStorage.userID) {
          return `
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-trash3"></i>
          `
        } else {
          return ""
        }
      }
      postModalCont.innerHTML = `
      <div class="img-cont">
        <img src="${posts[x].image_url}" alt="${posts[x].title}">
      </div>
      <div class="post-modal-content-cont">
        <div class="post-user-cont">
            <img class="post-user-img" src="${posts[x].author_image_url}">
            <div class="post-user-details">
              <h5 class="post-user-name">@${posts[x].author_name}</h5>
              <p class="post-location">${posts[x].location}</p>
            </div>
            <div class="post-interactions-cont">
              ${checkPermission(posts[x])}
              <i class="bi bi-heart"></i>
            </div>
            </div>
            <div class="post-comments-cont">
              
            </div>
            <div class="post-add-comment-cont">
              <img class="current-user-img" src="${sessionStorage.profileImg}">
              <input type="text" placeholder="Leave a comment..." class="comment-input">
              <i class="bi bi-send  post-new-comment"></i>
        </div>
      </div>
      `


    }
  }
}

let closePostModal = () => {
  let closePostBtn = document.getElementById('exit-modal')
  closePostBtn.onclick = () => {
    appBody.classList.remove('page-disable')
    postModal.classList.remove('active-post-modal')
  }
}

closePostModal()









{/* <div class="comment">
<div class="comment-user-img"></div>
<div class="comment-content">
    <p><span class="comment-user-name">@hollyholly</span>This is an example of a comment</p>
</div>
</div> */}

// ${connectComents()}

//==========================================================
//                        COMMENTS
//==========================================================

let addComment = (wildlifePostId) => {
  const reviewBtn = document.getElementById("submitReview");
  //add a click listener
  reviewBtn.onclick = () => {
    console.log(wildlifePostId);
    $.ajax({
      url: `http://localhost:3000/postComment`,
      type: "POST",
      data: {
        // comment_id: sessionStorage.userID,
        text: document.getElementById("comment-input").value,
        comment_author_id: sessionStorage.userID,
        wildlife_post_id: wildlifePostId,
      },
      success: (data) => {
        console.log(data)
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

addComment();