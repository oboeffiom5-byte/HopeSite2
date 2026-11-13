// Same song on every page. Browsers only allow sound after a tap, so if she had the music on,
// we try to resume it, and if the browser says no, the next tap anywhere resumes it.
(function () {
  const a = document.getElementById("backgroundMusic"), b = document.getElementById("musicButton");
  if (!a || !b) return;
  const get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  function ui(playing) {
    b.classList.toggle("playing", playing);
    b.textContent = playing ? "♫" : "♪";
    b.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  }
  async function play() { try { await a.play(); set("musicOn", "1"); ui(true); return true; } catch (e) { ui(false); return false; } }
  function pause() { a.pause(); set("musicOn", "0"); ui(false); }

  a.addEventListener("loadedmetadata", function () {
    const t = parseFloat(get("musicTime") || "0");
    if (t > 0 && t < a.duration) a.currentTime = t;
  }, { once: true });
  b.addEventListener("click", function () { a.paused ? play() : pause(); });
  setInterval(function () { if (!a.paused) set("musicTime", a.currentTime); }, 2000);
  window.addEventListener("pagehide", function () { set("musicTime", a.currentTime); });

  if (get("musicOn") === "1") {
    play().then(function (ok) {
      if (!ok) document.addEventListener("pointerdown", function () { if (get("musicOn") === "1" && a.paused) play(); }, { once: true });
    });
  }
})();

