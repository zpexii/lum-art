/* ============================================================
   GALLERY & PORTRAIT DATA —— 画廊分类 · 作品集 · 关于我肖像轮播
   ------------------------------------------------------------
   ⚠️ 路径约定：
      1. 封面/缩略图（photo-card 和 collection-overlay 用第一张）：
         galleries 每个 collection 的 thumb 字段 → 指向 thumb.jpg（单图，推荐）
         也可以省略 thumb，直接用 items[0].src 当封面（向后兼容）

      2. 作品详情里的每张图：
         collections[].items[].src → 单张高清原图路径

      3. 目录结构建议（放真实照片时）：
         assets/images/collections/
           cos-01/
             thumb.jpg           ← 画廊卡片封面（可以是原图也可以是缩图）
             01-骑士.jpg         ← 2048px 长边高清原图
             02-精灵.jpg
             03-妖狐.jpg
             04-黎明.jpg
           cos-02/
             ...
      4. 先用 picsum 占位，替换真实照片时只改 src 字段就行。

   ⚠️ 图片不压缩：GitHub Pages 原样分发原分辨率文件。
      浏览器端用 CSS object-fit: cover 从原图截显示，始终保留高清原图。

   字段说明：
     collection（每组作品集）：
       id     : 唯一标识符（同时用于 DOM data-collection 属性）
       cat    : categories 里的 key（cos / daily / wedding / landscape / aigc）
       title  : 画廊卡片 + 详情页标题
       desc   : 详情页描述（一句话）
       thumb  : 封面图路径（可省略，省略时用 items[0].src）
       items  : 详情页 4 张图
         - title : 图片标题
         - src   : 图片路径（picsum 占位 / 本地高清原图）
         - loc   : 拍摄地点

   ============================================================ */
window.LUMIERE_GALLERIES = window.LUMIERE_GALLERIES || {};

/* ---------- 分类定义 ---------- */
window.LUMIERE_GALLERIES.categories = {
  cos:      { name: 'Cos',      label: 'Cosplay',   color: '#ff375f', en: 'Cosplay' },
  daily:    { name: '日常',      label: 'Daily Life', color: '#ff9f0a', en: 'Daily Life' },
  wedding:  { name: '婚礼',      label: 'Wedding',    color: '#ffb6c1', en: 'Wedding' },
  landscape:{ name: '风景',      label: 'Landscape',  color: '#30d158', en: 'Landscape' },
  aigc:     { name: 'AIGC',     label: 'AI Generative', color: '#64d2ff', en: 'AI Generative' }
};

/* ---------- 15 组作品集 ---------- */
window.LUMIERE_GALLERIES.collections = [
  // === COS ===
  {
    id: 'cos-01', cat: 'cos', title: '暗夜幻影', desc: '暗黑系角色还原，用光影塑造戏剧张力。从森林到废墟，每一帧都充满故事感。',
    items: [
      { title: '幻夜骑士', src: 'https://picsum.photos/seed/cos01/800/1200', loc: '上海·漫展' },
      { title: '暗夜精灵', src: 'https://picsum.photos/seed/cos06/800/1150', loc: '苏州·园林' },
      { title: '妖狐幻影', src: 'https://picsum.photos/seed/cos10/800/1100', loc: '成都·实景基地' },
      { title: '战士黎明', src: 'https://picsum.photos/seed/cos12/800/1000', loc: '横店·影视城' }
    ]
  },
  {
    id: 'cos-02', cat: 'cos', title: '和风物语', desc: '东方美学的细腻呈现，从樱花到花魁，诠释日式与国风的交融之美。',
    items: [
      { title: '樱花巫女', src: 'https://picsum.photos/seed/cos02/800/1100', loc: '杭州·茶园' },
      { title: '古风剑客', src: 'https://picsum.photos/seed/cos04/800/1200', loc: '安吉·竹海' },
      { title: '和风花魁', src: 'https://picsum.photos/seed/cos08/800/1200', loc: '上海·实景棚' },
      { title: '圣女颂歌', src: 'https://picsum.photos/seed/cos11/800/1200', loc: '北京·教堂' }
    ]
  },
  {
    id: 'cos-03', cat: 'cos', title: '未来狂想', desc: '科幻与奇幻的碰撞，机甲、魔法与赛博朋克，探索想象力的边界。',
    items: [
      { title: '机甲少女', src: 'https://picsum.photos/seed/cos03/800/1000', loc: '深圳·展馆' },
      { title: '星之魔法师', src: 'https://picsum.photos/seed/cos05/800/900', loc: '上海·影棚' },
      { title: '赛博朋克', src: 'https://picsum.photos/seed/cos07/800/1050', loc: '重庆·洪崖洞' },
      { title: '蒸汽朋克', src: 'https://picsum.photos/seed/cos09/800/950', loc: '广州·Workshop' }
    ]
  },

  // === DAILY ===
  {
    id: 'daily-01', cat: 'daily', title: '城市漫游', desc: '穿梭在城市角落，捕捉那些被忽略的日常美感。一花一叶，皆是风景。',
    items: [
      { title: '街角花店', src: 'https://picsum.photos/seed/daily03/800/900', loc: '上海·武康路' },
      { title: '地铁站台', src: 'https://picsum.photos/seed/daily07/800/600', loc: '上海·人民广场' },
      { title: '雨后散步', src: 'https://picsum.photos/seed/daily04/800/1100', loc: '杭州·西湖' },
      { title: '夜跑记录', src: 'https://picsum.photos/seed/daily11/800/1000', loc: '深圳·湾公园' }
    ]
  },
  {
    id: 'daily-02', cat: 'daily', title: '生活仪式', desc: '在快节奏的生活里，保留一份属于自己的仪式感。咖啡、阅读、手作。',
    items: [
      { title: '窗边午后', src: 'https://picsum.photos/seed/daily01/800/600', loc: '上海·家中' },
      { title: '咖啡时光', src: 'https://picsum.photos/seed/daily02/800/1000', loc: '上海·咖啡馆' },
      { title: '书店静默', src: 'https://picsum.photos/seed/daily06/800/1050', loc: '南京·先锋书店' },
      { title: '手作时光', src: 'https://picsum.photos/seed/daily12/800/850', loc: '上海·工作室' }
    ]
  },
  {
    id: 'daily-03', cat: 'daily', title: '人间烟火', desc: '市集的热闹、公园的晨练、阳台上的家常饭，生活最本真的模样。',
    items: [
      { title: '市集烟火', src: 'https://picsum.photos/seed/daily05/800/800', loc: '北京·鼓楼' },
      { title: '阳台晚餐', src: 'https://picsum.photos/seed/daily08/800/950', loc: '成都·家中' },
      { title: '公园晨练', src: 'https://picsum.photos/seed/daily10/800/700', loc: '北京·朝阳公园' },
      { title: '旧物整理', src: 'https://picsum.photos/seed/daily09/800/1100', loc: '上海·旧居' }
    ]
  },

  // === WEDDING ===
  {
    id: 'wed-01', cat: 'wedding', title: '仪式之晨', desc: '婚礼当天的清晨，从晨光准备到 First Look，记录最真挚的期待与感动。',
    items: [
      { title: '晨光准备', src: 'https://picsum.photos/seed/wed02/800/1200', loc: '上海·酒店套房' },
      { title: '父亲牵手', src: 'https://picsum.photos/seed/wed04/800/950', loc: '北京·庄园' },
      { title: 'First Look', src: 'https://picsum.photos/seed/wed05/800/1050', loc: '苏州·园林' },
      { title: '背后纽扣', src: 'https://picsum.photos/seed/wed11/800/1200', loc: '上海·更衣室' }
    ]
  },
  {
    id: 'wed-02', cat: 'wedding', title: '浪漫瞬间', desc: '誓言、花瓣、初舞，那些让人热泪盈眶的浪漫时刻，被镜头定格成永恒。',
    items: [
      { title: '誓言时刻', src: 'https://picsum.photos/seed/wed01/800/1100', loc: '三亚·海滨教堂' },
      { title: '花瓣雨', src: 'https://picsum.photos/seed/wed06/800/700', loc: '大理·草坪' },
      { title: '舞池初舞', src: 'https://picsum.photos/seed/wed10/800/1100', loc: '成都·酒店' },
      { title: '烟花祝福', src: 'https://picsum.photos/seed/wed12/800/900', loc: '三亚·海滩' }
    ]
  },
  {
    id: 'wed-03', cat: 'wedding', title: '细节之美', desc: '花束、戒指、灯火、剪影，那些容易被忽略的细节，恰恰是最动人的注脚。',
    items: [
      { title: '花束特写', src: 'https://picsum.photos/seed/wed03/800/800', loc: '杭州·花园' },
      { title: '戒指细节', src: 'https://picsum.photos/seed/wed07/800/800', loc: '上海·仪式厅' },
      { title: '黄昏剪影', src: 'https://picsum.photos/seed/wed08/800/600', loc: '厦门·海滩' },
      { title: '宴会灯火', src: 'https://picsum.photos/seed/wed09/800/1000', loc: '上海·宴会厅' }
    ]
  },

  // === LANDSCAPE ===
  {
    id: 'land-01', cat: 'landscape', title: '山河壮阔', desc: '从雪山到沙漠，从云海到冰湖，用镜头丈量祖国的大好河山。',
    items: [
      { title: '雪山日出', src: 'https://picsum.photos/seed/land01/800/500', loc: '西藏·纳木错' },
      { title: '沙漠驼影', src: 'https://picsum.photos/seed/land07/800/700', loc: '甘肃·鸣沙山' },
      { title: '云海翻涌', src: 'https://picsum.photos/seed/land06/800/500', loc: '安徽·黄山' },
      { title: '冰湖倒影', src: 'https://picsum.photos/seed/land08/800/1000', loc: '四川·九寨沟' }
    ]
  },
  {
    id: 'land-02', cat: 'landscape', title: '光影诗篇', desc: '梯田的光影、晨雾的朦胧、日落的余晖，大自然是最好的光影师。',
    items: [
      { title: '梯田光影', src: 'https://picsum.photos/seed/land02/800/600', loc: '云南·元阳' },
      { title: '茶园晨雾', src: 'https://picsum.photos/seed/land11/800/650', loc: '浙江·龙井' },
      { title: '海岸礁石', src: 'https://picsum.photos/seed/land05/800/600', loc: '福建·霞浦' },
      { title: '城市天际线', src: 'https://picsum.photos/seed/land09/800/550', loc: '上海·外滩' }
    ]
  },
  {
    id: 'land-03', cat: 'landscape', title: '星辰之外', desc: '星空、极光、秋日胡杨、夜樱隧道，超越日常的奇幻自然景观。',
    items: [
      { title: '星空银河', src: 'https://picsum.photos/seed/land03/800/550', loc: '青海·茶卡盐湖' },
      { title: '秋日胡杨', src: 'https://picsum.photos/seed/land04/800/1100', loc: '内蒙古·额济纳' },
      { title: '樱花隧道', src: 'https://picsum.photos/seed/land10/800/1100', loc: '贵州·平坝' },
      { title: '极光之夜', src: 'https://picsum.photos/seed/land12/800/600', loc: '挪威·特罗姆瑟' }
    ]
  },

  // === AIGC ===
  {
    id: 'aigc-01', cat: 'aigc', title: '梦境生成', desc: '以 AI 为画笔，将想象力渲染成可见的影像。每一帧都是算法与审美的对话。',
    items: [
      { title: '霓虹都市', src: 'https://picsum.photos/seed/aigc01/800/1000', loc: 'AI 生成' },
      { title: '星海漫游', src: 'https://picsum.photos/seed/aigc02/800/1200', loc: 'AI 生成' },
      { title: '机械之花', src: 'https://picsum.photos/seed/aigc03/800/900', loc: 'AI 生成' },
      { title: '云上之城', src: 'https://picsum.photos/seed/aigc04/800/1100', loc: 'AI 生成' }
    ]
  },
  {
    id: 'aigc-02', cat: 'aigc', title: '风格实验', desc: '从赛博朋克到古典油画，探索 AI 在不同视觉语言下的表达边界。',
    items: [
      { title: '蒸汽纪元', src: 'https://picsum.photos/seed/aigc05/800/1200', loc: 'AI 生成' },
      { title: '浮世新绘', src: 'https://picsum.photos/seed/aigc06/800/1000', loc: 'AI 生成' },
      { title: '极简几何', src: 'https://picsum.photos/seed/aigc07/800/600', loc: 'AI 生成' },
      { title: '水墨再造', src: 'https://picsum.photos/seed/aigc08/800/1100', loc: 'AI 生成' }
    ]
  },
  {
    id: 'aigc-03', cat: 'aigc', title: '概念影像', desc: '用 AI 生成工具创作的概念摄影，重新定义真实与想象的边界。',
    items: [
      { title: '时间裂隙', src: 'https://picsum.photos/seed/aigc09/800/900', loc: 'AI 生成' },
      { title: '光之教堂', src: 'https://picsum.photos/seed/aigc10/800/1200', loc: 'AI 生成' },
      { title: '未来遗迹', src: 'https://picsum.photos/seed/aigc11/800/700', loc: 'AI 生成' },
      { title: '镜中世界', src: 'https://picsum.photos/seed/aigc12/800/1000', loc: 'AI 生成' }
    ]
  }
];

/* ---------- 关于我肖像轮播 ---------- */
window.LUMIERE_GALLERIES.portraits = [
  { src: 'assets/portrait-fengyue.jpg', alt: '风月' },
  { src: 'assets/portrait-placeholder-2.svg', alt: '占位图 2' },
  { src: 'assets/portrait-placeholder-3.svg', alt: '占位图 3' },
  { src: 'assets/portrait-placeholder-4.svg', alt: '占位图 4' }
];
