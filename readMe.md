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
