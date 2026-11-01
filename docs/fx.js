/* Word by Word — візуальні ефекти.
   Працює поверх app.js і нічого не змінює в логіці читання, перекладу, словника та власних книжок.
   Якщо цей файл не завантажиться, сайт продовжить працювати. */
(function () {
  "use strict";

  var doc = document;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var heroSticky = matchMedia("(min-width: 1000px) and (min-height: 700px)");
  var $ = function (selector, scope) { return (scope || doc).querySelector(selector); };
  var $$ = function (selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); };
  var clamp = function (value, min, max) { return Math.min(max, Math.max(min, value)); };
  var hasCard = function () { return typeof closeCard === "function"; };

  /* ---------- Приклад у шапці: слова працюють через ту саму логіку, що й у рідері ---------- */
  var hero = $("#hero");
  var stage = $("#hero-stage");
  var plate = $("#plate");
  var ghost = $("#ghost");

  function makeInteractive(element) {
    if (!element || typeof appendWords !== "function") return;
    var text = element.textContent;
    element.replaceChildren();
    appendWords(element, text);
  }
  makeInteractive($("#plate-title"));
  makeInteractive($("#plate-text"));

  /* ---------- Автоматична підказка: «курсор» натискає на слова, поки людина не взяла керування ---------- */
  var demoStopped = reduce || !plate || !ghost || !stage || !hasCard();
  var timers = [];
  function later(callback, delay) { var id = setTimeout(callback, delay); timers.push(id); return id; }

  function stopDemo() {
    if (demoStopped) return;
    demoStopped = true;
    timers.forEach(clearTimeout);
    timers = [];
    if (ghost) ghost.classList.remove("on");
  }

  function moveGhostTo(button) {
    var s = stage.getBoundingClientRect();
    var b = button.getBoundingClientRect();
    ghost.style.setProperty("--gx", (b.left - s.left + b.width * 0.55) + "px");
    ghost.style.setProperty("--gy", (b.top - s.top + b.height * 0.6) + "px");
  }

  function runDemo() {
    if (demoStopped || scrollY > 40) return;
    var targets = ["crisp", "wind", "trees"].map(function (word) {
      return $('#plate-text .word[data-word="' + word + '"]');
    }).filter(Boolean);
    if (!targets.length) return;

    var s = stage.getBoundingClientRect();
    ghost.style.setProperty("--gx", (s.width * 0.78) + "px");
    ghost.style.setProperty("--gy", (s.height + 24) + "px");
    ghost.getBoundingClientRect();
    ghost.classList.add("on");

    var index = 0;
    (function next() {
      if (demoStopped) return;
      if (scrollY > 40) { stopDemo(); if (hasCard()) closeCard(); return; }
      if (index >= targets.length) {
        closeCard();
        ghost.classList.remove("on");
        demoStopped = true;
        return;
      }
      var button = targets[index++];
      moveGhostTo(button);
      later(function () {
        if (demoStopped) return;
        ghost.classList.add("tap");
        later(function () { ghost.classList.remove("tap"); }, 420);
        button.click();
        later(next, 2500);
      }, 1000);
    })();
  }

  if (!demoStopped) {
    ["pointerdown", "keydown", "touchstart", "wheel"].forEach(function (type) {
      addEventListener(type, stopDemo, { passive: true });
    });
    plate.addEventListener("pointerenter", stopDemo);
    var start = function () { later(runDemo, 1700); };
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(start); else start();
  }

  /* ---------- Нахил картки з прикладом за курсором ---------- */
  if (finePointer && !reduce && stage && plate) {
    stage.addEventListener("pointermove", function (event) {
      if ($(".word.selected", plate)) return;
      var r = stage.getBoundingClientRect();
      var x = (event.clientX - r.left) / r.width - 0.5;
      var y = (event.clientY - r.top) / r.height - 0.5;
      plate.style.setProperty("--rx", (x * 6).toFixed(2) + "deg");
      plate.style.setProperty("--ry", (-y * 4).toFixed(2) + "deg");
    });
    stage.addEventListener("pointerleave", function () {
      plate.style.setProperty("--rx", "0deg");
      plate.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Магнітні кнопки ---------- */
  if (finePointer && !reduce) {
    $$(".btn").forEach(function (button) {
      button.addEventListener("pointermove", function (event) {
        var r = button.getBoundingClientRect();
        var x = (event.clientX - (r.left + r.width / 2)) / r.width;
        var y = (event.clientY - (r.top + r.height / 2)) / r.height;
        button.style.transform = "translate(" + (x * 14).toFixed(1) + "px," + (y * 10).toFixed(1) + "px)";
      });
      button.addEventListener("pointerleave", function () { button.style.transform = ""; });
    });
  }

  /* ---------- Навігація: ковзний індикатор і підсвічування розділу ---------- */
  var nav = $(".nav");
  var navLinks = $$(".nav a");
  var spyTargets = ["library", "reader", "vocabulary", "books"].map(function (id) { return doc.getElementById(id); }).filter(Boolean);
  var activeLink = null;

  function placePill(link) {
    if (!nav) return;
    if (!link) { nav.style.setProperty("--o", "0"); return; }
    nav.style.setProperty("--x", link.offsetLeft + "px");
    nav.style.setProperty("--w", link.offsetWidth + "px");
    nav.style.setProperty("--o", "1");
  }

  function setActive(id) {
    var link = null;
    navLinks.forEach(function (anchor) {
      if (id && anchor.getAttribute("href") === "#" + id) link = anchor;
    });
    if (link === activeLink) return;
    navLinks.forEach(function (anchor) { anchor.removeAttribute("aria-current"); });
    if (link) link.setAttribute("aria-current", "true");
    activeLink = link;
    placePill(link);
  }

  /* ---------- Прогрес читання ---------- */
  var readerText = $("#reader-text");
  var readerCard = $(".reader-card");
  function updateReadProgress() {
    if (!readerText || !readerCard) return;
    var r = readerText.getBoundingClientRect();
    var p = clamp((innerHeight * 0.35 - r.top) / Math.max(r.height, 1), 0, 1);
    readerCard.style.setProperty("--read", p.toFixed(3));
  }
  if (readerText && "ResizeObserver" in window) new ResizeObserver(updateReadProgress).observe(readerText);

  /* ---------- Скрол: шторка шапки, стрічка, індикатори ---------- */
  var track = $("#ribbon-track");
  var ribbonAnimation = null;
  var lastY = scrollY;
  var speed = 0;
  var rate = 1;
  var looping = false;
  var queued = false;

  function marqueeLoop() {
    speed *= 0.9;
    var target = Math.abs(speed) > 0.6 ? Math.sign(speed) * (1 + Math.min(4, Math.abs(speed) * 0.12)) : 1;
    rate += (target - rate) * 0.09;
    if (ribbonAnimation) ribbonAnimation.playbackRate = rate;
    if (Math.abs(speed) > 0.05 || Math.abs(rate - 1) > 0.02) requestAnimationFrame(marqueeLoop);
    else { looping = false; if (ribbonAnimation) ribbonAnimation.playbackRate = 1; }
  }

  function frame() {
    queued = false;
    var y = scrollY;

    if (hero) {
      var progress = heroSticky.matches ? clamp(y / (hero.offsetHeight * 0.8), 0, 1) : 0;
      hero.style.setProperty("--hp", progress.toFixed(3));
      if (progress > 0.22 && hasCard() && $(".word.selected", hero)) closeCard();
    }

    var probe = y + innerHeight * 0.4;
    var current = null;
    spyTargets.forEach(function (section) {
      if (probe >= section.offsetTop && probe < section.offsetTop + section.offsetHeight) current = section.id;
    });
    setActive(current);

    updateReadProgress();
  }

  function onScroll() {
    var y = scrollY;
    if (y > 40) stopDemo();
    speed = y - lastY;
    lastY = y;
    if (!reduce && track) {
      if (!ribbonAnimation && track.getAnimations) ribbonAnimation = track.getAnimations()[0] || null;
      if (ribbonAnimation && !looping) { looping = true; requestAnimationFrame(marqueeLoop); }
    }
    if (!queued) { queued = true; requestAnimationFrame(frame); }
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", function () { placePill(activeLink); frame(); });
  frame();

  /* ---------- Кроки «Як це працює» оживають, коли потрапляють у кадр ---------- */
  var steps = $("#steps");
  if (steps && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { steps.classList.add("is-visible"); observer.disconnect(); }
      });
    }, { threshold: 0.25 });
    observer.observe(steps);
  } else if (steps) {
    steps.classList.add("is-visible");
  }

  /* ---------- Esc закриває картку перекладу та мобільне меню ---------- */
  addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (hasCard()) closeCard();
    var toggle = $("#menu-toggle");
    if (toggle && toggle.getAttribute("aria-expanded") === "true") toggle.click();
  });

  /* ---------- Перемикач другого кольору: шапка (ПК) і мобільне меню; вибір пам’ятається в браузері ---------- */
  var SECOND_OPTIONS = [
    { id: "", name: "Оранжевий", color: "#CC7440" },
    { id: "teal", name: "Бірюза", color: "#1C8F97" },
    { id: "green", name: "Зелений", color: "#2E9E6A" },
    { id: "none", name: "Лише синій", color: "#3B6FD2" }
  ];
  var rootEl = doc.documentElement;

  /* Іконка вкладки: біла V + друга V кольору палітри на синій плитці */
  var FAVICON_TPL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#3B6FD2"/><g transform="translate(6.4 6.4) scale(.8)"><polyline points="10,16 24,48 38,16" stroke="#FFFFFF" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><polyline points="26,16 40,48 54,16" stroke="#__S__" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 17.24L37.46 29.71L32 42.19L26.54 29.71Z" fill="#16347A"/></g></svg>';
  var FAVICON_SECOND = { "": "#FFB27A", teal: "#7FE0E6", green: "#8EE0B5", none: "#BFD3FA" };
  function updateFavicon(id) {
    var link = $('link[rel="icon"][type="image/svg+xml"]');
    if (!link) return;
    var color = (FAVICON_SECOND[id] || FAVICON_SECOND[""]).replace("#", "");
    link.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(FAVICON_TPL.replace("__S__", color)));
  }

  function currentSecond() { return rootEl.getAttribute("data-second") || ""; }

  function syncSecondSwitches() {
    var now = currentSecond();
    $$(".second-dot").forEach(function (dot) {
      dot.setAttribute("aria-pressed", String(dot.getAttribute("data-second") === now));
    });
  }

  function applySecond(id) {
    if (id) rootEl.setAttribute("data-second", id); else rootEl.removeAttribute("data-second");
    try { if (id) localStorage.setItem("wbw-second", id); else localStorage.removeItem("wbw-second"); } catch (error) { /* сховище недоступне — вибір діє до перезавантаження */ }
    syncSecondSwitches();
    updateFavicon(id);
  }

  function makeSecondSwitch(extraClass) {
    var box = doc.createElement("div");
    box.className = "second-switch " + extraClass;
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Другий колір сторінки");
    var label = doc.createElement("span");
    label.textContent = "Другий колір";
    box.appendChild(label);
    SECOND_OPTIONS.forEach(function (option) {
      var dot = doc.createElement("button");
      dot.type = "button";
      dot.className = "second-dot";
      dot.setAttribute("data-second", option.id);
      dot.style.setProperty("--sw", option.color);
      dot.setAttribute("aria-label", option.name);
      dot.title = option.name;
      box.appendChild(dot);
    });
    return box;
  }

  var siteHeader = $(".site-header");
  var mobileMenuBox = $("#mobile-menu");
  if (siteHeader) siteHeader.appendChild(makeSecondSwitch("second-switch-header"));
  if (mobileMenuBox) mobileMenuBox.appendChild(makeSecondSwitch("second-switch-menu"));
  syncSecondSwitches();
  if (currentSecond()) updateFavicon(currentSecond());

  doc.addEventListener("click", function (event) {
    var dot = event.target.closest ? event.target.closest(".second-dot") : null;
    if (!dot) return;
    applySecond(dot.getAttribute("data-second"));
    var toggle = $("#menu-toggle");
    if (dot.closest(".second-switch-menu") && toggle && toggle.getAttribute("aria-expanded") === "true") toggle.click();
  });
})();
