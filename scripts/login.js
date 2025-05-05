document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem(email));

  if (!storedUser || storedUser.password !== password) {
    alert("Invalid email or password");
  } else {
    localStorage.setItem("loggedInUser", email);
    window.location.href = "../templates/portfolio.html";
  }
});
