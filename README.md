# Coding Plans Board

基于 Vue 3 + Vite 的套餐规划展示面板

## 技术栈

- **框架**: Vue 3.3.11
- **构建工具**: Vite 5.0.8
- **UI 框架**: Element Plus 2.4.4
- **路由**: Vue Router 4.2.5

## 开发流程

### 1. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 2. 开发完成后提交到 dev 分支

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 dev 分支
git push origin dev
```

### 3. 合并到 master 分支

```bash
# 切换到 master 分支
git checkout master

# 合并 dev 分支
git merge dev

# 解决可能的冲突（如果有冲突）
# 使用 git checkout --theirs <文件> 接受 dev 分支的版本
# 然后 git add . 和 git commit
```

### 4. 构建生产版本

```bash
# 构建静态文件到 dist 目录
npm run build
```

### 5. 提交 dist 到 master 分支

```bash
# 添加 dist 目录
git add dist/

# 提交构建文件
git commit -m "build: update dist"

# 推送到 master 分支
git push origin master
```

### 6. 简化命令（可选）

创建 Git 别名简化操作：

```bash
# 添加别名
git config --global alias.dm '!git checkout master && git merge dev'
git config --global alias.build '!npm run build && git add dist/ && git commit -m "build: update dist"'

# 使用别名
git dm          # 合并 dev 到 master
git build       # 构建并提交 dist
```

## GitHub Pages 配置

### 首次配置

1. 访问 GitHub 仓库设置
   - 打开：https://github.com/liliexuan/liliexuan.github.io/settings/pages

2. 配置 Pages 源
   - **Source**: Deploy from a branch
   - **Branch**: 
     - 左侧选择：`master`
     - 右侧选择：`/ (root)`

3. 保存后等待部署
   - GitHub 会自动构建并部署
   - 1-2 分钟后显示访问链接
   - 访问地址：`https://liliexuan.github.io/`

### 更新站点

每次推送代码到 master 分支后：

1. 本地执行构建：`npm run build`
2. 提交 dist 目录：`git add dist/ && git commit -m "build: update dist"`
3. 推送到 master：`git push origin master`
4. GitHub Pages 会自动更新（约 1-2 分钟）

## 完整发布流程示例

```bash
# 1. 在 dev 分支开发
git checkout dev
# ... 进行开发工作 ...
git add .
git commit -m "feat: 添加新功能"
git push origin dev

# 2. 合并到 master
git checkout master
git merge dev
git push origin master

# 3. 构建并部署
npm run build
git add dist/
git commit -m "build: 更新生产版本"
git push origin master

# 4. 等待 GitHub Pages 自动部署
# 访问 https://liliexuan.github.io/ 查看更新
```

## 目录结构

```
liliexuan.github.io/
├── src/                    # 源代码目录
│   ├── components/        # Vue 组件
│   ├── data/             # JSON 数据
│   ├── config/           # 配置文件
│   ├── router/           # 路由配置
│   ├── main.js           # 入口文件
│   └── App.vue           # 根组件
├── dist/                  # 构建输出（提交到 GitHub）
├── public/               # 静态资源
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
└── README.md            # 本文件
```

## 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
git status       # 查看 Git 状态
git log --oneline  # 查看提交历史
```

## 注意事项

1. **永远不要手动修改 dist 目录** - 它是由 `npm run build` 自动生成的
2. **开发在 dev 分支** - 所有新功能都在 dev 分支开发
3. **master 只包含构建结果** - master 分支主要包含 dist 目录和合并的代码
4. **提交前检查** - 确保本地运行正常后再提交
5. **GitHub Pages 自动部署** - 推送到 master 后会自动部署，无需手动操作

## 故障排除

### GitHub Pages 不更新

1. 检查 master 分支是否包含最新的 dist 目录
2. 查看 GitHub Actions 是否有构建错误
3. 清除浏览器缓存后重试

### 构建失败

```bash
# 清理缓存重新构建
rm -rf dist/
npm cache clean --force
npm install
npm run build
```

### 合并冲突

```bash
# 如果合并 dev 到 master 时出现冲突
git merge --abort  # 取消合并
git checkout dev   # 回到 dev 分支解决冲突
# ... 解决冲突 ...
git add .
git commit -m "解决冲突"
git push origin dev
# 重新尝试合并
git checkout master
git merge dev
```

## 许可证

MIT
