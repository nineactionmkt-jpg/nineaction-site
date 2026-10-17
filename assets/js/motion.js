/* Camada de movimento: campo de estrelas, esferas de partículas, colagem guiada pela rolagem,
 * cards empilhados, títulos palavra a palavra, texto que sai do desfoque, contadores,
 * vídeos que tocam sozinhos quando aparecem e botões magnéticos. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  // As animações rodam sempre (pedido da Nine Action), inclusive com "reduzir movimento" ligado no sistema.
  var reduce = false;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasIO = "IntersectionObserver" in window;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  /* ---------------- Vídeos: tocam sozinhos quando visíveis ---------------- */
  var vidObs = hasIO ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
    });
  }, { threshold: .15 }) : null;
  function watchVideos() {
    $$("video[autoplay]").forEach(function (v) {
      if (v.dataset.watched || v.closest(".lightbox")) return;
      v.dataset.watched = "1"; v.muted = true;
      if (reduce) { v.removeAttribute("autoplay"); v.pause(); return; }
      if (vidObs) vidObs.observe(v); else v.play().catch(function () {});
    });
  }
  watchVideos();
  if ("MutationObserver" in window) new MutationObserver(watchVideos).observe(document.getElementById("conteudo"), { childList: true, subtree: true });

  /* ---------------- Contadores ---------------- */
  var fmt = function (n) { return Number(n).toLocaleString("pt-BR"); };
  function countUp(el, end, dur, pre) {
    if (reduce) return;
    var t0 = performance.now();
    (function frame() {
      var k = Math.min(1, (performance.now() - t0) / dur);
      el.textContent = (pre || "") + fmt(Math.round(end * ease(k)));
      if (k < 1) requestAnimationFrame(frame);
    })();
  }

  /* ---------------- Campo de estrelas (fundo fixo) ---------------- */
  var stars = $("#stars");
  if (stars && stars.getContext) {
    var sc = stars.getContext("2d"), pts = [], sw = 0, sh = 0;
    var sizeStars = function () {
      sw = window.innerWidth; sh = window.innerHeight;
      stars.width = sw * DPR; stars.height = sh * DPR; sc.setTransform(DPR, 0, 0, DPR, 0, 0);
      var n = Math.round(sw * sh / 7000);
      pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * sw, y: Math.random() * sh, r: Math.random() * 1.1 + .25, p: Math.random() * 6.28, s: Math.random() * .6 + .2, m: Math.random() < .08 });
    };
    var drawStars = function (t) {
      sc.clearRect(0, 0, sw, sh);
      var sy = window.scrollY * .04;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var a = reduce ? .5 : .25 + .45 * (0.5 + 0.5 * Math.sin(t * .001 * p.s + p.p));
        var y = ((p.y - sy * p.s) % sh + sh) % sh;
        sc.fillStyle = p.m ? "rgba(207,57,222," + a + ")" : "rgba(246,244,248," + a * .8 + ")";
        sc.beginPath(); sc.arc(p.x, y, p.r, 0, 6.283); sc.fill();
      }
    };
    sizeStars();
    window.addEventListener("resize", function () { sizeStars(); if (reduce) drawStars(0); });
    if (reduce) drawStars(0);
    else (function loop(t) { if (!document.hidden) drawStars(t); requestAnimationFrame(loop); })(0);
  }

  /* ---------------- Esferas de partículas ---------------- */
  function makeSphere(canvas, opts) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d"), N = opts.n || 1400, pts = [], size = 0, visible = false;
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.39996;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad, Math.random() < .12]);
    }
    function resize() {
      var r = canvas.getBoundingClientRect(); size = r.width;
      canvas.width = size * DPR; canvas.height = size * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, size, size);
      var a = t * .00012, b = .35 + Math.sin(t * .0002) * .08, R = size * .36, c = size / 2;
      var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var breathe = 1 + Math.sin(t * .0015 + i * .7) * .015;
        var x = p[0] * ca - p[2] * sa, z = p[0] * sa + p[2] * ca;
        var y = p[1] * cb - z * sb; z = p[1] * sb + z * cb;
        var persp = 1.8 / (2.6 - z);
        var px = c + x * R * persp * breathe, py = c + y * R * persp * breathe;
        var alpha = .12 + (z + 1) * .32;
        ctx.fillStyle = p[3] ? "rgba(207,57,222," + alpha + ")" : "rgba(246,244,248," + alpha * .85 + ")";
        ctx.fillRect(px, py, 1.4 * persp, 1.4 * persp);
      }
    }
    resize();
    window.addEventListener("resize", function () { resize(); if (reduce) draw(0); });
    if (reduce) { draw(0); return; }
    if (hasIO) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(canvas);
    else visible = true;
    (function loop(t) { if (visible && !document.hidden) draw(t); requestAnimationFrame(loop); })(0);
  }
  makeSphere($("#sphere"), { n: 1500 });
  makeSphere($("#sphere2"), { n: 1100 });

  /* ---------------- Contador do 9 ---------------- */
  var nine = $("#nine-count");
  if (nine && hasIO && !reduce) {
    new IntersectionObserver(function (en, obs) {
      if (!en[0].isIntersecting) return;
      obs.disconnect();
      var k = 0;
      var id = setInterval(function () { nine.textContent = String(++k); if (k >= 9) clearInterval(id); }, 110);
    }, { threshold: .6 }).observe(nine);
  }

  /* ---------------- Contadores dos cases ---------------- */
  if (hasIO && !reduce) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$("[data-count]", en.target).forEach(function (el) { countUp(el, +el.dataset.count, 1600, el.dataset.prefix); });
        cObs.unobserve(en.target);
      });
    }, { threshold: .35 });
    $$(".case").forEach(function (c) { cObs.observe(c); });
  }

  /* ---------------- Passos da análise acendem um a um ---------------- */
  var steps = $$("#steps li");
  if (steps.length) {
    steps[0].classList.add("on");
    if (hasIO) {
      var sObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) en.target.classList.add("on"); });
      }, { rootMargin: "0px 0px -35% 0px", threshold: 1 });
      steps.forEach(function (s) { sObs.observe(s); });
    } else steps.forEach(function (s) { s.classList.add("on"); });
  }

  if (reduce) {
    // Colagem: mostra o arranjo final, sem fixar a seção.
    return;
  }

  /* ---------------- Texto que sai do desfoque ---------------- */
  $$(".blur-text").forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement("span"); s.className = "bw"; s.style.setProperty("--i", i++); s.textContent = p; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    if (!hasIO) return;
    el.classList.add("is-pending");
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting) { el.classList.remove("is-pending"); obs.disconnect(); }
    }, { threshold: .5 }).observe(el);
  });

  /* ---------------- Pílulas dos nove serviços ---------------- */
  var pills = $("#pills");
  if (pills && hasIO) {
    pills.classList.add("is-pending");
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting) { pills.classList.remove("is-pending"); obs.disconnect(); }
    }, { threshold: .3 }).observe(pills);
  }

  /* ---------------- Títulos palavra por palavra ---------------- */
  function splitWords(el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var w = document.createElement("span"); w.className = "w";
            var wi = document.createElement("span"); wi.className = "wi"; wi.style.setProperty("--i", i++); wi.textContent = p;
            w.appendChild(wi); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
  }
  if (hasIO) {
    var hObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("words-in"); hObs.unobserve(en.target); } });
    }, { threshold: .25 });
    $$(".sec-head .display, .feeds-head .display, .about-copy .display, .contact-title, .svc-closing, .sub-head, .feat-title").forEach(function (h) {
      splitWords(h); h.classList.add("split");
      if (h.getBoundingClientRect().top < window.innerHeight * .9) requestAnimationFrame(function () { h.classList.add("words-in"); });
      else hObs.observe(h);
    });
  }

  /* ---------------- Rolagem: progresso, leque, colagem, pilha, parallax ---------------- */
  var bar = $("#progress-bar");
  var fanCards = $$(".fan-card");
  var story = $("#story"), storyItems = $$(".st-item"), storyA = $(".story-a"), storyB = $(".story-b");
  var seed = storyItems.map(function (el, i) {
    var a = (i / storyItems.length) * Math.PI * 2 + .6;
    return { sx: Math.cos(a) * 70, sy: Math.sin(a) * 70 + 30, rot: (i % 2 ? 1 : -1) * (12 + (i * 7) % 18) };
  });
  var stackCards = $$(".stack-card");
  var feedCards = $$(".feed-card"), feedK = [.05, -.06, .03, -.09];
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max, 0, 1) : 0) + ")";

    // Leque do hero abre ao rolar
    if (y < vh * 1.2) {
      var k = clamp(y / (vh * .8), 0, 1);
      fanCards.forEach(function (c, i) {
        var off = i - (fanCards.length - 1) / 2;
        c.style.translate = (off * k * 40).toFixed(1) + "px " + (-k * 30).toFixed(1) + "px";
      });
    }

    // Colagem: os trabalhos voam de fora da tela até o arranjo final
    if (story) {
      var r = story.getBoundingClientRect();
      var total = story.offsetHeight - vh;
      var p = clamp(-r.top / total, 0, 1);
      if (r.top < vh && r.bottom > 0) {
        var a = ease(clamp(p / .7, 0, 1));
        storyItems.forEach(function (el, i) {
          var s = window.NINE_STORY[i], sd = seed[i];
          var x = sd.sx + (s.x - sd.sx) * a, yy = sd.sy + (s.y - sd.sy) * a;
          var drift = (p - .7) > 0 ? (p - .7) / .3 : 0;
          el.style.setProperty("--x", (x * (1 + drift * .15)).toFixed(2) + "vw");
          el.style.setProperty("--y", (yy * (1 + drift * .15)).toFixed(2) + "vh");
          el.style.setProperty("--rot", (sd.rot * (1 - a) + (i % 2 ? 2 : -2) * a).toFixed(2) + "deg");
          el.style.setProperty("--s", (.55 + .45 * a).toFixed(3));
          el.style.opacity = clamp(.2 + a * 1.2, 0, 1);
        });
        if (storyA) storyA.style.transform = "translateX(" + ((1 - a) * -40).toFixed(2) + "vw)";
        if (storyB) storyB.style.transform = "translateX(" + ((1 - a) * 40).toFixed(2) + "vw)";
      }
    }

    // Pilha: o card de baixo encolhe quando o próximo chega por cima
    stackCards.forEach(function (card, i) {
      var next = stackCards[i + 1], feat = card.firstElementChild;
      if (!next || !feat) return;
      var cr = card.getBoundingClientRect(), nr = next.getBoundingClientRect();
      var pp = clamp((cr.top + cr.height - nr.top) / cr.height, 0, 1);
      feat.style.transform = "scale(" + (1 - pp * .08).toFixed(4) + ")";
      feat.style.filter = "brightness(" + (1 - pp * .45).toFixed(3) + ")";
    });

    feedCards.forEach(function (c, i) {
      var fr = c.getBoundingClientRect();
      if (fr.bottom < -200 || fr.top > vh + 200) return;
      c.style.translate = "0 " + ((fr.top + fr.height / 2 - vh / 2) * feedK[i % 4]).toFixed(1) + "px";
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  onScroll();

  /* ---------------- Botões magnéticos e mídia que acompanha o cursor ---------------- */
  if (finePointer) {
    $$(".btn, .cat-arrow, .lb-btn").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * .2).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });
    $$(".feat-media").forEach(function (m) {
      m.addEventListener("pointermove", function (e) {
        var r = m.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
        $$(":scope > img, :scope > video", m).forEach(function (el) { el.style.scale = "1.06"; el.style.translate = (-dx * 16).toFixed(1) + "px " + (-dy * 16).toFixed(1) + "px"; });
      });
      m.addEventListener("pointerleave", function () { $$(":scope > img, :scope > video", m).forEach(function (el) { el.style.scale = ""; el.style.translate = ""; }); });
    });
  }
})();
