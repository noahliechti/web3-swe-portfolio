let bodyElm = document.querySelector("body");
let donateBtnElm = document.querySelector(".js-donate-button");
let prevPos = window.pageYOffset;
const SHORT_SCREEN = 400;

document.addEventListener("DOMContentLoaded", init, false);
document.addEventListener("scroll", hideMenuAndIcon, false);
document.addEventListener("storage", saveCurrentThemeToLocalStorage, false);
window.addEventListener("resize", hideExpandIcon, true);

function init() {
  donateBtnElm.addEventListener("click", () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((account) => makeTransaction(account));
    }
  });
  hideExpandIcon();
}

function makeTransaction(account) {
  if (Number(ethereum.networkVersion) === 1) {
    const transactionParameters = {
      to: "0x08A5551231eC36ca85b93c87f78C6caEbfBbbBeB",
      from: account[0], // TODO: should I use ethereum.selectedAddress?
      value: (2 * 10 ** 15).toString(16), // 0.002 ETH
    };

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .catch((err) => console.log(err));
  }
}

function hideExpandIcon() {
  const isShortScreen = document.body.clientHeight < SHORT_SCREEN;
  let currentPos = window.pageYOffset;

  if (isShortScreen) {
    document.querySelector(".expand-more-button").style.opacity = 0;
    document.querySelector(".expand-more-button").style.visibility = "hidden";
  } else if (currentPos < 11) {
    // user is within the first 10px of the site -> show icon
    document.querySelector(".expand-more-button").style.opacity = 1;
    document.querySelector(".expand-more-button").style.visibility = "visible";
  }
}

function hideMenuAndIcon() {
  const isShortScreen = document.body.clientHeight < SHORT_SCREEN;
  let currentPos = window.pageYOffset;

  if (prevPos > currentPos || prevPos < 0 || currentPos < 0) {
    // user scrolled up -> show menu (prevents "bounce-back" movement to hide menu)
    document.querySelector(".top-header").style.top = "0";
  } else {
    // user scrolled down -> hide menu
    // document.querySelector(".top-header").style.top = "-76px";
    document.querySelector(".top-header").style.top = "-108px";
  }
  if (currentPos > 10 || isShortScreen) {
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
