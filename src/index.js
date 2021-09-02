let bodyElm = document.querySelector("body");
let prevPos = window.pageYOffset;

window.addEventListener("scroll", hideMenuAndIcon, false);
window.addEventListener("storage", saveCurrentThemeToLocalStorage, false);

function hideMenuAndIcon() {
  let currentPos = window.pageYOffset;
  if (prevPos > currentPos) {
    // user scrolled up -> show menu
    document.querySelector(".top-header").style.top = "0";
  } else {
    // user scrolled down -> hide menu
    document.querySelector(".top-header").style.top = "-76px";
  }
  if (currentPos > 10) {
    // user scrolls down 10px or more -> hide icon
    document.querySelector(".expand-more-button").style.opacity = 0;
    document.querySelector(".expand-more-button").style.visibility = "hidden";
  } else {
    // user is within the first 10px of the site -> show icon
    document.querySelector(".expand-more-button").style.opacity = 1;
    document.querySelector(".expand-more-button").style.visibility = "visible";
  }
  prevPos = currentPos;
}

function saveCurrentThemeToLocalStorage() {
  if (localStorage.theme == "dark") {
    bodyElm.classList.add("dark-mode");
  } else {
    bodyElm.classList.remove("dark-mode");
  }
}

function toggleMenu() {
  let buttonElms = document.querySelectorAll(".js-menu-button");
  let navElm = document.querySelector(".js-navigation");
  let contentElm = document.querySelector(".js-content");

  toggle([...buttonElms, navElm, contentElm]);
  preventScroll(navElm);
}

function preventScroll(navElm) {
  if (!navElm.classList.contains("hidden")) {
    bodyElm.style.overflow = "hidden";
  } else {
    bodyElm.style.overflow = "visible";
  }
}

function toggle(elements) {
  const toggleKey = "hidden";
  for (let e of elements) {
    if (e.classList.contains(toggleKey)) {
      e.classList.remove(toggleKey);
    } else {
      e.classList.add(toggleKey);
    }
  }
}

function toggleTheme() {
  if (localStorage.theme == "dark") {
    localStorage.theme = "light";
    bodyElm.classList.remove("dark-mode");
  } else {
    localStorage.theme = "dark";
    bodyElm.classList.add("dark-mode");
  }
}
