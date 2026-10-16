(function () {
  'use strict';
  function mount() {
    var root = document.documentElement;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var compact = window.matchMedia('(max-width: 767px)');
    var hero = document.querySelector('.hero');
    var manifesto = document.querySelector('.manifesto');
    var frame = 0;
    root.classList.add('keynote-ready');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('keynote-pending');
        entry.target.classList.add('keynote-entered');
        observer.unobserve(entry.target);
      });
    }, { threshold: .06, rootMargin: '0px 0px -24px 0px' });
    function prepare(scope) {
      var selectors = '.about-portrait,.about-text > *,.about-social,.equipment-header,' +
        '.eq-product,.gallery-header,.photo-card,.manifesto-quote,.manifesto-sub,' +
        '.manifesto-keywords,.snippets-head,.polaroid,.col-hero > *,.col-entry,.col-switch';
      scope.querySelectorAll(selectors).forEach(function (el, index) {
        if (el.classList.contains('keynote-item')) return;
        el.classList.add('keynote-item');
        el.style.setProperty('--keynote-delay', Math.min(index % 4 * 65,195) + 'ms');
        if (reduced.matches) return;
        // 视口内的内容不隐藏，避免加载与筛选闪烁。
        var rect = el.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) return;
        el.classList.add('keynote-pending');
        observer.observe(el);
      });
    }
    function paint() {
      frame = 0;
      if (reduced.matches) return;
      if (hero && !compact.matches) {
        var rect = hero.getBoundingClientRect();
        var progress = Math.max(0,Math.min(1,-rect.top / rect.height));
        hero.style.setProperty('--hero-drift',(progress * 115).toFixed(2) + 'px');
        hero.style.setProperty('--hero-scale',(1 - progress * .075).toFixed(4));
        hero.style.setProperty('--hero-opacity',Math.max(.15,1 - progress * 1.1).toFixed(3));
        hero.style.setProperty('--ambient-drift',(progress * 65).toFixed(2) + 'px');
      }
      if (manifesto) {
        var bounds = manifesto.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < innerHeight) {
          var position = (innerHeight / 2 - (bounds.top + bounds.height / 2)) / innerHeight;
          manifesto.style.setProperty('--manifesto-drift',(position * (compact.matches ? 20 : 65)).toFixed(2) + 'px');
          manifesto.style.setProperty('--quote-scale',(1 + Math.max(-.5,Math.min(.5,position)) * .05).toFixed(4));
        }
      }
    }
    function schedule() { if (!frame && !reduced.matches) frame = requestAnimationFrame(paint); }
    prepare(document);
    // 分类筛选重建卡片后，只处理画廊新增的内容。
    var grid = document.querySelector('.masonry');
    if (grid) new MutationObserver(function () { prepare(grid); }).observe(grid,{ childList:true });
    window.addEventListener('scroll',schedule,{ passive:true });
    window.addEventListener('resize',schedule,{ passive:true });
    reduced.addEventListener('change',function () {
      if (reduced.matches) document.querySelectorAll('.keynote-pending').forEach(function (el) {
        el.classList.remove('keynote-pending');
        observer.unobserve(el);
      });
      schedule();
    });
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount,{ once:true });
  else mount();
})();
