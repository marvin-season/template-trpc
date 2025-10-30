# FCM 通知中心

一个功能完整的 Firebase Cloud Messaging (FCM) 通知中心组件。

## 功能特性

### 📱 展现形式
- 最大高度 600px，内容超出后内部滚动
- 支持响应式设计

### 🎯 批量操作
- **一键已读**：点击后，所有未读消息变为已读状态
- **删除所有通知**：点击后弹出二次确认弹窗，删除所有通知

### 📬 通知类型与交互
- 点击后，红色圆点消失（标记为已读）
- **任务通知**：
  - 任务完成 / 失败 / 异常暂停：点击后跳转至对应对话页面
  - 下载完成：仅提示，不关联 URL
- **系统通知**（迭代）：
  - 活动信息：点击后弹出活动信息窗口
  - 版本更新：点击后弹出版本更新信息窗口

### 🗂️ 通知列表项
- **标题**：简明扼要地说明事件（如"AI绘画任务已完成"）
- **描述**：更具体的信息（如"您的作品「赛博朋克城市夜景」已成功生成，点击查看。"）
- **时间戳**：相对时间显示（如"5分钟前"、"昨天 14:30"）
- **未读标识**：红色圆点 + 背景高亮

### 💾 留存策略
- **未读通知**：永久保留
- **已读通知**：保留 7 天（7 天后自动删除）

## 文件结构

```
FCM/
├── _components/          # 组件
│   ├── NotificationPanel.tsx    # 主通知面板
│   ├── NotificationItem.tsx     # 通知项组件
│   └── EmptyState.tsx           # 空状态组件
├── _hooks/               # Hooks
│   └── useNotificationManager.ts # 通知管理 Hook
├── _types.ts             # 类型定义
├── _utils.ts             # 工具函数
├── index.tsx             # 主页面
└── README.md             # 本文档
```

## 数据结构

### EnhancedNotification
```typescript
interface EnhancedNotification extends MessagePayload {
  meta: NotificationMeta
}

interface NotificationMeta {
  notificationType: NotificationType  // 'task' | 'system'
  subType: TaskNotificationType | SystemNotificationType
  readAt?: number                     // 已读时间戳
  createdAt: number                   // 创建时间戳
  conversationId?: string             // 对话ID（任务通知）
  url?: string                        // 跳转URL
}
```

### MessagePayload 参考
```typescript
interface MessagePayload {
  notification?: {
    title?: string
    body?: string
    image?: string
    icon?: string
  }
  data?: { [key: string]: string }
  fcmOptions?: { link?: string; analyticsLabel?: string }
  from: string
  collapseKey: string
  messageId: string
}
```

## 使用方式

### 基本用法
```tsx
import NotificationPanel from '@/app/test/FCM/_components/NotificationPanel'

function MyApp() {
  return (
    <div>
      <NotificationPanel />
    </div>
  )
}
```

### 发送测试通知
在 FCM 控制台发送通知时，需要在 `data` 字段中包含以下信息：

```json
{
  "notification": {
    "title": "AI绘画任务已完成",
    "body": "您的作品「赛博朋克城市夜景」已成功生成，点击查看。"
  },
  "data": {
    "notificationType": "task",
    "subType": "completed",
    "conversationId": "conv-123"
  }
}
```

## 自定义配置

### 修改留存时长
在 `_hooks/useNotificationManager.ts` 中修改：

```typescript
const READ_RETENTION_DAYS = 7 // 改为你想要的天数
```

### 添加新的通知类型
1. 在 `_types.ts` 中添加新的枚举值
2. 在 `_utils.ts` 中添加对应的状态颜色和文本映射
3. 在 `NotificationItem.tsx` 中更新样式逻辑

## 待实现功能（迭代）

- [ ] 系统通知的详细信息弹窗
- [ ] 通知点击跳转功能
- [ ] 更多通知类型支持
- [ ] 通知声音和震动
- [ ] 通知持久化到服务器

## 技术栈

- React 18
- TypeScript
- Firebase Cloud Messaging
- Radix UI (Dialog)
- Tailwind CSS
- Lucide React (图标)
