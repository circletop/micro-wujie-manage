# 项目介绍

  无界微前端框架，主应用基于vue3.0 + vite

## 快速开始

### 单独运行子项目

```bash
  # 运行一个子包
  pnpm --filter <packageName> dev 
  # 运行多个子包
  pnpm --filter <packageName> --filter <packageName> dev
```

### 通配符运行包

```bash
# 使用通配符运行符合条件的包的脚本
pnpm --filter 'packages/*' build
```

### 运行所有子项目的脚本

```bash
# 运行所有子包的 test 脚本
pnpm -r test
```


## PNPM 命令常用技巧

## 常用命令

```bash
pnpm ls -r #列出所有工作区包及其依赖。
pnpm outdated -r #检查所有工作区包的过时依赖。
pnpm up -r #更新所有工作区包的依赖。
pnpm store prune #清理本地 pnpm 存储，删除未引用的包。
```

### 安装依赖

在 Monorepo 根目录运行 pnpm install 会安装所有子包的依赖，并且 pnpm 会自动识别并符号链接（symlink）工作区内的互相依赖。

 ```bash
 # 在 Monorepo 根目录
pnpm install
 ```

### 添加/移除依赖

```bash
# 在 Monorepo 根目录安装依赖到根 package.json (通常用于工具，如eslint, prettier等)
pnpm add <dependency-name> -w

# 在 Monorepo 根目录移除依赖
pnpm remove <dependency-name> -w

# 在子包安装依赖
# 例如，给 package-a 添加 react 依赖
cd packages/package-a
pnpm add react

#添加工作区内部依赖
# 在 package-b 中添加对 package-a 的依赖
cd packages/package-b
pnpm add @my-monorepo/package-a

# 这会在 package-b 的 package.json 中添加 `"@my-monorepo/package-a": "workspace:^1.0.0"` 这样的依赖
# "workspace:" 协议告诉 pnpm 这是一个工作区内部的依赖
```

####

## 微前端（Wujie）本地开发指南

此仓库包含一个主应用（`apps/vue-main`）与多个微应用（`apps/microAppVue`, `apps/microAppVue2`, `apps/microapp-react`）。我们使用 Wujie 作为微前端运行时。

本地启动步骤：

1. 在根目录安装依赖：

```bash
pnpm install
```

1. 并行启动所有服务（或单独启动其中任意一个）：

```bash
pnpm run dev:all
# 或者分别运行
pnpm run dev:main
pnpm run dev:microAppVue
pnpm run dev:microAppVue2
pnpm run dev:microAppReact
```

1. 打开主应用： [http://localhost:9527](http://localhost:9527)

调试提示：

- 如果主应用页面未能挂载某个微应用，检查相应子应用是否已成功启动（检查子应用 dev server 输出），并确认端口是否正确。
- 如果使用了代理或自定义域名，确保 `wujie-register.js` 中的 URL 与实际可访问地址一致。

## CI

仓库包含一个简单的 GitHub Actions workflow (`.github/workflows/ci.yml`) 用于在 PR/推送到 main 时执行 pnpm install 并对各子应用运行 `vite build` 来保证构建不报错。

