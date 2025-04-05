# 便笺 Pro Chrome 扩展

一个支持 Markdown 的类 Apple Notes 风格的笔记应用，让你可以在浏览器中快速记录和管理笔记。

## 功能特点

- 简洁优雅的 Apple Notes 风格界面
- 支持 Markdown 格式
- 自动保存功能
- 轻量级，快速响应

## 安装方法

1. 下载或克隆此仓库到本地
2. 打开 Chrome 浏览器，进入扩展程序页面 (chrome://extensions/)
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择项目文件夹即可完成安装

## 开发说明

本项目使用原生 JavaScript 开发，无需额外的框架依赖。

### 项目结构

```
├── icons/              # 图标文件
├── popup.html          # 弹出窗口 HTML
├── popup.js            # 弹出窗口脚本
├── manifest.json       # 扩展配置文件
└── package.json        # 项目配置文件
```

### 本地开发

1. 克隆仓库：
```bash
git clone [仓库地址]
cd notes-pro
```

2. 安装依赖：
```bash
npm install
```

3. 在 Chrome 中加载扩展程序进行测试

## 许可证

ISC