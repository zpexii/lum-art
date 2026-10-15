/* ============================================================
   LUMIÈRE · 光影集 —— 站点可配置项
   ------------------------------------------------------------
   全站唯一真相源，首页与四个专栏页共用这一份。

   这里的相对路径（如 nameBgImage）不需要按页面层级做任何前缀处理：
   site.css 位于项目根目录，因此它在每个页面里的基准目录都等于文档根
   （首页引 site.css，子目录页引 ../site.css），
   而 --name-bg 正是由 site.css 里的 .hero-name 消费的。
   详见 site.css 文件头的说明。

   ※ 全部使用 classic script，不用 type="module" ——
     否则 file:// 双击打开会被 CORS 拦掉。
   ============================================================ */
(function () {
  'use strict';

  var SITE_CONFIG = {
    // 小红书主页链接
    xiaohongshu: {
      url: 'https://www.xiaohongshu.com/user/profile/614d52030000000002027c32',
      nickname: '珮希希Zpexii'
    },
    // 微信（点击复制微信号）
    wechat: {
      id: 'Pisces_Zpexii',
      nickname: '风月'
    },
    // 图虫主页链接
    tuchong: {
      url: 'https://fengyue.tuchong.com',
      nickname: '风月'
    },
    // 名字背景图（可选，留空则使用渐变文字效果）
    // 例如: 'url(https://你的图片地址.jpg)'
    nameBgImage: 'url(assets/name-bg.jpg)'
  };

  // 应用配置
  if (SITE_CONFIG.nameBgImage) {
    document.documentElement.style.setProperty('--name-bg', SITE_CONFIG.nameBgImage);
  }

  // 更新社交链接
  (function applySocialConfig() {
    // 小红书
    var xhsLink = document.getElementById('socialXhs');
    if (xhsLink) {
      xhsLink.href = SITE_CONFIG.xiaohongshu.url;
    }
    var xhsLabel = document.getElementById('socialXhsLabel');
    if (xhsLabel) {
      xhsLabel.textContent = SITE_CONFIG.xiaohongshu.url.includes('您的ID')
        ? '待配置'
        : '@' + SITE_CONFIG.xiaohongshu.nickname;
    }
    // 微信 - 点击复制微信号
    var wechatLink = document.getElementById('socialWechat');
    if (wechatLink) {
      wechatLink.onclick = function(e) {
        e.preventDefault();
        var id = SITE_CONFIG.wechat.id;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(id).then(function() {
            showToast('微信号已复制：' + id);
          });
        } else {
          // Fallback
          showToast('微信号：' + id);
        }
      };
    }
    var wechatLabel = document.getElementById('socialWechatLabel');
    if (wechatLabel) {
      wechatLabel.textContent = SITE_CONFIG.wechat.id ? '@' + SITE_CONFIG.wechat.nickname : '待配置';
    }
    // 图虫
    var tuchongLink = document.getElementById('socialTuchong');
    if (tuchongLink) {
      tuchongLink.href = SITE_CONFIG.tuchong.url;
    }
    var tuchongLabel = document.getElementById('socialTuchongLabel');
    if (tuchongLabel) {
      tuchongLabel.textContent = SITE_CONFIG.tuchong.url.includes('tuchong.com')
        ? '@' + SITE_CONFIG.tuchong.nickname
        : '待配置';
    }
  })();

  // 保持改动前那个全局名可用
  window.SITE_CONFIG = SITE_CONFIG;
})();
