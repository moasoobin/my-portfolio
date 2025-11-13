document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");

  cards.forEach((card) => {
    const videoSrc = card.getAttribute("data-video");
    const photoSrc = card.getAttribute("data-photo");

    // 建立容器
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";
    card.appendChild(wrapper);

    // 建立影片
    const video = document.createElement("video");
    video.src = videoSrc;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    wrapper.appendChild(video);

    // 建立封面
    const img = document.createElement("img");
    img.src = photoSrc;
    img.className = "thumbnail";
    img.alt = "Video thumbnail";
    wrapper.appendChild(img);

    // 建立播放按鈕
    const btn = document.createElement("div");
    btn.className = "play-btn";
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", "Play video");
    wrapper.appendChild(btn);

    // 播放影片
    function playVideo() {
      img.classList.add("hidden");
      btn.classList.add("hidden");
      video.play().catch(err => {
        console.log("播放失敗:", err);
        showCover();
      });
    }

    // 顯示封面
    function showCover() {
      img.classList.remove("hidden");
      btn.classList.remove("hidden");
    }

    // 事件監聽
    btn.addEventListener("click", playVideo);
    img.addEventListener("click", playVideo);
    
    video.addEventListener("pause", showCover);
    video.addEventListener("ended", showCover);
    
    // 點擊影片時不顯示封面
    video.addEventListener("play", () => {
      img.classList.add("hidden");
      btn.classList.add("hidden");
    });
  });
});
