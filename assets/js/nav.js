document.addEventListener("DOMContentLoaded", () => {
  const defaultLinks = [
    { key: "about", label: "about", href: "about.html" },
    { key: "books", label: "books", href: "books.html" },
    { key: "poetry", label: "poetry", href: "poetry.html" },
    { key: "photographs", label: "photographs", href: "photographs.html" },
    { key: "contact", label: "contact", href: "contact.html" }
  ];
  const navItems = Array.isArray(window.SITE_NAV_LINKS) ? window.SITE_NAV_LINKS : defaultLinks;

  const currentPath = window.location.pathname.split("/").pop() || "index_.html";
  const activeKey =
    document.body.dataset.navActive ||
    navItems.find((item) => item.href !== "#" && item.href === currentPath)?.key ||
    "";

  const desktopNav = document.querySelector(".nav .nav-links");
  if (desktopNav) {
    desktopNav.innerHTML = "";
    navItems.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.key === activeKey) {
        link.classList.add("active");
      }
      desktopNav.appendChild(link);
    });
  }

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    const deco = mobileMenu.querySelector(".mobile-menu-deco, .mobile-menu-accent");
    mobileMenu.innerHTML = "";
    if (deco) {
      mobileMenu.appendChild(deco);
    }
    navItems.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.key === activeKey) {
        link.classList.add("active");
      }
      mobileMenu.appendChild(link);
    });
  }

  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // Smooth page-to-page transition for navigation links.
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("http")) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("page-transition-out");
      window.setTimeout(() => {
        window.location.href = href;
      }, 180);
    });
  });
});
