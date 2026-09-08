# 輔科舞告賀 PWA

這是一個可安裝的 Progressive Web App 網站原型。

## 已完成
- 可加入手機主畫面／電腦桌面
- `display: standalone`，安裝後以獨立視窗開啟
- PWA 專屬 192px / 512px 圖示
- Service Worker 快取核心介面
- 離線頁面
- 偵測新版 Service Worker 並顯示「立即更新」
- 手機／平板／電腦 RWD
- YouTube 頻道入口
- YouTube 精選影片嵌入

## 本機測試
PWA 不能直接用 `file://` 測試 Service Worker，需要 HTTP/HTTPS。

例如：
```bash
python -m http.server 8080
```
然後開啟：
`http://localhost:8080`

## 部署
可直接部署到：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

正式部署建議使用 HTTPS；上述服務均可自動提供 HTTPS。

## 更新網站時
修改網站內容後，請同步修改 `service-worker.js` 中：
```js
const CACHE_NAME = "axcellent-pwa-v1.0.0";
```
例如改成 `v1.0.1`。使用者再次打開網站時，就能收到新版提示。

## 下一階段可加入
- 自動抓取 YouTube 最新影片
- 輔具成果資料庫
- 搜尋／分類功能
- 活動與研習專區
- 聯絡表單
- 推播通知
- 後台內容管理
