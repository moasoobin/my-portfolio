document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");
  
  cards.forEach((card, index) => {
    const videoSrc = card.getAttribute("data-video");
    const photoSrc = card.getAttribute("data-photo");
    
    console.log(`載入卡片 ${index + 1}:`, { videoSrc, photoSrc });
    
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
    img.className = "thumbnail";
    img.alt = "Video thumbnail";
    
    // 關鍵修改: 先不設定 src,等載入成功再顯示
    img.style.opacity = "0";
    wrapper.appendChild(img);
    
    // 圖片載入成功
    img.addEventListener("load", () => {
      console.log(`✅ 圖片 ${index + 1} 載入成功:`, photoSrc);
      console.log(`   尺寸: ${img.naturalWidth}x${img.naturalHeight}`);
      img.style.opacity = "1";
    });
    
    // 圖片載入失敗
    img.addEventListener("error", () => {
      console.error(`❌ 圖片 ${index + 1} 載入失敗:`, photoSrc);
      console.error(`   完整路徑: ${img.src}`);
      console.error(`   請檢查:`);
      console.error(`   1. 檔案名稱: ${photoSrc}`);
      console.error(`   2. 檔案是否存在於正確位置?`);
      console.error(`   3. 大小寫是否完全一致?`);
      
      // 備用方案: 顯示影片的第一幀
      img.style.display = "none";
      video.load();
    });
    
    // 設定圖片來源 (放在最後)
    img.src = photoSrc;
    
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
    
    video.addEventListener("play", () => {
      img.classList.add("hidden");
      btn.classList.add("hidden");
    });
  });
});
