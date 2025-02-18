# CAJ 阅读器 - 在线 CAJ 转 PDF 转换器

## 概述

CAJ 阅读器是一个基于 React、TypeScript 和 Vite 构建的 Web 应用程序，允许用户在线将 CAJ 文件转换为 PDF 格式。它提供了一种快速高效的方式来查看和转换来自 CNKI（中国知网）平台的学术文档。

## 在线预览

该应用的在线版本可在以下地址访问：  
[https://www.viewcaj.online/](https://www.viewcaj.online/)

[View English README](./README.md)

## 功能特点

- **在线转换**：直接在浏览器中将 CAJ 文件转换为 PDF
- **跨平台**：支持 Windows、Mac 和 Linux 系统
- **快速处理**：利用现代 Web 技术实现快速转换
- **隐私保护**：文件在本地处理，不会存储在服务器上
- **用户友好界面**：简洁直观的设计，易于操作

## 使用技术

- **前端**：React 18, TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS
- **PDF 处理**：pdfjs-dist
- **路由**：React Router DOM

## 快速开始

### 环境要求

- Node.js (v16 或更高版本)
- pnpm

### 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://github.com/Wacque/caj-frontend.git
   ```
2. 安装依赖：
   ```bash
   pnpm install
   ```
3. 启动开发服务器：
   ```bash
   pnpm run dev
   ```

### 生产环境构建

创建生产环境构建：

```bash
pnpm run build
```

### 代码检查

项目使用 ESLint 进行代码质量检查：

```bash
pnpm run lint
```

## 配置

项目包含以下配置文件：

- `vite.config.ts` - Vite 构建配置
- `tailwind.config.js` - Tailwind CSS 配置
- `eslint.config.js` - ESLint 配置

## 项目结构

```
src/
├── components/        # React 组件
├── assets/            # 静态资源（图片、图标）
├── styles/            # 全局样式
├── main.tsx           # 应用入口
├── Index.tsx          # 主页面组件
└── Provider.tsx       # 状态管理上下文
```

## 许可证

本项目采用 MIT 许可证。

## 致谢

- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist) 用于 PDF 渲染
- [React](https://reactjs.org/) 作为 UI 框架
- [Vite](https://vitejs.dev/) 作为构建工具

## 环境变量

项目使用以下环境变量：

| 变量名              | 描述                | 默认值                  |
| ------------------- | ------------------- | ----------------------- |
| `VITE_API_BASE_URL` | 后端 API 的基础 URL | `http://localhost:3000` |

配置这些变量：

1. 在根目录创建 `.env` 文件
2. 按照以下格式添加所需变量：
   ```env
   VITE_API_BASE_URL=http://your-api-url
   ```
3. 重启开发服务器

在生产环境中，请确保这些变量已在部署环境中设置。

## 后端集成

本前端应用设计用于与 [CAJ 后端](https://github.com/Wacque/caj-backend.git) 项目配合使用。后端负责实际的 CAJ 到 PDF 转换过程。

### 后端设置

1. 克隆后端仓库：
   ```bash
   git clone https://github.com/Wacque/caj-backend.git
   ```
2. 按照后端仓库 README 中的安装说明进行操作
3. 配置前端环境变量以指向您的后端实例：
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### 开发流程

1. 首先启动后端服务器
2. 然后启动前端开发服务器
3. 在开发过程中，两个服务器应同时运行
