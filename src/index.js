function toggleMenu() {
  let buttons = document.querySelectorAll(".js-menu-button");
  let nav = document.querySelector(".js-navigation");
  let content = document.querySelector(".js-content");

  toggle([...buttons, nav, content]);
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
