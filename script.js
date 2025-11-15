document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");
  
  // 使用 Intersection Observer 實現延遲載入
  const observerOptions = {
    root: null,
    rootMargin: "50px", // 提前 50px 開始載入
    threshold: 0.01
  };
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        loadCardContent(card);
        observer.unobserve(card); // 載入後停止觀察
      }
    });
  }, observerOptions);
  
  // 觀察所有卡片
  cards.forEach(card => {
    imageObserver.observe(card);
  });
  
  function loadCardContent(card) {
    const videoSrc = card.getAttribute("data-video");
    const photoSrc = card.getAttribute("data-photo");
    
    // 建立容器
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";
    card.appendChild(wrapper);
    
    // 建立影片(不預先載入)
    const video = document.createElement("video");
    video.setAttribute("data-src", videoSrc); // 先不設置 src
    video.controls = true;
    video.playsInline = true;
    video.preload = "none"; // 改為 none,只有點擊時才載入
    wrapper.appendChild(video);
    
    // 建立封面(使用延遲載入)
    const img = document.createElement("img");
    img.src = photoSrc; // 已進入視窗才載入
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
      // 第一次點擊時才載入影片
      if (!video.src) {
        video.src = video.getAttribute("data-src");
      }
      
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
    
    video.addEventListener("play", () => {
      img.classList.add("hidden");
      btn.classList.add("hidden");
    });
  }
});
