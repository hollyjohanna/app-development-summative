console.log("hello");

//=======================================================
//                   CONST DECLARATIONS
//=======================================================

const addPostBtn = document.getElementById("add-button");
const imageURLInput = document.getElementById("image-url-input");
const titleInput = document.getElementById("title-input");
const locationInput = document.getElementById("location-input");
const captionInput = document.getElementById("caption-input");


// ===============================================================================
//                               SHOW ALL POSTS & RENDER
// ===============================================================================

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
    console.log("The render project function is running");
    result.innerHTML = "";
    wildlifePosts.forEach((item, index) => {
        result.innerHTML += `
          <img src="${item.image_url}" alt="${item.name}">
        `;
    });
};

showAllPosts();

// ==========================================================
//                         ADD POSTS
// ==========================================================

addPostBtn.onclick = () => {
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
