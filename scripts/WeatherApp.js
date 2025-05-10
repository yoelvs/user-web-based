const savedCity = localStorage.getItem("lastCity") || "New York";
const apiKey = "0df2aa7cbe619482af9d0c7b537112c1";

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found. Please check the spelling and try again.");
      return;
    }

    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°`;
    document.getElementById("city").innerText = data.name;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

    const now = new Date();
    document.getElementById("dateTime").innerText =
      now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) +
      " - " +
      now.toLocaleDateString("en-US");

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById("icon").innerHTML = `<img src="${iconUrl}" style="width:40px;">`;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    alert("An error occurred while fetching the data.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").value = savedCity;
  fetchWeather(savedCity);

  document.getElementById("searchBtn").addEventListener("click", () => {
    const newCity = document.getElementById("searchInput").value.trim();
    if (newCity) {
      localStorage.setItem("lastCity", newCity);
      fetchWeather(newCity);
    }
  });

  document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newCity = document.getElementById("searchInput").value.trim();
      if (newCity) {
        localStorage.setItem("lastCity", newCity);
        fetchWeather(newCity);
      }
    }
  });
});
