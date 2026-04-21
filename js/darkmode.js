// light/dark mode switching
const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector(".icon");

const sun = "assets/sun.png";
const moon = "assets/moon.png";

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  root.classList.add("dark-mode");
}

function updateIcon() {
  const isDark = root.classList.contains("dark-mode");
  icon.src = isDark ? moon : sun;
}

const logo = document.getElementById("sitelogo");

function updateLogo() {
  const isDark = document.documentElement.classList.contains("dark-mode");
  logo.src = isDark ? "assets/darkmodelogo.png" : "assets/lightmodelogo.png";
}

// initial sync
updateIcon();
updateLogo();

toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark-mode");

  const isDark = root.classList.contains("dark-mode");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  updateIcon();
  updateLogo();
});