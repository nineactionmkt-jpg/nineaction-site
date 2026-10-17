(function () {
  "use strict";

  var D = window.NINE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = false;
  var desktop = window.matchMedia("(min-width: 1024px)");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Fontes de vídeo: WebM primeiro (mais leve) e MP4 como alternativa.
  function sources(src) {
    var webm = src.replace(/\.mp4$/, ".webm");
    return (webm !== src ? '<source src="' + esc(webm) + '" type="video/webm">' : "") + '<source src="' + esc(src) + '" type="video/mp4">';
  }
  // Prévia leve (6 s, sem som) que toca sozinha. O motion.js só carrega quando ela aparece na tela
  // e pausa quando sai. O vídeo completo, com som, abre na tela cheia.
  function autoVideo(src, poster, label, cls) {
    var preview = src.replace(/\.mp4$/, "-preview.mp4");
    return '<video' + (cls ? ' class="' + cls + '"' : "") + ' poster="' + esc(poster || "") + '" muted loop playsinline preload="none" data-auto' +
      (label ? ' aria-label="' + esc(label) + '"' : ' aria-hidden="true"') + ">" + sources(preview) + "</video>";
  }
  function media(m, cls) {
    if (!m) return "";
    if (m.tipo === "video") return autoVideo(m.src, m.poster, m.alt, cls);
    return '<img' + (cls ? ' class="' + cls + '"' : "") + ' src="' + esc(m.src) + '" alt="' + esc(m.alt || "") + '" loading="lazy" decoding="async">';
  }
  function fmt(n) { return Number(n).toLocaleString("pt-BR"); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function catName(id) {
    for (var i = 0; i < D.categorias.length; i++) if (D.categorias[i].id === id) return D.categorias[i].nome;
    return id;
  }
  function clientLine(item) {
    var parts = [];
    if (D.mostrarClientes && item.cliente) parts.push(item.cliente);
    if (item.segmento) parts.push(item.segmento);
    return parts.join(" · ");
  }
  function catCount(id) { return D.portfolio.filter(function (it) { return it.cats.indexOf(id) !== -1; }).length; }

  /* ------------------------------------------------------------------ */
  /* Menu                                                                */
  /* ------------------------------------------------------------------ */
  var nav = $("#menu");
  var toggle = $(".menu-toggle");
  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    $(".menu-toggle-label").textContent = "Menu";
  }
  toggle.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    $(".menu-toggle-label").textContent = open ? "Fechar" : "Menu";
    if (open) { var first = $("a", nav); if (first) first.focus(); }
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !e.target.closest(".header-bar")) closeMenu();
  });
  var navLinks = $$(".nav ul a");
  var sectionMap = { "inicio": "#inicio", "servicos": "#servicos", "portfolio": "#portfolio", "social-media": "#portfolio", "cases": "#portfolio", "analise": "#analise", "quem-somos": "#quem-somos" };
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var target = sectionMap[en.target.id];
        navLinks.forEach(function (a) {
          if (a.getAttribute("href") === target) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(sectionMap).forEach(function (id) { var el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Hero: leque de trabalhos                                            */
  /* ------------------------------------------------------------------ */
  var byId = {};
  D.portfolio.forEach(function (it) { byId[it.src] = it; });
  var fanSet = [
    { src: "assets/img/foto-casamento-07.webp", tag: "Foto" },
    { src: "assets/img/design-mega-combo.webp", tag: "Design" },
    { src: "assets/video/honda-motos-andrade.mp4", tag: "Reels" },
    { src: "assets/img/foto-bailarina.webp", tag: "Ensaio" },
    { src: "assets/img/design-contador-agro.webp", tag: "Branding" },
    { src: "assets/img/foto-danca.webp", tag: "Evento" },
    { src: "assets/img/design-frajam.webp", tag: "Design" }
  ].filter(function (f) { return byId[f.src]; });
  var mid = (fanSet.length - 1) / 2;
  $("#fan").innerHTML = fanSet.map(function (f, i) {
    var it = byId[f.src];
    var off = i - mid;
    var style = "--i:" + i + ";--o:" + off + ";--r:" + (off * 6).toFixed(1) + "deg;--y:" + (Math.abs(off) * Math.abs(off) * 9).toFixed(0) + "px;z-index:" + (10 - Math.round(Math.abs(off)));
    var inner = it.tipo === "video"
      ? autoVideo(it.src, it.thumb, null) + '<span class="fan-play" aria-hidden="true"><span class="ic-play"></span></span>'
      : '<img src="' + esc(it.thumb) + '" alt="" loading="eager">';
    return '<button class="fan-card" type="button" style="' + style + '" data-src="' + esc(it.src) + '" aria-label="Abrir ' + esc(it.titulo) + '">' + inner +
      '<span class="fan-tag">' + esc(f.tag) + "</span></button>";
  }).join("");
  $("#fan").addEventListener("click", function (e) {
    var b = e.target.closest(".fan-card");
    if (!b) return;
    var list = fanSet.map(function (f) { return byId[f.src]; });
    openLightbox(list, list.indexOf(byId[b.dataset.src]));
  });

  /* Colagem que se monta com a rolagem (posições finais; o motion.js interpola) */
  var storySet = [
    { src: "assets/img/foto-bailarina-sm.webp", w: 22, ar: "3/4", x: -30, y: -8, label: "Ensaio" },
    { src: "assets/video/honda-motos-andrade.mp4", poster: "assets/video/honda-motos-andrade.webp", w: 18, ar: "9/16", x: -6, y: 6, label: "Reels" },
    { src: "assets/img/design-mega-combo-sm.webp", w: 17, ar: "4/5", x: 14, y: -16, label: "Design" },
    { src: "assets/img/foto-danca-sm.webp", w: 15, ar: "2/3", x: 30, y: 12, label: "Evento" },
    { src: "assets/img/feed-motos-sm.webp", w: 16, ar: "3/4", x: -20, y: 26, label: "Feed" },
    { src: "assets/img/design-frajam-sm.webp", w: 14, ar: "4/5", x: 10, y: 22, label: "Design" },
    { src: "assets/img/design-inova-bombas-sm.webp", w: 13, ar: "4/5", x: -36, y: 24, label: "Peça" },
    { src: "assets/img/foto-casamento-02-sm.webp", w: 13, ar: "2/3", x: 36, y: -22, label: "Casamento" }
  ];
  $("#story-stage").innerHTML = storySet.map(function (s, i) {
    var inner = /\.mp4$/.test(s.src) ? autoVideo(s.src, s.poster, null) : '<img src="' + esc(s.src) + '" alt="" loading="lazy">';
    return '<div class="st-item" data-i="' + i + '" style="--w:clamp(110px,' + s.w + 'vw,' + Math.round(s.w * 14) + 'px);--ar:' + s.ar + ';--x:' + s.x + 'vw;--y:' + s.y + 'vh;--rot:0deg;--s:1">' +
      inner + '<span class="st-label">' + s.label + "</span></div>";
  }).join("");
  window.NINE_STORY = storySet;

  /* ------------------------------------------------------------------ */
  /* Serviços                                                            */
  /* ------------------------------------------------------------------ */
  $("#pills").innerHTML = D.servicos.map(function (s, i) {
    return '<span class="pill' + (s.n === "07" ? " hot" : "") + '" style="--i:' + i + '"><span class="pn">' + s.n + "</span>" + (s.n === "07" ? "+ " : "") + esc(s.nome) + "</span>";
  }).join("");
  var mq = D.servicos.map(function (s) { return "<span>" + esc(s.nome) + "</span>"; }).join("");
  $("#marquee").innerHTML = mq + mq;

  var svcList = $("#svc-list");
  var svcPanel = $("#svc-panel");
  svcList.innerHTML = D.servicos.map(function (s, i) {
    return '<li class="svc-item' + (i === 0 ? " is-active" : "") + '">' +
      '<button class="svc-btn" type="button" id="svc-b' + i + '" aria-expanded="false" aria-controls="svc-d' + i + '">' +
      '<span class="svc-n">' + s.n + '</span><span class="svc-name">' + esc(s.nome) + '</span><span class="svc-plus" aria-hidden="true"></span></button>' +
      '<div class="svc-body" id="svc-d' + i + '" role="region" aria-labelledby="svc-b' + i + '"><div class="svc-body-inner"><div>' +
      '<p class="svc-desc">' + esc(s.descricao) + '</p><p class="svc-benefit">' + esc(s.beneficio) + "</p></div></div></div></li>";
  }).join("");
  $("#footer-svc").innerHTML = D.servicos.map(function (s) { return "<li>" + esc(s.nome) + "</li>"; }).join("");

  function renderPanel(i) {
    var s = D.servicos[i], v = s.visual;
    var m = v.tipo === "grafico" ? '<div class="panel-graphic" aria-hidden="true"><span>' + esc(v.rotulo) + "</span></div>" : media(v);
    svcPanel.innerHTML = '<div class="panel-media">' + m + '<span class="panel-num" aria-hidden="true">' + s.n + "</span></div>" +
      '<div class="panel-body"><p class="label-mono" style="color:var(--accent-ink)">Frente ' + s.n + " de 09</p><h3>" + esc(s.nome) + "</h3><p>" +
      esc(s.descricao) + '</p><p class="panel-benefit">' + esc(s.beneficio) + "</p></div>";
  }
  function setActive(i, fromClick) {
    $$(".svc-item", svcList).forEach(function (li, k) {
      li.classList.toggle("is-active", k === i);
      if (desktop.matches) li.querySelector(".svc-btn").setAttribute("aria-expanded", String(k === i));
    });
    if (desktop.matches) renderPanel(i);
    else if (fromClick) {
      var li = svcList.children[i], open = !li.classList.contains("is-open");
      li.classList.toggle("is-open", open);
      li.querySelector(".svc-btn").setAttribute("aria-expanded", String(open));
    }
  }
  var hoverTimer;
  $$(".svc-item", svcList).forEach(function (li, i) {
    var btn = li.querySelector(".svc-btn");
    btn.addEventListener("click", function () { setActive(i, true); });
    btn.addEventListener("focus", function () { if (desktop.matches) setActive(i); });
    btn.addEventListener("mouseenter", function () {
      if (!desktop.matches) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { setActive(i); }, 90);
    });
  });
  function syncSvcMode() {
    if (desktop.matches) {
      svcPanel.setAttribute("aria-label", "Detalhes do serviço selecionado");
      $$(".svc-body", svcList).forEach(function (b) { b.setAttribute("aria-hidden", "true"); });
      setActive(Math.max(0, $$(".svc-item", svcList).findIndex(function (li) { return li.classList.contains("is-active"); })));
    } else {
      svcPanel.innerHTML = "";
      $$(".svc-body", svcList).forEach(function (b) { b.removeAttribute("aria-hidden"); });
      $$(".svc-item", svcList).forEach(function (li) { li.querySelector(".svc-btn").setAttribute("aria-expanded", String(li.classList.contains("is-open"))); });
    }
  }
  if (desktop.addEventListener) desktop.addEventListener("change", syncSvcMode); else desktop.addListener(syncSvcMode);
  syncSvcMode();

  /* ------------------------------------------------------------------ */
  /* Lightbox                                                            */
  /* ------------------------------------------------------------------ */
  var lb = $("#lightbox");
  var lbList = [], lbIdx = 0, lastFocus = null;
  function lbRender() {
    var it = lbList[lbIdx];
    $("#lb-media").innerHTML = it.tipo === "video"
      ? '<video poster="' + esc(it.thumb || "") + '" controls autoplay playsinline preload="auto">' + sources(it.src) + "</video>"
      : '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.titulo) + '">';
    $("#lb-cat").textContent = (it.cats || []).map(catName).join(" · ") || it.categoria || "";
    $("#lb-title").textContent = it.titulo || "";
    $("#lb-meta").textContent = [clientLine(it), it.detalhe].filter(Boolean).join(" · ");
    $("#lb-pos").textContent = lbList.length > 1 ? pad(lbIdx + 1) + " / " + pad(lbList.length) : "";
    $("#lb-prev").hidden = $("#lb-next").hidden = lbList.length < 2;
  }
  function openLightbox(list, idx) {
    lbList = list; lbIdx = Math.max(0, idx); lastFocus = document.activeElement;
    lbRender();
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
    document.documentElement.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  window.NINE_OPEN = openLightbox;
  function closeLightbox() {
    $("#lb-media").innerHTML = "";
    if (lb.open && typeof lb.close === "function") lb.close(); else lb.removeAttribute("open");
  }
  lb.addEventListener("close", function () {
    $("#lb-media").innerHTML = "";
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  $("#lb-close").addEventListener("click", closeLightbox);
  function step(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbRender(); }
  $("#lb-prev").addEventListener("click", function () { step(-1); });
  $("#lb-next").addEventListener("click", function () { step(1); });
  lb.addEventListener("keydown", function (e) {
    if (e.target.tagName === "VIDEO") return;
    if (e.key === "ArrowLeft" && lbList.length > 1) step(-1);
    if (e.key === "ArrowRight" && lbList.length > 1) step(1);
  });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-media")) closeLightbox(); });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null || lbList.length < 2) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
  });

  /* ------------------------------------------------------------------ */
  /* Portfólio: cards de categoria → galeria filtrada                    */
  /* ------------------------------------------------------------------ */
  var cats = D.categorias.filter(function (c) { return catCount(c.id) > 0; });
  $("#cat-cards").innerHTML = cats.map(function (c) {
    var cover = c.capa || (function () {
      var first = D.portfolio.filter(function (it) { return it.cats.indexOf(c.id) !== -1; })[0];
      return first.tipo === "video" ? { tipo: "video", src: first.src, poster: first.thumb } : { tipo: "img", src: first.thumb };
    })();
    var n = catCount(c.id);
    return '<button class="cat-card" type="button" data-cat="' + c.id + '" aria-label="Ver ' + n + " trabalhos de " + esc(c.nome) + '">' +
      (cover.tipo === "video" ? autoVideo(cover.src, cover.poster, null) : '<img src="' + esc(cover.src) + '" alt="" loading="lazy">') +
      '<span class="cat-count">' + pad(n) + (n === 1 ? " trabalho" : " trabalhos") + '</span><span class="cat-arrow" aria-hidden="true">↗</span>' +
      '<span class="cat-body"><span class="cat-name">' + esc(c.nome) + '</span><span class="cat-desc">' + esc(c.descricao || "") + "</span>" +
      '<span class="cat-tags">' + (c.tags || []).map(esc).join(" · ") + "</span></span></button>";
  }).join("");
  $("#cat-cards").addEventListener("click", function (e) {
    var b = e.target.closest(".cat-card");
    if (!b) return;
    setFilter(b.dataset.cat);
    $("#galeria").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(function () { var f = $('.filter[data-cat="' + b.dataset.cat + '"]'); if (f) f.focus({ preventScroll: true }); }, 600);
  });

  /* Projetos selecionados, empilhados */
  $("#stack").innerHTML = D.destaques.slice(0, 6).map(function (f, i) {
    var rows = [];
    if (D.mostrarClientes && f.cliente) rows.push(["Cliente", esc(f.cliente)]);
    if (f.segmento) rows.push(["Segmento", esc(f.segmento)]);
    if (f.entrega) rows.push(["Entrega", esc(f.entrega)]);
    if (f.objetivo) rows.push(["Objetivo", esc(f.objetivo)]);
    if (f.solucao) rows.push(["Solução", esc(f.solucao)]);
    if (f.servicos && f.servicos.length) rows.push(["Serviços", '<span class="chips">' + f.servicos.map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; }).join("") + "</span>"]);
    if (f.resultado) rows.push(["Resultado", esc(f.resultado)]);
    var m = f.midia;
    var mediaHtml = media(m) + (f.apoio ? '<img class="feat-apoio" src="' + esc(f.apoio.src) + '" alt="' + esc(f.apoio.alt) + '" loading="lazy">' : "") +
      (m.tipo === "video" ? '<button class="feat-play" type="button" data-feat="' + i + '"><span class="ic-play" aria-hidden="true"></span>Assistir com som</button>' : "");
    return '<div class="stack-card"><article class="feat" aria-label="Projeto ' + (i + 1) + ": " + esc(f.titulo) + '">' +
      '<div class="feat-media">' + mediaHtml + "</div>" +
      '<div class="feat-body"><span class="feat-num" aria-hidden="true">' + pad(i + 1) + '</span><p class="feat-cat label-mono">' + esc(f.categoria) + '</p><h4 class="feat-title">' + esc(f.titulo) + "</h4>" +
      '<dl class="feat-dl">' + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") + "</dl></div></article></div>";
  }).join("");
  $("#stack").addEventListener("click", function (e) {
    var b = e.target.closest(".feat-play");
    if (!b) return;
    var f = D.destaques[+b.dataset.feat];
    openLightbox([{ tipo: "video", src: f.midia.src, thumb: f.midia.poster, titulo: f.titulo, categoria: f.categoria, segmento: f.segmento, cliente: f.cliente }], 0);
  });

  /* Galeria filtrável */
  var gallery = $("#gallery"), filterBox = $("#filters"), current = "todos", visibleItems = [];
  function renderFilters() {
    // Uma aba para cada pasta do Drive, na mesma ordem.
    var list = [{ id: "todos", nome: "Todos" }].concat(D.categorias);
    filterBox.innerHTML = list.map(function (c) {
      var n = c.id === "todos" ? D.portfolio.length : catCount(c.id);
      return '<button class="filter' + (n ? "" : " is-empty") + '" type="button" data-cat="' + c.id + '" aria-pressed="' + (c.id === current) + '">' + esc(c.nome) + '<span class="cnt">' + (n || "em breve") + "</span></button>";
    }).join("");
  }
  function setFilter(id) {
    current = id; shown = PAGE;
    $$(".filter", filterBox).forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.cat === id)); });
    renderGallery();
  }
  filterBox.addEventListener("click", function (e) { var b = e.target.closest(".filter"); if (b) setFilter(b.dataset.cat); });
  filterBox.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var btns = $$(".filter", filterBox), i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    btns[(i + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length].focus();
  });
  var PAGE = 16, shown = PAGE;
  function renderGallery() {
    visibleItems = D.portfolio.filter(function (it) { return current === "todos" || it.cats.indexOf(current) !== -1; });
    gallery.innerHTML = visibleItems.slice(0, shown).map(function (it, i) {
      var isVid = it.tipo === "video";
      return '<li class="g-item g-' + (it.formato || "v") + '" style="animation-delay:' + Math.min(i % PAGE, 12) * 45 + 'ms">' +
        '<button class="g-btn" type="button" data-i="' + i + '" aria-label="Abrir ' + (isVid ? "vídeo" : "imagem") + ": " + esc(it.titulo) + (clientLine(it) ? ", " + esc(clientLine(it)) : "") + '">' +
        (isVid ? autoVideo(it.src, it.thumb, null) + '<span class="g-badge" aria-hidden="true"><span class="ic-play"></span></span>' : '<img src="' + esc(it.thumb) + '" alt="" loading="lazy" decoding="async">') +
        '<span class="g-cap"><strong>' + esc(it.titulo) + "</strong><span>" + esc(clientLine(it) || it.cats.map(catName).join(" · ")) + "</span></span></button></li>";
    }).join("");
    if (!visibleItems.length) {
      gallery.innerHTML = '<li class="g-empty"><span class="g-empty-mark" aria-hidden="true">✱</span><strong>' + esc(catName(current)) + "</strong><span>Os trabalhos desta pasta estão sendo preparados e entram aqui em breve.</span></li>";
    }
    var showing = Math.min(shown, visibleItems.length);
    $("#gallery-status").textContent = (showing < visibleItems.length ? showing + " de " : "") + visibleItems.length + (visibleItems.length === 1 ? " trabalho" : " trabalhos") + " · " + (current === "todos" ? "todas as pastas" : catName(current));
    $("#gallery-more").hidden = showing >= visibleItems.length;
    document.dispatchEvent(new CustomEvent("nine:gallery"));
  }
  gallery.addEventListener("click", function (e) { var b = e.target.closest(".g-btn"); if (b) openLightbox(visibleItems, +b.dataset.i); });
  $("#gallery-more").addEventListener("click", function () {
    var first = shown; shown += PAGE; renderGallery();
    var next = $$(".g-btn", gallery)[first]; if (next) next.focus({ preventScroll: true });
  });
  renderFilters();
  renderGallery();

  /* Feeds */
  var feedItems = D.portfolio.filter(function (it) { return /^assets\/img\/feed-/.test(it.src); });
  $("#feeds-collage").innerHTML = feedItems.map(function (it, i) {
    return '<button class="feed-card feed-' + (i + 1) + '" type="button" data-i="' + i + '" aria-label="Ampliar ' + esc(it.titulo) + '">' +
      '<img src="' + esc(it.thumb) + '" alt="' + esc(it.alt) + '" loading="lazy"><span class="feed-tag">' + esc(it.segmento) + "</span></button>";
  }).join("");
  $("#feeds-collage").addEventListener("click", function (e) { var b = e.target.closest(".feed-card"); if (b) openLightbox(feedItems, +b.dataset.i); });

  /* Cases */
  var caseShots = D.cases.map(function (c) { return { tipo: "img", src: c.fonte, alt: c.fonteAlt, titulo: "Captura do Instagram Insights", cats: [], categoria: "Fonte dos números", detalhe: c.rotulo }; });
  $("#cases-grid").innerHTML = D.cases.map(function (c, i) {
    return '<article class="case"><p class="case-label label-mono">' + esc(c.rotulo) + "</p>" +
      '<div class="case-hero"><span class="num" data-count="' + c.destaque.valor + '">' + fmt(c.destaque.valor) + '</span><span class="what">' + esc(c.destaque.texto) + "</span></div>" +
      '<div class="case-metrics">' + c.metricas.map(function (m) {
        var val = m.valorTexto ? esc(m.valorTexto) : (m.prefixo || "") + fmt(m.valor);
        return "<div><strong" + (m.valor ? ' data-count="' + m.valor + '" data-prefix="' + esc(m.prefixo || "") + '"' : "") + ">" + val + "</strong><span>" + esc(m.texto) + "</span></div>";
      }).join("") + "</div>" +
      '<p class="case-ctx">' + esc(c.contexto) + "</p>" +
      '<button class="case-src" type="button" data-i="' + i + '">Ver captura original <span aria-hidden="true">↗</span></button></article>';
  }).join("");
  $("#cases-grid").addEventListener("click", function (e) { var b = e.target.closest(".case-src"); if (b) openLightbox(caseShots, +b.dataset.i); });
  var painelShots = D.painel.map(function (p) { return { tipo: "img", src: p.src, alt: p.alt, titulo: p.texto, cats: [], categoria: "Painel profissional do Instagram" }; });
  $("#painel-strip").innerHTML = D.painel.map(function (p, i) {
    return '<button class="painel" type="button" data-i="' + i + '"><img src="' + esc(p.src) + '" alt="" loading="lazy"><span>' + esc(p.texto) + "<small>Painel profissional · toque para ampliar</small></span></button>";
  }).join("");
  $("#painel-strip").addEventListener("click", function (e) { var b = e.target.closest(".painel"); if (b) openLightbox(painelShots, +b.dataset.i); });

  /* ------------------------------------------------------------------ */
  /* Formulário de análise → WhatsApp                                    */
  /* ------------------------------------------------------------------ */
  var form = $("#form-analise"), done = $("#form-done");
  [["#f-objetivo", D.analise.objetivos], ["#f-dificuldade", D.analise.dificuldades]].forEach(function (pair) {
    $(pair[0]).insertAdjacentHTML("beforeend", pair[1].map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + "</option>"; }).join(""));
  });
  function normalizeInsta(v) {
    v = v.trim();
    var m = v.match(/^@?([A-Za-z0-9._]{1,30})$/);
    if (m) return "https://www.instagram.com/" + m[1] + "/";
    m = v.match(/^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9._]{1,30})\/?(?:\?.*)?$/i);
    return m ? "https://www.instagram.com/" + m[1] + "/" : null;
  }
  var rules = {
    "f-nome": function (v) { return v.trim().length >= 2 ? "" : "Digite seu nome."; },
    "f-marca": function (v) { return v.trim().length >= 2 ? "" : "Digite o nome da empresa ou marca."; },
    "f-insta": function (v) { return !v.trim() ? "Informe o @ ou o link do perfil no Instagram." : (normalizeInsta(v) ? "" : "Use o formato @suamarca ou instagram.com/suamarca."); },
    "f-objetivo": function (v) { return v ? "" : "Escolha o principal objetivo."; },
    "f-dificuldade": function (v) { return v ? "" : "Escolha a maior dificuldade."; }
  };
  function check(id) {
    var el = document.getElementById(id), msg = rules[id](el.value), err = document.getElementById("e-" + id.slice(2));
    err.textContent = msg; err.hidden = !msg;
    if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
    return !msg;
  }
  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener("blur", function () { if (el.value) check(id); });
    el.addEventListener("input", function () { if (el.getAttribute("aria-invalid")) check(id); });
    el.addEventListener("change", function () { if (el.getAttribute("aria-invalid")) check(id); });
  });
  function waUrl(text) {
    var num = (D.contato.whatsappNumero || "").replace(/\D/g, "");
    return num ? "https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : "") : D.contato.whatsappLink;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(rules).forEach(function (id) { if (!check(id) && !firstBad) firstBad = id; });
    if (firstBad) { document.getElementById(firstBad).focus(); return; }
    var f = form.elements;
    var lines = [
      "Olá, Nine Action! Gostaria de pedir a análise básica e gratuita do meu perfil.", "",
      "Nome: " + f.nome.value.trim(),
      "Empresa/marca: " + f.marca.value.trim(),
      "Instagram: " + normalizeInsta(f.instagram.value),
      "Principal objetivo: " + f.objetivo.value,
      "Maior dificuldade: " + f.dificuldade.value
    ];
    if (f.extra.value.trim()) lines.push("Informações adicionais: " + f.extra.value.trim());
    var text = lines.join("\n");
    $("#f-msg").value = text;
    var hasNum = !!(D.contato.whatsappNumero || "").replace(/\D/g, "");
    $("#done-wa").href = waUrl(text);
    if (hasNum) window.open(waUrl(text), "_blank", "noopener");
    $("#done-instr").textContent = hasNum
      ? "Abrimos o WhatsApp da Nine Action com a sua mensagem já escrita. É só tocar em enviar. Se ele não abriu, toque em “Abrir WhatsApp”. A solicitação só chega até nós depois do seu envio."
      : "1. Toque em “Copiar mensagem”. 2. Toque em “Abrir WhatsApp” e cole o texto na conversa com a Nine Action. 3. Envie. A solicitação só chega até nós depois do seu envio.";
    $("#copy-status").textContent = "";
    $("#done-copy").hidden = hasNum;
    form.hidden = true; done.hidden = false; done.focus();
  });
  $("#done-edit").addEventListener("click", function () { done.hidden = true; form.hidden = false; $("#f-nome").focus(); });
  $("#done-copy").addEventListener("click", function () {
    var ta = $("#f-msg"), status = $("#copy-status");
    function fallback() { ta.focus(); ta.select(); status.textContent = "Texto selecionado. Use Copiar no seu teclado ou menu."; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(function () { status.textContent = "Mensagem copiada. Agora abra o WhatsApp e cole."; }, fallback);
    } else fallback();
  });

  /* Contato */
  var waMsg = D.contato.mensagemPadrao;
  $("#cta-whatsapp").href = waUrl(waMsg);
  $("#cta-instagram").href = D.contato.instagram.url;
  $("#footer-contact").innerHTML = '<li><a href="' + esc(waUrl(waMsg)) + '" target="_blank" rel="noopener">WhatsApp comercial</a></li>' +
    '<li><a href="' + esc(D.contato.instagram.url) + '" target="_blank" rel="noopener">Instagram ' + esc(D.contato.instagram.usuario) + "</a></li>" +
    (D.contato.email ? "<li>" + esc(D.contato.email) + "</li>" : "") +
    (D.contato.cidade ? "<li>" + esc(D.contato.cidade) + "</li>" : "") +
    (D.contato.cnpj ? "<li>CNPJ " + esc(D.contato.cnpj) + "</li>" : "");
  if (D.socias && D.socias.length) $("#socias-nomes").textContent = D.socias.join(" e ");
  $("#ano").textContent = new Date().getFullYear();
})();
