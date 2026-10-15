# CHANGELOG — LUMIÈRE · 光影集

所有重要变更将记录于此。按 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 格式维护。

---

## [v2.0.0] — 2026-10

### 重构
- **refactor** 全站模块化：样式从巨大的单文件 `index.html`（9000+ 行）拆至外部 `site.css`，JS 逻辑拆为 `assets/js/` 模块层（config / shell / column / columns）
- **refactor** 内容从 HTML 硬编码迁移至 `assets/data/*.js` 配置层，新增 / 修改分栏只需改数据文件

### 新增
- **feat** 四大内容板块上线：`aesthetics`（美学设计）· `ideas`（奇思妙想）· `notes`（碎碎念）· `volunteer`（义工）
- **feat** `.github/workflows/pages.yml` GitHub Pages 部署（本地已保留，当前 token 无 workflow scope）
- **feat** 补充 `.gitignore`（`.DS_Store` / 编辑器 / node_modules）
- **feat** 新增工具摄影占位图（eq 系列机身 + 镜头 + 配件）

### 设计
- **design** 延续 Apple 工业设计美学：磨砂玻璃 / 虹彩 / 充足留白 / 统一秩序

---

## [v1.0.0] — 2026

### 新增
- **feat** 光影集首个版本：单文件 HTML 作品集（Cos · 日常 · 婚礼 · 风景 · AIGC 创作）
- **feat** Apple 化排版基础样式

---

*v2.0.0 仓库从旧账号 yj9j6xt668/lum 迁移至 zpexii/lum-art，由于原仓库为 shallow clone 无法 unshallow，故重建 git 历史（内容完整保留）。`.github/workflows/pages.yml` 本地已存在，待 workflow scope 补齐后推送。*
