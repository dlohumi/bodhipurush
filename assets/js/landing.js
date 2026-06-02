document.addEventListener("DOMContentLoaded", () => {
  const words = ["अहंकार", "विरह", "दमन", "विक्षिप्तता", "भक्ति", "माया", "लोभ", "वासना", "छल", "स्वप्न", "वैराग्य", "मृत्यु", "बोध", "मुक्ति"];
  const cloudSizes = [13, 15, 17, 14, 18, 13, 16, 14, 15, 17, 16, 18, 15, 22];
  const wait = (m) => new Promise((resolve) => setTimeout(resolve, m));
  const intro = document.getElementById("intro");
  const stageEl = document.getElementById("stage-word");
  const cover = document.getElementById("cover");

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
        0% { transform: translate(0px, 0px); }
        33% { transform: translate(${dx * 0.6}px, ${dy * 0.4}px); }
        66% { transform: translate(${dx * -0.4}px, ${dy * 0.7}px); }
        100% { transform: translate(0px, 0px); }
      }
    `;
    document.head.appendChild(style);
  }

  async function runIntro() {
    for (let i = 0; i < words.length; i += 1) {
      stageEl.textContent = words[i];
      stageEl.style.animation = "none";
      stageEl.style.opacity = "0";
      stageEl.style.transform = "translate(-50%,-50%) scale(1)";
      void stageEl.offsetWidth;
      stageEl.style.animation = "blast-in 2s cubic-bezier(.2,0,.4,1) forwards";

      await wait(i === words.length - 1 ? 350 : 650);

      const pos = safeCloudPos();
      const floatId = `w${i}`;
      injectFloatKeyframe(floatId, 4 + Math.random() * 7, 3 + Math.random() * 5);

      const wordEl = document.createElement("div");
      wordEl.className = "cloud-word";
      wordEl.textContent = words[i];
      wordEl.style.left = `${pos.x}px`;
      wordEl.style.top = `${pos.y}px`;
      wordEl.style.fontSize = `${cloudSizes[i]}px`;
      wordEl.style.transform = "translate(-50%,-50%)";
      intro.appendChild(wordEl);

      stageEl.style.animation = "none";
      stageEl.style.transition = "opacity 0.22s ease, transform 0.28s cubic-bezier(.4,0,.6,1)";
      stageEl.style.opacity = "0";
      stageEl.style.transform = "translate(-50%,-50%) scale(0.38)";

      setTimeout(() => {
        wordEl.style.transition = "opacity 0.35s ease";
        wordEl.style.opacity = String(0.10 + Math.random() * 0.3);
        setTimeout(() => {
          wordEl.style.animation = `float-${floatId} ${5 + Math.random() * 12}s ${Math.random() * 2}s ease-in-out infinite`;
        }, 400);
      }, 80);

      await wait(60);
    }

    await wait(300);
    cover.classList.add("show");

    await wait(1000);
    document.querySelectorAll(".atm").forEach((entry) => {
      entry.style.opacity = "0";
    });
    stageEl.style.opacity = "0";

    await wait(900);
    document.body.classList.add("page-transition-out");
    window.setTimeout(() => {
      window.location.href = "about.html";
    }, 240);
  }

  runIntro();
});
