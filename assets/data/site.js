/* ============================================================
   SITE CONTENT DATA —— Hero/About/Equipment/Manifesto/Snippets/Footer
   ------------------------------------------------------------
   全站静态文案从 index.html 抽出来。改文案/换器材列表/加灵感碎片
   只改这个文件，index.html 和 JS 渲染逻辑不动。

   图片路径约定：
     - Hero 背景图：config.js 里已有 nameBgImage 字段，不动
     - About 肖像轮播：在 galleries.js 的 LUMIERE_GALLERIES.portraits
     - Equipment 产品图：assets/eq-*.jpg（现有文件不动）
     - Snippets 碎片图：assets/images/snippets/ 或 picsum 占位

   全站使用：window.LUMIERE_SITE（classic script，file:// 可开）
   ============================================================ */
window.LUMIERE_SITE = window.LUMIERE_SITE || {};

/* ---------- Hero ---------- */
window.LUMIERE_SITE.hero = {
  eyebrow: 'Personal Photography Portfolio',
  name: '风月',
  nameEn: 'FENG YUE · LUMIÈRE',
  tagline: '用镜头书写<span class="highlight">光影的诗</span>，<br>在快门之间收藏世界的温度。',
  subdesc: '独立摄影师 · 专注人像与纪实摄影 · 用影像记录从二次元到现实世界的每一个动人瞬间',
  actions: [
    { label: '浏览作品', href: '#gallery' },
    { label: '关于我',   href: '#about'  }
  ]
};

/* ---------- About ---------- */
window.LUMIERE_SITE.about = {
  sectionLabel: '关于我 · About',
  h2: '一个用<span class="gradient">光影</span>讲故事的人',
  bio: [
    '<strong>风月</strong>，独立摄影师，常驻成都。大学期间拿起相机，从此便沉迷于快门开合间凝固的那个瞬间。我相信每一张照片都是一封写给时间的情书,它可以把你拉回到记忆中的那个时间，感受到那时的情绪和流转',
    '从漫展上角色扮演者的华丽变身，到婚礼上新人的幸福时刻，到雪山之巅被朝阳点燃的云海，和刺破天穹的霞光,<strong>我试图用镜头记录世界的每一面</strong>。不设限，不定义，只追随那些让我心动的光影。'
  ],
  tags: [
    { label: 'Cosplay 摄影',  dot: '#ff375f' },
    { label: '人文纪实',      dot: '#ff9f0a' },
    { label: '婚礼跟拍',      dot: '#ffb6c1' },
    { label: '风光摄影',      dot: '#30d158' },
    { label: '商业约拍',      dot: '#64d2ff' },
    { label: '后期修图',      dot: '#bf5af2' }
  ],
  socials: [
    {
      name: '小红书', label: '@珮希希Zpexii',
      href: 'https://www.xiaohongshu.com/user/profile/614d52030000000002027c32',
      icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="1.5" y="6" width="21" height="12" rx="6" fill="#FF2442"></rect><text x="12" y="15.5" font-family="PingFang SC,Microsoft YaHei,sans-serif" font-size="7.5" font-weight="700" fill="white" text-anchor="middle">小红书</text></svg>'
    },
    {
      name: '微信', label: '@风月',
      href: 'javascript:void(0)',
      onClick: "showToast('微信：fengyue-lumiere，欢迎约拍与交流')",
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M16.5 6.5c-3.04 0-5.5 2.1-5.5 4.7 0 1.2.57 2.3 1.5 3.1l-.5 1.5 1.7-.9c.75.23 1.55.35 2.38.35 3.04 0 5.5-2.1 5.5-4.7S19.54 6.5 16.5 6.5z" fill="#07C160" opacity="0.7"></path><path d="M8.5 2C4.36 2 1 4.8 1 8.25c0 1.92 1.05 3.64 2.7 4.8L3 15l2.7-1.35c.9.26 1.85.4 2.8.4.54 0 1.07-.05 1.58-.15-.05-.23-.08-.46-.08-.7 0-2.5 2.47-4.53 5.5-4.53.28 0 .55.02.82.05C15.42 4.86 12.23 2 8.5 2z" fill="#07C160"></path></svg>'
    },
    {
      name: '图虫', label: '@风月',
      href: 'https://fengyue.tuchong.com',
      icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#FF6A00"></circle><text x="12" y="16" font-family="PingFang SC,sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle">图</text></svg>'
    }
  ]
};

/* ---------- Equipment ---------- */
window.LUMIERE_SITE.equipment = {
  headerEyebrow: 'Equipment',
  title: '当前器材',
  items: [
    { img: 'assets/eq-a7iv.jpg',   name: 'Pocket4pro',          spec: '手持电影机' },
    { img: 'assets/eq-2470gm2.jpg',name: '24-70mm f/2.8 GM II', spec: '标准变焦 · G Master' },
    { img: 'assets/eq-85mm.jpg',   name: '85mm f/1.4 GM',       spec: '人像定焦 · G Master' },
    { img: 'assets/eq-70200.jpg',  name: '70-200mm f/2.8 GM II',spec: '长焦变焦 · G Master' },
    { img: 'assets/eq-1635.jpg',   name: '16-35mm f/2.8 GM',    spec: '超广角 · G Master' },
    { img: 'assets/eq-godox.jpg',  name: 'Godox AD200 Pro',     spec: '便携闪光灯 · 200Ws' },
    { img: 'assets/eq-nanlite.jpg',name: 'Nanlite Forza 60C',   spec: '全彩LED · 60W' },
    { img: 'assets/eq-rs4.jpg',    name: 'DJI RS 4',            spec: '三轴稳定器 · 3kg负载' },
    { img: 'assets/eq-mavic.jpg',  name: 'DJI Mavic 3 Pro',     spec: '哈苏三摄 · 4/3 CMOS' },
    { img: 'assets/eq-macbook.jpg',name: 'MacBook Pro 16"',     spec: 'M3 Max · 48GB' },
    { img: 'assets/eq-t7.jpg',     name: 'Samsung T7',          spec: '2TB · 移动固态硬盘' }
  ]
};

/* ---------- Manifesto ---------- */
window.LUMIERE_SITE.manifesto = {
  quote: '我不是在拍摄你想看到的，<br>我，在收藏<em>光</em>——<span class="grad">每一次凝视</span>。',
  sub: '快门声响起以前，我已经等了很久。<br>等风停，等光线落稳，等那个恰好的瞬间自己走过来。<br>我把它们留下来，留给所有<em class="grad">值得被记住</em>的日子。',
  keywords: ['Cosplay', 'Daily', 'Wedding', 'Scenery', 'AIGC'],
  en: 'Lumière · Faites Silence'
};

/* ---------- Snippets（灵感碎片） ---------- */
window.LUMIERE_SITE.snippets = {
  headerLabel: '灵感碎片 · Fragments',
  items: [
    { img: 'https://picsum.photos/seed/frag01/600/450', note: '第一缕晨光落在旧相机上', marker: 'FRAG · 001' },
    { img: 'https://picsum.photos/seed/frag02/600/450', note: '把暂不能按下快门的心情，也收进胶卷', marker: 'FRAG · 002' },
    { img: 'https://picsum.photos/seed/frag03/600/450', note: '他望着那扇窗，很久很久', marker: 'FRAG · 003' },
    { img: 'https://picsum.photos/seed/frag04/600/450', note: '街角的花，替整条巷子开了个故事', marker: 'FRAG · 004' },
    { img: 'https://picsum.photos/seed/frag05/600/450', note: '逆光里，他回头笑了三次', marker: 'FRAG · 005' },
    { img: 'https://picsum.photos/seed/frag06/600/450', note: '这一帧，温度刚刚好', marker: 'FRAG · 006' }
  ]
};

/* ---------- Footer ---------- */
window.LUMIERE_SITE.footer = {
  signatureSvg: '<svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 38c22-26 44-30 52-14 7 14-3 28-20 22-16-6-12-30 6-40 12-7 30 0 34 20 3 14-8 18-12 12M86 36c6-16 16-20 22-10 5 9 0 20-12 18 18-2 26 6 22 16M132 32c0-14 12-22 20-16 8 6 2 24-14 24M178 28c-8-6-14 2-10 8 4 6 16 4 16-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  signatureCaption: 'Signed · 风月 · LUMIÈRE',
  brand: 'LUMIÈRE',
  tagline: '光影之间，记录每一个值得珍藏的瞬间'
};

/* ---------- Music Playlist ---------- */
window.LUMIERE_SITE.playlist = [
  { name: 'Midnight Reverie', artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: null },
  { name: 'Golden Hour',      artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: null },
  { name: 'Silent Bloom',     artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: null },
  { name: 'Urban Echoes',     artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', cover: null },
  { name: 'Dreamwalker',      artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', cover: null },
  { name: 'Crimson Dusk',     artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', cover: null },
  { name: 'Velvet Storm',     artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', cover: null },
  { name: 'Lunar Tide',       artist: 'SoundHelix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', cover: null }
];
