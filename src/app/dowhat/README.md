# DoWhat - 选择困难症决策助手

一个帮助选择困难症患者做决定的趣味 Web 应用。

## 功能特性

### ✨ 核心功能

- **主题管理**：创建、编辑、删除决策主题（例如：今天吃什么、周末去哪玩）
- **选项管理**：为每个主题添加多个选项，支持批量输入
- **多种抽奖方式**：
  - 🎡 **轮盘抽奖**：彩色轮盘旋转，带有流畅的 GSAP 动画
  - 🎰 **滚动抽奖**：老虎机风格的三列滚动，依次停止增加悬念
- **结果展示**：带有五彩纸屑庆祝效果
- **数据持久化**：使用 Zustand + persist 中间件，数据保存在本地

### 🎨 动画效果

- 轮盘旋转动画（使用 GSAP power4.out 缓动）
- 滚动滑块动画（三列依次停止）
- 五彩纸屑庆祝效果
- 卡片进入动画
- 按钮悬停效果

### 🗄️ 数据存储

- 使用 Zustand 进行状态管理
- 使用 persist 中间件实现本地持久化
- 所有数据保存在浏览器 LocalStorage
- 支持主题、选项和历史记录

## 技术栈

- **框架**：Next.js 15 (App Router)
- **状态管理**：Zustand + persist
- **动画库**：GSAP
- **UI 组件**：Radix UI + Tailwind CSS
- **图标**：Lucide React
- **TypeScript**：完整的类型支持

## 文件结构

```
src/app/dowhat/
├── _components/          # 组件目录
│   ├── WheelDraw.tsx    # 轮盘抽奖组件
│   ├── SlotDraw.tsx     # 滚动抽奖组件
│   ├── AnimatedCard.tsx # 动画卡片组件
│   ├── Confetti.tsx     # 五彩纸屑效果
│   └── index.ts         # 组件导出
├── _store/              # 状态管理
│   └── useDecisionStore.ts
├── _types/              # 类型定义
│   └── index.ts
├── [themeId]/           # 动态路由
│   ├── edit/           # 编辑页面
│   │   └── page.tsx
│   └── draw/           # 抽奖页面
│       └── page.tsx
├── layout.tsx          # 布局
├── page.tsx            # 首页（主题列表）
└── README.md           # 说明文档
```

## 使用方法

### 1. 创建主题

在首页点击「创建新主题」，输入主题名称（例如：今天吃什么）。

### 2. 添加选项

进入主题编辑页面，点击「添加选项」：
- 单个添加：直接输入一个选项名称
- 批量添加：每行输入一个选项，按回车添加多个

### 3. 开始抽取

当选项数量 ≥ 2 时，可以点击「开始抽取」进入抽奖页面：
- 选择抽奖方式（轮盘/滚动）
- 点击「开始抽取」按钮
- 等待动画完成查看结果

### 4. 重新抽取

结果展示后可以点击「再来一次」重新抽取。

## 数据模型

### DecisionTheme（决策主题）
```typescript
interface DecisionTheme {
  id: string
  name: string
  description?: string
  icon?: string
  createdAt: number
  updatedAt: number
  options: DecisionOption[]
}
```

### DecisionOption（决策选项）
```typescript
interface DecisionOption {
  id: string
  name: string
  description?: string
  weight: number        // 权重（影响被抽中的概率）
  imageUrl?: string
  order: number
}
```

### DecisionHistory（历史记录）
```typescript
interface DecisionHistory {
  id: string
  themeId: string
  themeName: string
  optionName: string
  createdAt: number
}
```

## 开发计划

### 已完成 ✅

- [x] Zustand store + 持久化
- [x] 主题管理（创建、编辑、删除）
- [x] 选项管理（添加、编辑、删除、批量添加）
- [x] 轮盘抽奖组件
- [x] 滚动抽奖组件
- [x] 结果展示
- [x] 五彩纸屑效果
- [x] 响应式设计

### 待扩展 🚧

- [ ] 历史记录页面
- [ ] 统计分析（哪个选项被抽中最多）
- [ ] 更多抽奖方式（卡片翻转、摇一摇）
- [ ] 主题模板库
- [ ] 数据导入/导出
- [ ] 分享功能
- [ ] 主题图标自定义
- [ ] 选项拖拽排序

## 访问地址

开发环境：`https://localhost:12345/dowhat`

## 注意事项

- 数据保存在浏览器 LocalStorage，清除浏览器数据会丢失
- 至少需要 2 个选项才能开始抽奖
- 支持权重设置（默认为 1），权重越大被抽中概率越高

