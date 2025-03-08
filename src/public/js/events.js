const headerMenu = document.querySelector(".links ul");
const headerMenuIcon = document.querySelector("header .icon");
const specialSpan = document.querySelector("header span.special");

function updateVisibility(visible) {
  headerMenu.style.visibility = visible ? "visible" : "hidden";
  headerMenu.style.opacity = visible ? "1" : "0";
}

function updateWidth(width) {
  if (specialSpan) {
    specialSpan.style.width = width;
  }
}

function toggleVisibilityClick() {
  const isHidden =
    headerMenu.style.visibility === "hidden" ||
    headerMenu.style.opacity === "0";

  if (isHidden) {
    updateVisibility(true);
    headerMenu.classList.add("clicked");
  } else if (headerMenu.classList.contains("clicked")) {
    updateVisibility(false);
    headerMenu.classList.remove("clicked");
    updateWidth("60%");
  } else {
    headerMenu.classList.add("clicked");
    updateWidth("100%");
  }
}

function showMouseover() {
  const isHidden =
    headerMenu.style.visibility === "hidden" ||
    headerMenu.style.opacity === "0";

  if (isHidden) {
    updateVisibility(true);
    updateWidth("100%");
  }
}

function showMouseleave(e) {
  if (!headerMenu.classList.contains("clicked")) {
    updateVisibility(false);
    updateWidth("60%");
  } else {
    e.preventDefault();
  }
}

(function initialize() {
  headerMenuIcon.addEventListener("click", toggleVisibilityClick);
  headerMenuIcon.addEventListener("mouseover", showMouseover);
  headerMenuIcon.addEventListener("mouseleave", showMouseleave);
})();
