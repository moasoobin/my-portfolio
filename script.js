document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");

  cards.forEach((card) => {
    const videoSrc = card.getAttribute("data-video");
    const photoSrc = card.getAttribute("data-photo");

    // 建立影片元素
    const video = document.createElement("video");
    video.src = videoSrc;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.className = "video-element";

    // 建立封面
    const img = document.createElement("img");
    img.src = photoSrc;
    img.className = "thumbnail";
    img.alt = "Video thumbnail";

    // 建立播放按鈕
    const btn = document.createElement("div");
    btn.className = "play-btn";
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", "Play video");

    // 清空 card 並加元素
    card.innerHTML = "";
    card.appendChild(video);
    card.appendChild(img);
    card.appendChild(btn);

    // 播放影片
    function playVideo() {
      img.classList.add("hidden");
      btn.classList.add("hidden");
      video.play().catch(err => console.log("播放失敗:", err));
    }

    // 顯示封面
    function showCover() {
      img.classList.remove("hidden");
      btn.classList.remove("hidden");
    }

    btn.addEventListener("click", playVideo);
    img.addEventListener("click", playVideo);
    video.addEventListener("play", () => {
      img.classList.add("hidden");
      btn.classList.add("hidden");
    });
    video.addEventListener("pause", showCover);
    video.addEventListener("ended", showCover);
  });
});
