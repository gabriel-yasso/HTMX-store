const actionElement = document.querySelector(".links ul");
const eventElement = document.querySelector(".links");

function toggleDisplay() {
  if (actionElement.style.display === "block") {
    actionElement.style.display = "none";
  } else {
    actionElement.style.display = "block";
  }
}

(function () {
  if (!actionElement || !eventElement) {
    return;
  } else {
    eventElement.addEventListener("click", toggleDisplay);
  }
})();
