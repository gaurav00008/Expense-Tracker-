// ============================
// SIGNUP.JS
// Client-side validation, password strength meter, simulated signup
// No backend yet — this does not create a real account
// ============================

const form = document.getElementById("signupForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");
const strengthBar = document.getElementById("strengthBar");
const statusMsg = document.getElementById("statusMsg");
const signupBtn = document.getElementById("signupBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const pass1Error = document.getElementById("pass1Error");
const pass2Error = document.getElementById("pass2Error");

pass1.addEventListener("input", () => {
  const val = pass1.value;
  let score = 0;
  if(val.length >= 6) score++;
  if(val.length >= 10) score++;
  if(/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
  const pct = (score / 3) * 100;
  strengthBar.style.width = pct + "%";
  strengthBar.style.background = score <= 1 ? "#FF6B7A" : score === 2 ? "#F5B94D" : "#35D18E";
});

function isValidEmail(val){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  let valid = true;

  if(fullName.value.trim() === ""){ nameError.style.display="block"; valid=false; } else { nameError.style.display="none"; }
  if(!isValidEmail(email.value.trim())){ emailError.style.display="block"; valid=false; } else { emailError.style.display="none"; }
  if(pass1.value.length < 6){ pass1Error.style.display="block"; valid=false; } else { pass1Error.style.display="none"; }
  if(pass2.value !== pass1.value || pass2.value === ""){ pass2Error.style.display="block"; valid=false; } else { pass2Error.style.display="none"; }

  statusMsg.className = "status-msg";
  if(!valid){
    statusMsg.textContent = "Please fix the errors above.";
    statusMsg.classList.add("error");
    return;
  }

  signupBtn.disabled = true;
  signupBtn.textContent = "Creating account...";

  setTimeout(() => {
    statusMsg.textContent = "Account created — redirecting to login...";
    statusMsg.classList.add("success");
    setTimeout(() => { window.location.href = "login.html"; }, 900);
  }, 700);
});
