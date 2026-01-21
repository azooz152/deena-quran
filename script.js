document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".surahs button");
  buttons.forEach(btn => {
    btn.onclick = () => {
      window.location.href = "surah.html?surah=" + encodeURIComponent(btn.innerText);
    };
  });

  const params = new URLSearchParams(window.location.search);
  const nameLabel = document.getElementById("surahName");
  if (nameLabel) {
    nameLabel.textContent = params.get("surah") || "سورة";
    startTalking();
  }
});

function startTalking() {
  const mouth = document.getElementById("mouth");
  if (!mouth) return;
  const imgs = ["assets/images/mouth_closed.png", "assets/images/mouth_half.png", "assets/images/mouth_open.png"];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % imgs.length;
    mouth.src = imgs[i];
  }, 170);
}
