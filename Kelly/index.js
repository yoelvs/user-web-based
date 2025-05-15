document.addEventListener("DOMContentLoaded", function () {
  const userNameElement = document.getElementById("userName");
  const userTitleElement = document.getElementById("userTitle");
  const userPictureElement = document.getElementById("userPicture");

  const loggedInEmail = localStorage.getItem("loggedInUser");
  if (!loggedInEmail) return;

  const userData = localStorage.getItem(loggedInEmail);
  if (!userData) return;

  const user = JSON.parse(userData);

  if (userNameElement && user.fullName) {
    userNameElement.textContent = user.fullName;
  }

  if (userTitleElement && user.title) {
    userTitleElement.textContent = user.title;
  }

  if (userPictureElement && user.picture) {
    userPictureElement.src = user.picture;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userAboutElement = document.getElementById("userAbout");

  const loggedInEmail = localStorage.getItem("loggedInUser");
  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.about) {
        userAboutElement.textContent = user.about;
        return;
      }
    }
  }

  userAboutElement.textContent = "No information available.";
});

document.addEventListener("DOMContentLoaded", function () {
  const userPhoneElement = document.getElementById("userPhone");
  const loggedInEmail = localStorage.getItem("loggedInUser");
  
  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.Phone) {
        userPhoneElement.textContent = user.Phone;
        return;
      }
    }
  }

  userPhoneElement.textContent = "Not provided";
});

document.addEventListener("DOMContentLoaded", function () {
  const userCityElement = document.getElementById("city");
  const loggedInEmail = localStorage.getItem("loggedInUser");
  
  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.city) {
        userCityElement.textContent = user.city;
        return;
      }
    }
  }

  userCityElement.textContent = "Not provided";
});

document.addEventListener("DOMContentLoaded", function () {
  const userAgeElement = document.getElementById("age");
  const loggedInEmail = localStorage.getItem("loggedInUser");
  
  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.age) {
        userAgeElement.textContent = user.age;
        return;
      }
    }
  }

  userAgeElement.textContent = "Not provided";
});

document.addEventListener("DOMContentLoaded", function () {
  const userEmailElement = document.getElementById("email");
  const loggedInEmail = localStorage.getItem("loggedInUser");
  
  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.email) {
        userEmailElement.textContent = user.email;
        return;
      }
    }
  }

  userEmailElement.textContent = "Not provided";
});

document.addEventListener("DOMContentLoaded", function () {
  const linkedinLink = document.getElementById("linkedinLink");
  const loggedInEmail = localStorage.getItem("loggedInUser");

  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.linkedin) {
        linkedinLink.href = user.linkedin;
        return;
      }
    }
  }

  // fallback אם אין לינקדאין
  linkedinLink.href = "#";
});


document.addEventListener("DOMContentLoaded", function () {
  const githubLink = document.getElementById("github");
  const loggedInEmail = localStorage.getItem("loggedInUser");

  if (loggedInEmail) {
    const userData = localStorage.getItem(loggedInEmail);
    if (userData) {
      const user = JSON.parse(userData);
      if (user && user.github) {
        githubLink.href = user.github;
        return;
      }
    }
  }

  // fallback אם אין GitHub
  githubLink.href = "#";
});

document.addEventListener('DOMContentLoaded', function () {
  const skillsList = document.getElementById('skills-container'); // ודא שזה קיים ב-HTML

  const loggedInEmail = localStorage.getItem("loggedInUser");
  if (!loggedInEmail) return;

  const userData = localStorage.getItem(loggedInEmail);
  if (!userData) return;

  const user = JSON.parse(userData);
  if (!user.skills || !Array.isArray(user.skills)) return;

  const skillsArray = user.skills; // ← שים לב לשינוי כאן

const jsLogo = "/user-web-based/vecteezy_3d-javascript-logo-design_12697298.png";

const skillLogos = {
  javascript: jsLogo,
  js: jsLogo,
  JS: jsLogo,
  java: "/user-web-based/vecteezy_cup-of-coffee-with-a-flame-on-top_54484941.png",
  react: "/user-web-based/standout-art-deco-symmetrical-silhouette-of-an-atom-symbol-clean-lines-minimal-design-with-scalable-design-ultra-hd-free-png.webp",
  python: "/user-web-based/vecteezy_3d-python-programming-language-logo_12697295.png",
  html: "/user-web-based/vecteezy_stylized-3d-html-logo-design_12697299.png",
  css: "/user-web-based/vecteezy_stylized-3d-css-icon-side-view_11665094.png",
  nodejs: "/user-web-based/vecteezy_node-js-framework-3d-icon-transparent-background_60194950.png",
  typescript: "/user-web-based/vecteezy_typescript-programming-language-3d-icon-transparent-background_60194946.png",
  c: "/user-web-based/vecteezy_c-programming-icon_48332147.png",
  "c#": "/user-web-based/vecteezy_c-sharp-programming-language-3d-icon-transparent-background_60194935.png",
  "c++": "/user-web-based/vecteezy_3d-c-programming-language-logo_12697300.png",
};


  skillsArray.forEach(skill => {
    const key = skill.toLowerCase();
    const logo = skillLogos[key] || "assets/img/skills/default-logo.png";

    const skillElement = document.createElement('div');
    skillElement.classList.add('col-lg-3', 'col-md-4', 'col-6');
    skillElement.innerHTML = `
      <div class="skill-item text-center">
        <img src="${logo}" alt="${skill} logo" class="skill-logo mb-2" style="width: 60px;">
        <h5>${skill}</h5>
      </div>
    `;
    skillsList.appendChild(skillElement);
  });
});









