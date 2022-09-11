const server = "http://localhost:3000";
const loginBtn = document.getElementById("login-button-login-page");
const usernameInput = document.getElementById("username-input-login");
const passwordInput = document.getElementById("password-input-login");

loginBtn.onclick = () => {
  $.ajax({
    url: `${server}/loginUser`,
    type: "POST",
    data: {
      username: usernameInput.value,
      password: passwordInput.value,
    },
    success: (user) => {
      if (user == "user not found") {
        console.log("user is not found please register");
      } else if (user == "not authorised") {
        console.log("Incorrect Password");
      } else {
        console.log("Awesome you have logged in successfully");
        console.log(user);
        // set the session storage with the user grabbed from the database
        sessionStorage.setItem("userID", user._id);
        sessionStorage.setItem("userName", user.username);
        sessionStorage.setItem("profileImg", user.profile_img_url);
        // redirect automatically
        document.location.href = "index.html";
      }
    },
    error: () => {
      console.log("error cannot call API");
    },
  });
};