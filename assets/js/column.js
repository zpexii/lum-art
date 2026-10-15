/* ============================================================
   LUMIÈRE · 光影集 —— 专栏页渲染器
   ------------------------------------------------------------
   四个专栏页共用这一个渲染器，页面只需在 <body> 上声明身份：

       <body data-column="notes">

   然后由本脚本生成页头、条目流、栏间互跳。
   条目内容来自 assets/data/<column>.js 里的 window.LUMIERE_COLUMNS[key]，
   新增一条 = 在数组里加一个对象，不需要碰 HTML/CSS。

   字段：
       date    'YYYY-MM-DD'   倒序排列
       title   标题（可省）
       tags    ['标签', …]（可省）
       body    正文，换行按原样保留（可省）
       image   配图路径，相对站点根（可省）

   内容一律按纯文本处理（做 HTML 转义），
   因此正文里写 <div> 不会被当成标签解析。
   ============================================================ */
(function () {
  'use strict';

  var ROOT = (document.currentScript && document.currentScript.dataset.root) || '';

  var meta = window.LUMIERE_COLUMNS_META;
  var key = document.body && document.body.dataset ? document.body.dataset.column : '';
  if (!meta || !key || !meta.map[key]) return;
  var info = meta.map[key];

  var stream = document.getElementById('colStream');
  var heroHost = document.getElementById('colHero');
  var switchHost = document.getElementById('colSwitch');
  if (!stream) return;

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  // 配图路径按站点根书写；已是绝对地址或相对上级的不动
  function asset(p) {
    p = String(p || '');
    if (!p || /^(https?:|data:|\/|\.\.\/)/.test(p)) return p;
    return ROOT + p;
  }

  var items = (window.LUMIERE_COLUMNS || {})[key] || [];

  /* ---------- 页头 ---------- */
  if (heroHost) {
    heroHost.innerHTML =
      '<div class="col-hero-inner">' +
        '<div class="col-hero-eyebrow"><span class="col-dot"></span>专栏 · Column</div>' +
        '<h1 class="col-hero-title">' + esc(info.name) + '</h1>' +
        '<div class="col-hero-en">' + esc(info.en) + ' · LUMIÈRE</div>' +
        '<p class="col-hero-desc">' + esc(info.desc) + '</p>' +
        '<div class="col-hero-meta">共 <span data-col-count>' + items.length + '</span> 条记录</div>' +
      '</div>';
  }

  /* ---------- 条目流 ---------- */
  function renderItem(it) {
    var h = '<article class="col-item reveal">';
    if (it.date) h += '<div class="col-item-date">' + esc(it.date) + '</div>';
    if (it.title) h += '<h2 class="col-item-title">' + esc(it.title) + '</h2>';
    if (it.tags && it.tags.length) {
      h += '<div class="col-item-tags">' + it.tags.map(function (t) {
        return '<span class="col-tag">' + esc(t) + '</span>';
      }).join('') + '</div>';
    }
    if (it.body) h += '<div class="col-item-body">' + esc(it.body) + '</div>';
    if (it.image) {
      h += '<div class="col-item-img"><img src="' + esc(asset(it.image)) +
           '" alt="' + esc(it.title || '') + '" loading="lazy"></div>';
    }
    return h + '</article>';
  }

  if (!items.length) {
    stream.innerHTML =
      '<p class="col-empty">这一栏还是空的。<br>' +
      '把内容写进 <code>assets/data/' + esc(key) + '.js</code> 的数组里，' +
      '保存刷新就会出现在这里。</p>';
    return;
  }

  // 按日期倒序（无日期的排到最后，保持原顺序）
  var sorted = items.slice().sort(function (a, b) {
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
  stream.innerHTML = sorted.map(renderItem).join('');

  /* ---------- 入场 ---------- */
  var nodes = stream.querySelectorAll('.col-item.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    nodes.forEach(function (el) { io.observe(el); });
  } else {
    nodes.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 栏间互跳 ---------- */
  if (switchHost) {
    var cards = meta.order.map(function (k) {
      var c = meta.map[k];
      if (k === key) {
        return '<a href="javascript:void(0)" class="current" aria-current="page" data-col="' + k + '">' +
               '<span class="dot"></span>' + esc(c.name) +
               '<span class="en">' + esc(c.en) + '</span></a>';
      }
      return '<a href="../' + esc(c.dir) + '" data-col="' + k + '">' +
             '<span class="dot"></span>' + esc(c.name) +
             '<span class="en">' + esc(c.en) + '</span></a>';
    }).join('');
    switchHost.innerHTML =
      '<div class="col-switch-title">其余专栏 · Columns</div>' +
      '<div class="col-switch-grid">' + cards +
        '<a href="../index.html" class="col-switch-home">返回首页' +
        '<span class="en">LUMIÈRE</span></a>' +
      '</div>';
  }
})();
