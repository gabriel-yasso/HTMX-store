const headerMenu = document.querySelector(".links ul");
const headerMenuIcon = document.querySelector("header .icon");
const specialSpan = document.querySelector("header span.special");

function updateMenuVisibility(visible) {
  headerMenu.style.visibility = visible ? "visible" : "hidden";
  headerMenu.style.opacity = visible ? "1" : "0";
}

function updateSpanWidth(width) {
  if (specialSpan) {
    specialSpan.style.width = width;
  }
}

function toggleVisibilityClick() {
  const isHidden =
    headerMenu.style.visibility === "hidden" ||
    headerMenu.style.opacity === "0";

  if (isHidden) {
    updateMenuVisibility(true);
    headerMenu.classList.add("clicked");
    updateSpanWidth("100%");
  } else if (headerMenu.classList.contains("clicked")) {
    updateMenuVisibility(false);
    headerMenu.classList.remove("clicked");
    updateSpanWidth("60%");
  } else {
    headerMenu.classList.add("clicked");
    updateSpanWidth("100%");
  }
}

function showMouseover() {
  const isHidden =
    headerMenu.style.visibility === "hidden" ||
    headerMenu.style.opacity === "0";

  if (isHidden) {
    updateMenuVisibility(true);
    updateSpanWidth("100%");
  }
}

function showMouseleave(e) {
  if (!headerMenu.classList.contains("clicked")) {
    updateMenuVisibility(false);
    updateSpanWidth("60%");
  } else {
    e.preventDefault();
  }
}

(function initialize() {
  headerMenuIcon.addEventListener("click", toggleVisibilityClick);
  headerMenuIcon.addEventListener("mouseover", showMouseover);
  headerMenuIcon.addEventListener("mouseleave", showMouseleave);
})();
