# 部署指南 / Deployment Guide

## 当前部署

网站已部署在 GitHub Pages：https://chenxuanzai107-dev.github.io/daily-task-planner/

## ICP 备案后国内部署

### 1. 准备条件

- 已备案域名（如 `chenxuanzai.cn`）
- 阿里云或腾讯云账号

### 2. 阿里云 OSS 部署

```bash
# 安装工具
npm install -g @alicloud/oss-deploy

# 设置环境变量
export ALIYUN_ACCESS_KEY_ID="your-key"
export ALIYUN_ACCESS_KEY_SECRET="your-secret"
export OSS_BUCKET="your-bucket-name"
export OSS_REGION="oss-cn-hangzhou"

# 部署
npm run build
oss-deploy --bucket $OSS_BUCKET --region $OSS_REGION --source dist/
```

OSS 控制台配置：
- 静态页面默认首页：`index.html`
- 默认 404 页：`404.html`
- 绑定自定义域名 + CDN 加速

### 3. 腾讯云 COS 部署

```bash
# 安装工具
npm install -g @tencent/cos-deploy

# 部署
cos-deploy --bucket $COS_BUCKET --region ap-guangzhou --source dist/
```

COS 控制台配置：
- 静态网站 → 开启
- 索引文档：`index.html`
- 错误文档：`404.html`
- 自定义域名 + CDN 加速

### 4. 构建产物说明

```
dist/
  index.html           — 首页
  404.html             — SPA 回退页
  assets/              — 打包后的 CSS/JS
```

全部是静态文件，放任何 Web 服务器都能跑。

### 5. profile_cache 说明

网站使用 localStorage 存储用户任务，数据保存在用户浏览器中，不涉及后端数据库。
