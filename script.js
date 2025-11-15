document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");
  const loadedCards = new Set(); // 追蹤已載入的卡片
  
  // 優化後的 Observer - 更嚴格的觸發條件
  const observerOptions = {
    root: null,
    rootMargin: "0px", // 移除提前載入
    threshold: 0.1 // 至少 10% 可見才載入
  };
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !loadedCards.has(entry.target)) {
        loadedCards.add(entry.target);
        // 使用 setTimeout 防止同時載入過多
        setTimeout(() => {
          loadCardContent(entry.target);
        }, 100);
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
    
    // 建立影片(完全不預載)
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    wrapper.appendChild(video);
    
    // 建立封面
    const img = document.createElement("img");
    img.className = "thumbnail";
    img.alt = "Video thumbnail";
    
    // 使用 loading="lazy" 原生延遲載入
    img.loading = "lazy";
    img.src = photoSrc;
    
    wrapper.appendChild(img);
    
    // 建立播放按鈕
    const btn = document.createElement("div");
    btn.className = "play-btn";
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-label", "Play video");
    wrapper.appendChild(btn);
    
    let videoLoaded = false;
    
    // 播放影片
    function playVideo() {
      // 只在第一次點擊時載入影片
      if (!videoLoaded) {
        video.src = videoSrc;
        videoLoaded = true;
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
