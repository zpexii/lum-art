/* ============================================================
   SITE RENDER —— 从 site.js 读数据，动态填充 Hero/About/Equipment/Manifesto/Snippets
   ------------------------------------------------------------
   index.html 里的 Hero/About/Equipment/Manifesto/Snippets 硬编码 DOM 已全部移除，
   换成空容器。本文件负责把 site.js 里的数据渲染进去。

   依赖：
     - site.js 先加载 → window.LUMIERE_SITE 可用
     - classic script，file:// 双击可开

   挂载时机：DOMContentLoaded
   ============================================================ */
(function () {
  'use strict';

  var SITE = window.LUMIERE_SITE;
  if (!SITE) { console.warn('[site-render] window.LUMIERE_SITE not found'); return; }

  function esc(s) {
    // 文本节点安全转义（innerHTML 拼出来的才需要）
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    var el = document.querySelector('.hero');
    if (!el || !SITE.hero) return;
    var h = SITE.hero;
    var actionsHTML = (h.actions || []).map(function (a, i) {
      var action = a.href === '#gallery' ? ' onclick="scrollToGallery(event)"' :
        a.href === '#about' ? ' onclick="scrollToAbout(event)"' : '';
      return '<a href="' + esc(a.href) + '" class="btn-apple ' + (i === 0 ? 'primary' : 'secondary') + '"' + action + '>' +
             esc(a.label) + '</a>';
    }).join('\n');
    el.innerHTML =
      '<div class="hero-ambient"></div>' +
      '<div class="hero-content">' +
        '<div class="hero-eyebrow">' +
          '<span class="pulse"></span>' +
          '<span>' + esc(h.eyebrow) + '</span>' +
        '</div>' +
        '<h1 class="hero-name">' + esc(h.name) + '</h1>' +
        '<div class="hero-name-en">' + esc(h.nameEn) + '</div>' +
        '<p class="hero-tagline">' + h.tagline + '</p>' +
        '<p class="hero-subdesc">' + esc(h.subdesc) + '</p>' +
        '<div class="hero-actions">' +
          actionsHTML +
        '</div>' +
      '</div>';
  }

  /* ---------- About（保留 portrait-viewer + socials，bio + tags 从 site 读） ---------- */
  function renderAbout() {
    var el = document.querySelector('.about-section');
    if (!el || !SITE.about) return;
    var a = SITE.about;

    // 1) section label + h2（el.querySelector 直接改 textContent/innerHTML）
    var label = el.querySelector('.section-label');
    if (label) label.textContent = a.sectionLabel;

    var h2 = el.querySelector('h2');
    if (h2) h2.innerHTML = a.h2;

    // 2) bio 段落（el 里现在是 <p class="bio"> × 2，直接替换）
    var bios = el.querySelectorAll('.bio');
    (a.bio || []).forEach(function (txt, i) {
      if (bios[i]) bios[i].innerHTML = txt;
    });

    // 3) tags（6 个 span.about-tag，dot 颜色从 site 读）
    var tags = el.querySelectorAll('.about-tag');
    (a.tags || []).forEach(function (tag, i) {
      if (tags[i]) {
        var dot = tags[i].querySelector('.dot');
        if (dot) dot.style.background = tag.dot;
        tags[i].innerHTML = '<span class="dot" style="background:' + tag.dot + '"></span>' + esc(tag.label);
      }
    });

    // 4) social links（整块替换）
    var socialWrap = el.querySelector('.about-social');
    if (socialWrap && a.socials) {
      socialWrap.innerHTML = a.socials.map(function (s, i) {
        var onclick = s.onClick ? ' onclick="' + s.onClick + '"' : '';
        return '<a href="' + s.href + '" target="_blank" rel="noopener" id="social' + i + '"' + onclick + '>' +
               '<span class="icon">' + s.icon + '</span>' +
               '<span>' + esc(s.name) + '</span>' +
               '<span class="label">' + esc(s.label) + '</span>' +
               '</a>';
      }).join('\n');
    }
  }

  /* ---------- Equipment ---------- */
  function renderEquipment() {
    var el = document.querySelector('.equipment-section');
    if (!el || !SITE.equipment) return;
    var eq = SITE.equipment;

    var eyebrow = el.querySelector('.equipment-eyebrow');
    if (eyebrow) eyebrow.textContent = eq.headerEyebrow;

    var title = el.querySelector('.equipment-title');
    if (title) title.textContent = eq.title;

    var scroll = el.querySelector('.equipment-scroll');
    if (scroll && eq.items) {
      scroll.innerHTML = eq.items.map(function (it) {
        return '<div class="eq-product">' +
               '<div class="eq-product-img">' +
                 '<img src="' + it.img + '" loading="lazy" alt="' + esc(it.name) + '">' +
               '</div>' +
               '<div class="eq-product-body">' +
                 '<div class="eq-product-name">' + esc(it.name) + '</div>' +
                 '<div class="eq-product-spec">' + esc(it.spec) + '</div>' +
               '</div>' +
             '</div>';
      }).join('\n');
    }
  }

  /* ---------- Manifesto ---------- */
  function renderManifesto() {
    var el = document.querySelector('.manifesto');
    if (!el || !SITE.manifesto) return;
    var m = SITE.manifesto;

    var bg = el.querySelector('.manifesto-bg');
    // 背景图从 config.js 读（--name-bg CSS variable），不动

    var quote = el.querySelector('.manifesto-quote');
    if (quote) quote.innerHTML = m.quote;

    var sub = el.querySelector('.manifesto-sub');
    if (sub) sub.innerHTML = m.sub;

    var kw = el.querySelector('.manifesto-keywords');
    if (kw && m.keywords) {
      kw.innerHTML = m.keywords.map(function (k) {
        return '<span class="k">' + esc(k) + '</span>';
      }).join('');
    }

    var en = el.querySelector('.manifesto-en');
    if (en) en.textContent = m.en;
  }

  /* ---------- Snippets（灵感碎片） ---------- */
  function renderSnippets() {
    var el = document.querySelector('.snippets');
    if (!el || !SITE.snippets) return;
    var sn = SITE.snippets;

    var label = el.querySelector('.snippets-head .section-label');
    if (label) label.textContent = sn.headerLabel;

    var grid = el.querySelector('.snippets-grid');
    if (grid && sn.items) {
      grid.innerHTML = sn.items.map(function (it) {
        return '<figure class="polaroid">' +
               '<div class="polaroid-img"><img src="' + it.img + '" alt="" loading="lazy"></div>' +
               '<figcaption class="polaroid-note">' + esc(it.note) +
                 '<span class="p-marker">' + esc(it.marker) + '</span>' +
               '</figcaption>' +
             '</figure>';
      }).join('\n');
    }
  }

  /* ---------- DOMContentLoaded 挂载 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderHero();
    renderAbout();
    renderEquipment();
    renderManifesto();
    renderSnippets();
  });

  // 如果 shell.js 的 mount() 在 DOMContentLoaded 之前就跑了（它在 IIFE 里直接 mount()），
  // 那我们也要尽早渲染——加个 fallback：如果 DOM 已经 ready 了就立即执行。
  if (document.readyState !== 'loading') {
    renderHero();
    renderAbout();
    renderEquipment();
    renderManifesto();
    renderSnippets();
  }
})();
