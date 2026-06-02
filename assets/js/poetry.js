// On mobile, collapse poem 4's two columns
function fixPoem4() {
  const cols = document.querySelectorAll(".poems-grid > div:last-child > div[style]");
  if (window.innerWidth <= 768) {
    cols.forEach((col) => {
      col.style.gridTemplateColumns = "1fr";
      col.style.gap = "0";
    });
  } else {
    cols.forEach((col) => {
      col.style.gridTemplateColumns = "1fr 1fr";
      col.style.gap = "48px";
    });
  }
}

fixPoem4();
window.addEventListener("resize", fixPoem4);
