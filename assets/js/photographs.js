const photos = [
  { src: "photographs/DSCN4938 copy.jpg", title: "The Village Beneath the Mist", loc: "Kumaon · 2012", cat: "village" },
  { src: "photographs/IMG_8782 copy.jpg", title: "Steps to the Sky", loc: "Kumaon · 2012", cat: "village" },
  { src: "photographs/_MG_7417 copy.jpg", title: "The Edge of Dawn", loc: "Kausani · 2015", cat: "mountains" },
  { src: "photographs/20241018_084611256_iOS-2.jpg", title: "The blues of Maldives", loc: "Maldives · 2024", cat: "Sea" },
  { src: "photographs/20230714_080912685_iOS.jpg", title: "Melodies of the Desert", loc: "Jodhpur · 2022", cat: "people" },
  { src: "photographs/swiss.jpg", title: "Beneath the Alpine Sky", loc: "Switzerland · 2026", cat: "mountains" },
  { src: "photographs/SNAKE CHARMER.jpg", title: "The Last Enchanter", loc: "New Delhi · 2014", cat: "people" },
  { src: "photographs/IMG_9387.JPG", title: "The Weight of Stillness", loc: "Ayodhya · 2016", cat: "people" },
  { src: "photographs/IMG_8942.JPG", title: "A Lifetime of Stories", loc: "Delhi · 2022", cat: "people" },
  { src: "photographs/FB_IMG_1489337195432_8d7a6c49.jpg", title: "Colors of Devotion", loc: "Ghaziabad · 2009", cat: "people" },
  { src: "photographs/IMG_7697.jpg", title: "Farmers ploughing paddy fields", loc: "Kumanon · 2015", cat: "village" },
  { src: "photographs/DSCN4927.JPG", title: "Burden of the Hills", loc: "Kumaon · 2021", cat: "village" },
  { src: "photographs/20211121_120205_5d81ec81.jpg", title: "Emerald in the Hills", loc: "Nainital · 2022", cat: "mountains" },
  { src: "photographs/20250325_004146351_iOS.jpg", title: "The River Receives the Sun", loc: "Varanasi · 2024", cat: "divine" },
  { src: "photographs/20230713_134427617_iOS.jpg", title: "Where the Desert Meets the Sky", loc: "Jodhpur · 2023", cat: "divine" },
  { src: "photographs/20250325_010347209_iOS.jpg", title: "Where Time Comes to Pray", loc: "Varanasi · 2025", cat: "divine" },
  { src: "photographs/20260331_084115627_iOS.jpg", title: "Where the Desert Meets the Sky", loc: "Jageshwar · 2026", cat: "divine" },
  { src: "photographs/IMG_0402_c6304ae9.jpg", title: "Three Singers", loc: "Kumaon · 2018", cat: "people" },
  { src: "photographs/DSCN5873.jpg", title: "Valley of Light", loc: "Kashmir · 2009", cat: "mountains" }
];

let activeCat = "all";
let filtered = photos.slice();
let currentIndex = 0;
let lbIndex = 0;

const VISIBLE = 5;
const CARD_W = 260 + 16;

const track = document.getElementById("carouselTrack");
const mobileGrid = document.getElementById("mobileGrid");

function buildItems() {
  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "carousel-item";
    item.dataset.cat = photo.cat;
    item.dataset.idx = index.toString();
    item.innerHTML = `
      <div class="carousel-img-wrap">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy" decoding="async">
      </div>
      <div class="carousel-meta">
        <div class="carousel-title">${photo.title}</div>
        <div class="carousel-loc">${photo.loc}</div>
      </div>`;
    item.addEventListener("click", () => openLightbox(index));
    track.appendChild(item);

    const mobileItem = document.createElement("div");
    mobileItem.className = "mobile-grid-item";
    mobileItem.dataset.cat = photo.cat;
    mobileItem.innerHTML = `
      <div class="mobile-grid-img">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy" decoding="async">
      </div>
      <div class="mobile-grid-meta">
        <div class="mobile-grid-title">${photo.title}</div>
        <div class="mobile-grid-loc">${photo.loc}</div>
      </div>`;
    mobileItem.addEventListener("click", () => openLightbox(index));
    mobileGrid.appendChild(mobileItem);
  });
}

function getFiltered() {
  return photos
    .map((photo, index) => ({ ...photo, origIdx: index }))
    .filter((photo) => activeCat === "all" || photo.cat === activeCat);
}

function renderCarousel() {
  filtered = getFiltered();
  document.querySelectorAll(".carousel-item").forEach((el) => {
    const category = el.dataset.cat;
    el.style.display = activeCat === "all" || category === activeCat ? "block" : "none";
  });

  currentIndex = 0;
  updateCarouselPosition();
}

function updateCarouselPosition() {
  const total = filtered.length;
  const offset = currentIndex * CARD_W;
  track.style.transform = `translateX(-${offset}px)`;

  const start = currentIndex + 1;
  const end = Math.min(currentIndex + VISIBLE, total);
  document.getElementById("carouselCount").textContent = `${start} – ${end} of ${total}`;

  const pct = total <= VISIBLE ? 100 : ((currentIndex + VISIBLE) / total) * 100;
  document.getElementById("progressBar").style.width = `${Math.min(pct, 100)}%`;

  document.getElementById("btnPrev").disabled = currentIndex === 0;
  document.getElementById("btnNext").disabled = currentIndex >= total - VISIBLE;
}

function openLightbox(origIdx) {
  lbIndex = origIdx;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderLightbox() {
  const photo = photos[lbIndex];
  document.getElementById("lbImg").src = photo.src;
  document.getElementById("lbImg").alt = photo.title;
  document.getElementById("lbTitle").textContent = photo.title;
  document.getElementById("lbLoc").textContent = photo.loc;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

function lbNav(direction) {
  lbIndex = (lbIndex + direction + photos.length) % photos.length;
  renderLightbox();
}

function setupInteractions() {
  document.getElementById("btnPrev").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 4;
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      updateCarouselPosition();
    }
  });

  document.getElementById("btnNext").addEventListener("click", () => {
    const total = filtered.length;
    if (currentIndex < total - VISIBLE) {
      currentIndex = Math.min(currentIndex + 4, total - VISIBLE);
      updateCarouselPosition();
    }
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.dataset.cat;
      document.querySelectorAll(".filter-btn").forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");

      const label = activeCat === "all" ? "all photographs" : activeCat;
      document.getElementById("carouselLabel").textContent = label;
      document.querySelector(".mobile-grid-header .section-label").textContent = label;

      document.querySelectorAll(".mobile-grid-item").forEach((el) => {
        el.style.display = activeCat === "all" || el.dataset.cat === activeCat ? "block" : "none";
      });

      renderCarousel();
    });
  });

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => lbNav(-1));
  document.getElementById("lbNext").addEventListener("click", () => lbNav(1));
  document.getElementById("lightbox").addEventListener("click", (event) => {
    if (event.target === document.getElementById("lightbox")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!document.getElementById("lightbox").classList.contains("open")) {
      return;
    }
    if (event.key === "ArrowRight") {
      lbNav(1);
    }
    if (event.key === "ArrowLeft") {
      lbNav(-1);
    }
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  let lbTouchX = 0;
  document.getElementById("lightbox").addEventListener(
    "touchstart",
    (event) => {
      lbTouchX = event.touches[0].clientX;
    },
    { passive: true }
  );
  document.getElementById("lightbox").addEventListener(
    "touchend",
    (event) => {
      const dx = event.changedTouches[0].clientX - lbTouchX;
      if (Math.abs(dx) > 45) {
        lbNav(dx < 0 ? 1 : -1);
      }
    },
    { passive: true }
  );
}

buildItems();
setupInteractions();
renderCarousel();
