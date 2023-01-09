const scrollTopButton = document.getElementById("scrollTopButton");

// Show the button when the user scrolls down
window.onscroll = function () {
  if (window.pageYOffset > 2300) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

// When the user clicks the button, scroll to the top of the document
scrollTopButton.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
