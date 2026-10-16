/* ============================================================
   LUMIÈRE · 光影集 —— 全站共享外壳
   ------------------------------------------------------------
   首页与四个专栏页共用的四件事：

     1. 导航与页脚 —— 四栏入口只有一个真相源，页面里只留两个空容器
        <nav class="nav scrolled" id="nav"></nav>
        <footer class="footer reveal visible"></footer>
     2. 主题（明/暗，localStorage 键 lumiere-theme）
     3. .reveal 滚动入场、导航滚动毛玻璃、移动端菜单
     4. scrollToTop() / showToast()

   data-root 与 config.js 同义：首页 ""，专栏页 "../"。
   导航与页脚里的链接按此前缀生成 —— 首页锚点用 #gallery，
   专栏页则指回 index.html#gallery。

   ※ classic script，不用 type="module"，保住 file:// 双击可开。
   ============================================================ */
(function () {
  'use strict';

  var ROOT = (document.currentScript && document.currentScript.dataset.root) || '';
  var motionStyles = document.createElement('link');
  motionStyles.rel = 'stylesheet';
  motionStyles.href = ROOT + 'assets/keynote.css';
  document.head.appendChild(motionStyles);
  var motionScript = document.createElement('script');
  motionScript.src = ROOT + 'assets/js/keynote.js';
  motionScript.defer = true;
  document.head.appendChild(motionScript);
  
  // Three.js 环境光场系统注入
  var threeJS = document.createElement('script');
  threeJS.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
  threeJS.onload = function() {
    var ambientScript = document.createElement('script');
    ambientScript.src = ROOT + 'assets/js/ambient.js';
    ambientScript.defer = true;
    document.head.appendChild(ambientScript);
  };
  document.head.appendChild(threeJS);

  // 指回首页时的前缀。
  // 首页里必须是空串，链接才是裸锚点 #gallery（原地平滑滚动，不重新加载）；
  // 专栏页里必须写成 ../index.html 而不能是 ../ ——
  // file:// 下打开 ../ 会变成目录列表，而不是首页。
  var HOME = ROOT + (ROOT ? 'index.html' : '');

  /* ============================================================
     NAVIGATION & FOOTER
     ============================================================ */

  // 导航条目。两组东西，两种性质，因此两种长相：
  //
  //   作品 —— 站点分区入口，指向首页画廊区。刻意保留 data-cat="all"，
  //           让首页原有的点击处理直接接管（平滑滚到画廊 + 筛选复位），
  //           不必另写一套。它**不带圆点**：这条导航里圆点的含义是「一个专栏」，
  //           作品不是专栏，只有那四个才配得上自己的一颗颜色。
  //
  //   四个专栏 —— 元数据来自 assets/js/columns.js，圆点取各自强调色，
  //           与其落地页页头的主光同色，点之前就预告了会走进什么光里。
  //
  // 原先这里还并列着六个画廊分类（全部/Cos/日常/婚礼/风景/AIGC）。
  // 那是错的：它们是「页面内筛选」，与「站点分区」不是同类，却给了完全相同的
  // 处理；而且画廊区自己的筛选栏带着计数，是同一功能的更强版本 ——
  // 导航里那份是冗余的阉割版。整组删除。
  function navEntries(activeCol) {
    var meta = window.LUMIERE_COLUMNS_META;
    var items = ['<li><a href="' + HOME + '#gallery" data-cat="all">作品</a></li>'];
    if (meta && meta.order) {
      meta.order.forEach(function (key) {
        var c = meta.map[key];
        if (!c) return;
        var cls = key === activeCol ? ' class="active"' : '';
        items.push('<li><a href="' + ROOT + c.dir + '" data-col="' + key + '"' + cls +
                   '><span class="dot"></span>' + c.name + '</a></li>');
      });
    }
    return items.join('\n    ');
  }

  function navHTML(activeCol) {
    return [
      '  <div class="nav-brand" onclick="scrollToTop()">',
      '    <span class="logo">LUMIÈRE</span>',
      '    <span class="sub">光影集</span>',
      '  </div>',
      '  <ul class="nav-links" id="navLinks">',
      '    ' + navEntries(activeCol),
      '  </ul>',
      '  <div class="theme-toggle" id="themeToggle" aria-label="切换主题">',
      '    <div class="theme-slider"></div>',
      '    <div class="theme-seg" data-theme="dark" aria-label="深色模式">',
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
      '    </div>',
      '    <div class="theme-seg active" data-theme="light" aria-label="浅色模式">',
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>',
      '    </div>',
      '  </div>',
      '  <button class="nav-toggle" id="navToggle" aria-label="菜单">',
      '    <span></span><span></span><span></span>',
      '  </button>'
    ].join('\n');
  }

  function footerHTML() {
    // 优先读 site.js 的 footer 数据，没有就用默认值
    var F = (window.LUMIERE_SITE && window.LUMIERE_SITE.footer) || {};
    var sig = F.signatureSvg || '<svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 38c22-26 44-30 52-14 7 14-3 28-20 22-16-6-12-30 6-40 12-7 30 0 34 20 3 14-8 18-12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var sigCap = F.signatureCaption || 'Signed · 风月 · LUMIÈRE';
    var brand = F.brand || 'LUMIÈRE';
    var tag = F.tagline || '';

    return [
      '  <div class="signature">',
      '    <svg class="signature-svg" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '      ' + sig +
      '    </svg>',
      '    <div class="signature-caption">' + sigCap + '</div>',
      '  </div>',
      '  <div class="brand">' + brand + '</div>',
      (tag ? '  <p class="tagline">' + tag + '</p>' : ''),
      '  <div class="links">',
      '    <a href="' + HOME + '#gallery">作品</a>',
      '    <a href="' + HOME + '#about">关于</a>',
      '    <a href="javascript:void(0)" onclick="showToast(\'欢迎联系约拍与交流\')">联系</a>',
      '    <a href="javascript:void(0)" onclick="togglePlayer()">音乐</a>',
      '  </div>',
      '  <div class="copyright">© ' + (new Date().getFullYear()) + ' ' + brand + ' · 光影集 · ALL RIGHTS RESERVED</div>'
    ].join('\n');
  }

  // 往空容器里写导航与页脚。自动执行，页面无需调用。
  // 当前所在专栏由 <body data-column="…"> 声明，用于点亮对应入口。
  // 导航不做「初始点亮」：页面顶部没有任何「已选中」的东西，
  // 作品那一项要等用户真的点进画廊才由 setFilter 点亮。
  function mount(opts) {
    opts = opts || {};
    var activeCol = opts.activeCol ||
      (document.body && document.body.dataset ? document.body.dataset.column : '');
    var nav = document.getElementById('nav');
    if (nav) nav.innerHTML = navHTML(activeCol);
    var foot = document.querySelector('#siteFooter, .footer');
    if (foot) foot.innerHTML = footerHTML();
  }

  /* ============================================================
     TOAST
     ============================================================ */
  var toastTimer;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;                       // 页面没放 toast 容器时静默跳过
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }

  /* ============================================================
     SCROLL
     ============================================================ */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ============================================================
     THEME TOGGLE - Light / Dark only
     ============================================================ */
  var themeNames = {
    dark: '暗夜',
    light: '日光'
  };

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    document.querySelectorAll('.theme-seg').forEach(function (seg) {
      seg.classList.toggle('active', seg.dataset.theme === theme);
    });
    try { localStorage.setItem('lumiere-theme', theme); } catch (e) {}
  }

  /* ============================================================
     挂载与初始化
     ============================================================ */

  // 1) 先写导航与页脚 —— 后面所有查询都依赖它
  mount();

  // 2) 栏页没有播放器，给页脚的「音乐」一个友好去处
  if (document.body && document.body.dataset && document.body.dataset.column) {
    if (typeof window.togglePlayer !== 'function') {
      window.togglePlayer = function () { showToast('音乐播放器在首页开启 ♪'); };
    }
  }

  // 3) 主题
  document.querySelectorAll('.theme-seg').forEach(function (seg) {
    seg.addEventListener('click', function () {
      var theme = seg.dataset.theme;
      setTheme(theme);
      showToast('已切换至「' + themeNames[theme] + '」主题');
    });
  });
  // Load saved theme
  try {
    var saved = localStorage.getItem('lumiere-theme');
    if (saved && themeNames[saved]) setTheme(saved);
  } catch (e) {}

  // 4) 导航滚动毛玻璃 + 移动端菜单
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var scrollSentinel = document.getElementById('scrollSentinel');

  if (nav && scrollSentinel) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(scrollSentinel);
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  /* ============================================================
     NAV HEIGHT —— 供吸顶元素避让
     ------------------------------------------------------------
     导航是 position:fixed，会盖住视口最上面 navH 那一段。
     任何要吸顶的东西都得从 navH 之下开始，所以把高度量出来写进 --nav-h，
     CSS 侧不再猜数字（菜单位置、断点变化都不用管）。

     量的是「已滚动」状态的高度：吸顶元素真正生效时，导航必然处于 .scrolled。
     ============================================================ */
  function syncNavHeight() {
    var el = document.getElementById('nav');
    if (!el) return;
    var had = el.classList.contains('scrolled');
    el.classList.add('scrolled');
    var h = Math.round(el.getBoundingClientRect().height);
    if (!had) el.classList.remove('scrolled');
    document.documentElement.style.setProperty('--nav-h', h + 'px');
    setupStickyBar();          // rootMargin 依赖 navH，高度变了要重建观察器
  }

  /* ============================================================
     STICKY SECTION BAR —— 画廊筛选栏吸顶
     ------------------------------------------------------------
     放在这里而不是首页的内联脚本里，是因为吸顶偏移量派生自导航高度：
     两者是同一件事，分开放只会隔着 --nav-h 变量互相耦合。

     一个必须绕开的坑：position:sticky 的活动范围由父元素盒高决定。
     筛选栏住在 .gallery-header 里，那一行只有几十像素高 ——
     把 sticky 直接加在筛选栏上，它只会在这几十像素里粘一下就滑走。
     所以标记里多了一层 .gallery-sticky 包裹，盒高覆盖整个画廊区，
     sticky 加在这一层上。

     判「已吸住」用哨兵 + IntersectionObserver，与导航的 .scrolled 同一套做法；
     rootMargin 取负的 navH，使哨兵恰好越过吸顶线那一刻判定为离开。
     ============================================================ */
  var gallerySticky = document.getElementById('gallerySticky');
  var gallerySentinel = document.getElementById('gallerySentinel');
  var stickObserver = null;

  function setupStickyBar() {
    if (!gallerySticky || !gallerySentinel) return;
    if (!('IntersectionObserver' in window)) return;
    if (stickObserver) stickObserver.disconnect();
    var navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 52;
    stickObserver = new IntersectionObserver(function (entries) {
      gallerySticky.classList.toggle('stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-' + navH + 'px 0px 0px 0px', threshold: 0 });
    stickObserver.observe(gallerySentinel);
  }

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);

  // 5) .reveal 滚动入场
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  // 供 inline onclick 与其它脚本调用
  window.showToast = showToast;
  window.scrollToTop = scrollToTop;
  window.setTheme = setTheme;
  window.LUMIERE = { mount: mount, navHTML: navHTML, footerHTML: footerHTML,
                     setTheme: setTheme, showToast: showToast, ROOT: ROOT };
})();
