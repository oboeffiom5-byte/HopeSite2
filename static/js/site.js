(function () {
  // Fade / slide things in as she scrolls.
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(function (e) { e.classList.add("in"); }); }
  else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.15 });
    items.forEach(function (e) { io.observe(e); });
  }

  // A few gentle hearts (letter page only).
  if (document.body.hasAttribute("data-hearts") && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      if (document.querySelectorAll(".heart").length > 8) return;
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = Math.random() > 0.5 ? "♥" : "♡";
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = (Math.random() * 14 + 12) + "px";
      h.style.animationDuration = (Math.random() * 6 + 9) + "s";
      document.body.appendChild(h);
      setTimeout(function () { h.remove(); }, 16000);
    }, 1600);
  }

  // Open the envelope.
  const scene = document.getElementById("letterScene"), btn = document.getElementById("openLetter");
  if (scene && btn) {
    btn.addEventListener("click", function () {
      scene.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      setTimeout(function () { scene.classList.add("reading"); }, 900);
    });
  }
})();
