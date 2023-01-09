const scrollTopButton = document.getElementById("scrollTopButton");

window.onscroll = function () {
  if (window.pageYOffset > 2300) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

scrollTopButton.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
