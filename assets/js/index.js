/* ─── DATA ─── */
const chapters = [
  ["१", "नंदा", "एक किसान का परिचय"],
  ["२", "अंतर्द्वंद", "भीतर उठती हलचल"],
  ["३", "सिद्धार्थ", "एक राजकुमार की छाया"],
  ["४", "मन्दक", "छल और लालसा"],
  ["५", "संन्यास", "त्याग का पहला क्षण"],
  ["६", "माया", "संसार की माया"],
  ["७", "छल", "विश्वासघात"],
  ["८", "हरिकेशबल", "रहस्यमय साधु"],
  ["९", "अंकुरण", "ज्ञान का अंकुर"],
  ["१०", "ज्ञानोदय", "उत्तर मिलता है"],
  ["११", "महामारी", "मृत्यु का सामना"],
  ["१२", "चांडाल", "समाज की सीमाएँ"],
  ["१३", "ज्ञान", "नई शुरुआत"]
];

/* ─── INTRO ANIMATION ─── */
const words = ["अहंकार", "विरह", "दमन", "विक्षिप्तता", "भक्ति", "माया", "लोभ", "वासना", "छल", "स्वप्न", "वैराग्य", "मृत्यु", "बोध", "मुक्ति"];
const wait = (m) => new Promise((resolve) => setTimeout(resolve, m));

const cloudSizes = [13, 15, 17, 14, 18, 13, 16, 14, 15, 17, 16, 18, 15, 22];

function safeCloudPos() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cx = W / 2;
  const cy = H / 2;
  const avoid = { x: cx - W * 0.22, y: cy - H * 0.28, w: W * 0.44, h: H * 0.56 };
  let x;
  let y;
  let tries = 0;
  do {
    x = 0.06 * W + Math.random() * 0.88 * W;
    y = 0.06 * H + Math.random() * 0.88 * H;
    tries += 1;
  } while (tries < 40 && x > avoid.x && x < avoid.x + avoid.w && y > avoid.y && y < avoid.y + avoid.h);
  return { x, y };
}

function injectFloatKeyframe(id, dx, dy) {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float-${id} {
      0%   { transform: translate(0px, 0px) rotate(${-1.5 + Math.random() * 3}deg); }
      33%  { transform: translate(${dx * 0.6}px, ${dy * 0.4}px) rotate(${-1 + Math.random() * 2}deg); }
      66%  { transform: translate(${dx * -0.4}px, ${dy * 0.7}px) rotate(${Math.random() * 2}deg); }
      100% { transform: translate(0px, 0px) rotate(${-1.5 + Math.random() * 3}deg); }
    }
  `;
  document.head.appendChild(style);
}

const stageEl = document.getElementById("stage-word");
const cloudEls = [];

async function runIntro() {
  for (let i = 0; i < words.length; i += 1) {
    stageEl.textContent = words[i];
    stageEl.style.animation = "none";
    stageEl.style.opacity = "0";
    stageEl.style.transform = "translate(-50%,-50%) scale(1)";
    void stageEl.offsetWidth;
    stageEl.style.transition = "none";
    stageEl.style.animation = "blast-in 2s cubic-bezier(.2,0,.4,1) forwards";

    await wait(i === words.length - 1 ? 350 : 650);

    const pos = safeCloudPos();
    const dx = 4 + Math.random() * 7;
    const dy = 3 + Math.random() * 5;
    const floatId = `w${i}`;
    injectFloatKeyframe(floatId, dx, dy);

    const el = document.createElement("div");
    el.className = "cloud-word";
    el.textContent = words[i];
    el.style.cssText = `
      left: ${pos.x}px; top: ${pos.y}px;
      font-size: ${cloudSizes[i]}px;
      opacity: 0;
      transform: translate(-50%,-50%);
    `;
    document.getElementById("intro").appendChild(el);
    cloudEls.push(el);

    stageEl.style.animation = "none";
    stageEl.style.transition = "opacity 0.22s ease, transform 0.28s cubic-bezier(.4,0,.6,1)";
    stageEl.style.opacity = "0";
    stageEl.style.transform = "translate(-50%,-50%) scale(0.38)";

    setTimeout(() => {
      el.style.transition = "opacity 0.35s ease";
      el.style.opacity = String(0.10 + Math.random() * 0.3);
      setTimeout(() => {
        const dur = 5 + Math.random() * 120;
        const delay = Math.random() * 12;
        el.style.animation = `float-${floatId} ${dur}s ${delay}s ease-in-out infinite`;
      }, 400);
    }, 80);

    await wait(60);
  }

  await wait(300);
  document.getElementById("cover").classList.add("show");
  setTimeout(() => document.getElementById("nav").classList.add("show"), 500);
  setTimeout(() => {
    document.querySelectorAll(".atm").forEach((entry) => {
      entry.style.opacity = "0";
    });
    document.getElementById("site").classList.add("show");
  }, 1800);
  setTimeout(() => {
    const intro = document.getElementById("intro");
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
    }, 1600);
  }, 3200);

  setTimeout(() => {
    document.body.classList.add("page-transition-out");
    setTimeout(() => {
      window.location.href = "about.html";
    }, 220);
  }, 4300);
}

runIntro();

/* ─── DESKTOP SCRUBBER ─── */
const nodesRow = document.getElementById("desktopNodes");
const fill = document.getElementById("desktopFill");

chapters.forEach((chapter, i) => {
  const btn = document.createElement("button");
  btn.className = "node-btn";
  btn.innerHTML = `
    <div class="node-tooltip">अध्याय ${chapter[0]}: ${chapter[1]}</div>
    <div class="node-dot"></div>
    <div class="node-label">${chapter[1]}</div>
  `;
  btn.addEventListener("click", () => showDesktop(i));
  nodesRow.appendChild(btn);
});

function showDesktop(i) {
  document.querySelectorAll(".node-btn").forEach((btn, idx) => {
    btn.classList.remove("active", "visited");
    if (idx < i) {
      btn.classList.add("visited");
    }
  });
  document.querySelectorAll(".node-btn")[i].classList.add("active");
  fill.style.width = `${(i / (chapters.length - 1)) * 100}%`;
  document.getElementById("dNum").textContent = `अध्याय ${chapters[i][0]}`;
  document.getElementById("dName").textContent = chapters[i][1];
  document.getElementById("dDesc").textContent = chapters[i][2];
}

showDesktop(0);

/* ─── MOBILE SWIPE CAROUSEL ─── */
const track = document.getElementById("swipeTrack");
const dots = document.getElementById("mobileDots");
const outer = document.getElementById("swipeOuter");
let current = 0;
let startX = 0;
let isDragging = false;
let dragDelta = 0;

chapters.forEach((chapter, i) => {
  const card = document.createElement("div");
  card.className = "swipe-card";
  card.innerHTML = `
    <div class="swipe-card-num">अध्याय ${chapter[0]}</div>
    <div class="swipe-card-name">${chapter[1]}</div>
    <div class="swipe-card-desc">${chapter[2]}</div>
    <div class="swipe-card-index">${i + 1} / ${chapters.length}</div>
  `;
  track.appendChild(card);

  const dot = document.createElement("div");
  dot.className = "progress-dot";
  dot.addEventListener("click", () => goTo(i));
  dots.appendChild(dot);
});

function getCardWidth() {
  const card = track.querySelector(".swipe-card");
  if (!card) {
    return 0;
  }
  return card.offsetWidth + 24;
}

function goTo(i, animated = true) {
  current = Math.max(0, Math.min(chapters.length - 1, i));
  track.style.transition = animated ? "transform .4s cubic-bezier(.4,0,.2,1)" : "none";
  const offset = -(current * getCardWidth()) + (window.innerWidth / 2 - getCardWidth() / 2 + 12);
  track.style.transform = `translateX(${offset}px)`;
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".progress-dot").forEach((dot, idx) => {
    dot.classList.remove("active", "visited");
    if (idx === current) {
      dot.classList.add("active");
    } else if (idx < current) {
      dot.classList.add("visited");
    }
  });
}

outer.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  isDragging = true;
  track.style.transition = "none";
}, { passive: true });

outer.addEventListener("touchmove", (event) => {
  if (!isDragging) {
    return;
  }
  dragDelta = event.touches[0].clientX - startX;
  const base = -(current * getCardWidth()) + (window.innerWidth / 2 - getCardWidth() / 2 + 12);
  track.style.transform = `translateX(${base + dragDelta}px)`;
}, { passive: true });

outer.addEventListener("touchend", () => {
  isDragging = false;
  if (dragDelta < -50) {
    goTo(current + 1);
  } else if (dragDelta > 50) {
    goTo(current - 1);
  } else {
    goTo(current);
  }
  dragDelta = 0;
});

outer.addEventListener("mousedown", (event) => {
  startX = event.clientX;
  isDragging = true;
  track.style.transition = "none";
  event.preventDefault();
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) {
    return;
  }
  dragDelta = event.clientX - startX;
  const base = -(current * getCardWidth()) + (window.innerWidth / 2 - getCardWidth() / 2 + 12);
  track.style.transform = `translateX(${base + dragDelta}px)`;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) {
    return;
  }
  isDragging = false;
  if (dragDelta < -50) {
    goTo(current + 1);
  } else if (dragDelta > 50) {
    goTo(current - 1);
  } else {
    goTo(current);
  }
  dragDelta = 0;
});

window.addEventListener("load", () => goTo(0, false));
window.addEventListener("resize", () => goTo(current, false));
