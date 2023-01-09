const scrollTopButton = document.getElementById("scrollTopButton");

window.onscroll = function () {
  if (window.pageYOffset > 1500) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

scrollTopButton.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function initServerData(serverIp, serverPort) {
  const serverIpElement = document.getElementById("server-ip");
  serverIpElement.innerHTML = serverIp;
  fetch("https://mcapi.us/server/status?ip=" + serverIp + "&port=" + serverPort)
    .then((response) => response.json())
    .then((data) => handleServerStatus(data));

  function handleServerStatus(data) {
    if (data.status == "error") {
      console.log(data.error);
      return false;
    }

    document.querySelector("#online-status").innerHTML = status.online
      ? "offline"
      : "online";

    const playerCounter = document.getElementById("player-count");
    playerCounter.innerHTML = data.players.now;

    const logo = document.getElementById("server-icon");
    logo.src = data.favicon;
  }
}
initServerData("joe.onthewifi.com", "25565");
