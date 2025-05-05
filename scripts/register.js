document.getElementById("nextStep1").addEventListener("click", function () {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const age = document.getElementById("age").value.trim();
  const title = document.getElementById("title").value.trim();
  const about = document.getElementById("about").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullName || !email || !age || !title || !password) {
    alert("Please fill in all fields in Step 1");
    return;
  }

  // Step 1
  const user = {
    fullName,
    email,
    age,
    title,
    about,
    password
  };

  // Step 2
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  window.user = user; 
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = window.user || {};

  // Step 2
  user.skills = document.getElementById("skills").value.trim();
  user.github = document.getElementById("github").value.trim();
  user.linkedin = document.getElementById("linkedin").value.trim();
  user.city = document.getElementById("city").value.trim();
  user.baseCurrency = document.getElementById("baseCurrency").value.trim();
  user.targetCurrency = document.getElementById("targetCurrency").value.trim();
  user.weather = document.getElementById("weather").checked;
  user.exchange = document.getElementById("exchange").checked;

  const pictureFile = document.getElementById("picture").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    user.picture = reader.result;
    saveAndRedirect(user);
  };

  if (pictureFile) {
    reader.readAsDataURL(pictureFile);
  } else {
    user.picture = "";
    saveAndRedirect(user);
  }

  function saveAndRedirect(user) {
    console.log("Registering user:", user);
    localStorage.setItem(user.email, JSON.stringify(user));
    localStorage.setItem("loggedInUser", user.email);
    window.user = null;
    window.location.href = "../templates/portfolio.html";
  }
});
