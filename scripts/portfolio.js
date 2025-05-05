document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInUser");
  if (!email) {
    alert("No user logged in.");
    window.location.href = "../pages/login.html";
    return;
  }

  const userData = localStorage.getItem(email);
  let user;
  try {
    user = JSON.parse(userData);
  } catch (e) {
    alert("Invalid user data.");
    return;
  }

  if (!user) {
    alert("User not found.");
    return;
  }

  // Populate profile info
  document.getElementById("userName").innerText = user.fullName || "";
  document.getElementById("userTitle").innerText = user.title || "";
  document.getElementById("userAge").innerText = user.age || "";
  document.getElementById("userEmail").innerText = user.email || "";
  document.getElementById("userGithub").innerText = user.github || "";
  document.getElementById("userGithub").href = user.github || "#";
  document.getElementById("userLinkedIn").innerText = user.linkedin || "";
  document.getElementById("userLinkedIn").href = user.linkedin || "#";
  document.getElementById("userSkills").innerText = user.skills || "";
  document.getElementById("userAbout").innerText = user.about || "";

  if (user.picture) {
    document.getElementById("userPicture").src = user.picture;
  }

  // Weather
  if (user.weather && user.city) {
    document.getElementById("weatherSection").style.display = "block";
    fetchWeather(user.city);
  }

  // Exchange
  if (user.exchange && user.baseCurrency && user.targetCurrency) {
    document.getElementById("exchangeSection").style.display = "block";
    fetchExchange(user.baseCurrency, user.targetCurrency);
  }

  // Fill Edit Modal
  document.getElementById("editProfileBtn").addEventListener("click", () => {
    document.getElementById("editFullName").value = user.fullName || "";
    document.getElementById("editAge").value = user.age || "";
    document.getElementById("editTitle").value = user.title || "";
    document.getElementById("editSkills").value = user.skills || "";
    document.getElementById("editAbout").value = user.about || "";
    document.getElementById("editEmail").value = user.email || "";
    document.getElementById("editPassword").value = user.password || "";
    document.getElementById("editGithub").value = user.github || "";
    document.getElementById("editLinkedIn").value = user.linkedin || "";
    document.getElementById("editCity").value = user.city || "";
    document.getElementById("editBaseCurrency").value = user.baseCurrency || "";
    document.getElementById("editTargetCurrency").value = user.targetCurrency || "";
    document.getElementById("editIncludeWeather").checked = !!user.weather;
    document.getElementById("editIncludeExchange").checked = !!user.exchange;
    if (user.picture) {
      document.getElementById("previewPicture").src = user.picture;
    }
  });

  // Save profile edits
  document.getElementById("profileEditForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedUser = {
      fullName: document.getElementById("editFullName").value,
      age: document.getElementById("editAge").value,
      title: document.getElementById("editTitle").value,
      skills: document.getElementById("editSkills").value,
      about: document.getElementById("editAbout").value,
      email: document.getElementById("editEmail").value,
      password: document.getElementById("editPassword").value,
      github: document.getElementById("editGithub").value,
      linkedin: document.getElementById("editLinkedIn").value,
      city: document.getElementById("editCity").value,
      baseCurrency: document.getElementById("editBaseCurrency").value,
      targetCurrency: document.getElementById("editTargetCurrency").value,
      weather: document.getElementById("editIncludeWeather").checked,
      exchange: document.getElementById("editIncludeExchange").checked,
      picture: user.picture // Keep original unless updated below
    };

    // If a new picture is uploaded
    const pictureInput = document.getElementById("editPicture");
    const file = pictureInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updatedUser.picture = reader.result;
        localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
        localStorage.setItem("loggedInUser", updatedUser.email);
        location.reload();
      };
      reader.readAsDataURL(file);
    } else {
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
      localStorage.setItem("loggedInUser", updatedUser.email);
      location.reload();
    }
  });

  // Preview picture in modal
  document.getElementById("editPicture").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("previewPicture").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

// Fetch Weather Data
async function fetchWeather(city) {
  const apiKey = "b83b6603cc51513499e8589e4033f189"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const weatherText = `🌦 ${data.name}, ${data.sys.country}: ${data.main.temp}°C, ${data.weather[0].description}`;
    document.getElementById("weatherInfo").innerText = weatherText;
  } catch (err) {
    document.getElementById("weatherInfo").innerText = "Failed to load weather.";
    console.error(err);
  }
}

// Fetch Exchange Rate Data
async function fetchExchange(base, target) {
  const apiKey = "28d80ac21c82ae0f18de0c89"; 
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const exchangeText = `💱 1 ${base} = ${data.conversion_rate} ${target}`;
    document.getElementById("exchangeInfo").innerText = exchangeText;
  } catch (err) {
    document.getElementById("exchangeInfo").innerText = "Failed to load exchange rate.";
    console.error(err);
  }
}
