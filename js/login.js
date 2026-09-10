// ============================
// LOGIN.JS
// Client-side validation + simulated login flow
// No backend yet — this does not create a real session
// ============================

const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const userError = document.getElementById("userError");
const passError = document.getElementById("passError");
const statusMsg = document.getElementById("statusMsg");
const loginBtn = document.getElementById("loginBtn");
const forgotLink = document.getElementById("forgotLink");

form.addEventListener("submit", function(e){
  e.preventDefault();
  let valid = true;

  if(username.value.trim() === ""){
    userError.style.display = "block";
    valid = false;
  } else {
    userError.style.display = "none";
  }

  if(password.value.length < 6){
    passError.style.display = "block";
    valid = false;
  } else {
    passError.style.display = "none";
  }

  statusMsg.className = "status-msg";
  if(!valid){
    statusMsg.textContent = "Please fix the errors above.";
    statusMsg.classList.add("error");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  setTimeout(() => {
    statusMsg.textContent = "Login successful — redirecting to your dashboard...";
    statusMsg.classList.add("success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 900);
  }, 700);
});

forgotLink.addEventListener("click", function(e){
  e.preventDefault();
  statusMsg.className = "status-msg success";
  statusMsg.textContent = "Password reset isn't set up yet — check back soon.";
});
