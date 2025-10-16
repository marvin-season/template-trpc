import type { DecisionTheme } from '../_types'

export const THEME_TEMPLATES: Omit<
  DecisionTheme,
  'id' | 'createdAt' | 'updatedAt'
>[] = [
  {
    name: '今天吃什么？🍜',
    description: '选择困难症的终极难题！',
    icon: '🍜',
    options: [
      { id: 'opt-1', name: '🔥 火锅', weight: 1, order: 0 },
      { id: 'opt-2', name: '🌶️ 麻辣烫', weight: 1, order: 1 },
      { id: 'opt-3', name: '🥩 烤肉', weight: 1, order: 2 },
      { id: 'opt-4', name: '🍣 寿司', weight: 1, order: 3 },
      { id: 'opt-5', name: '🍕 披萨', weight: 1, order: 4 },
      { id: 'opt-6', name: '🍜 拉面', weight: 1, order: 5 },
      { id: 'opt-7', name: '🥗 轻食沙拉', weight: 1, order: 6 },
      { id: 'opt-8', name: '🍔 汉堡', weight: 1, order: 7 },
    ],
  },
  {
    name: '周末去哪玩？🎮',
    description: '让随机决定你的周末时光！',
    icon: '🎮',
    options: [
      { id: 'opt-1', name: '🎬 看电影', weight: 1, order: 0 },
      { id: 'opt-2', name: '🎮 打游戏', weight: 1, order: 1 },
      { id: 'opt-3', name: '📚 逛书店', weight: 1, order: 2 },
      { id: 'opt-4', name: '🏃 健身运动', weight: 1, order: 3 },
      { id: 'opt-5', name: '🛍️ 逛街购物', weight: 1, order: 4 },
      { id: 'opt-6', name: '🌳 公园散步', weight: 1, order: 5 },
      { id: 'opt-7', name: '☕ 咖啡厅发呆', weight: 1, order: 6 },
      { id: 'opt-8', name: '🏠 在家躺平', weight: 1, order: 7 },
    ],
  },
  {
    name: '今晚看什么电影？🎬',
    description: '挑花眼了？让命运来决定！',
    icon: '🎬',
    options: [
      { id: 'opt-1', name: '😂 喜剧片', weight: 1, order: 0 },
      { id: 'opt-2', name: '💥 动作片', weight: 1, order: 1 },
      { id: 'opt-3', name: '🧠 科幻片', weight: 1, order: 2 },
      { id: 'opt-4', name: '😱 恐怖片', weight: 1, order: 3 },
      { id: 'opt-5', name: '💕 爱情片', weight: 1, order: 4 },
      { id: 'opt-6', name: '🕵️ 悬疑片', weight: 1, order: 5 },
    ],
  },
  {
    name: '下班后做什么？💼',
    description: '充实你的业余时光！',
    icon: '💼',
    options: [
      { id: 'opt-1', name: '📖 看书学习', weight: 1, order: 0 },
      { id: 'opt-2', name: '🎨 画画涂鸦', weight: 1, order: 1 },
      { id: 'opt-3', name: '🎵 听音乐放松', weight: 1, order: 2 },
      { id: 'opt-4', name: '👫 约朋友聊天', weight: 1, order: 3 },
      { id: 'opt-5', name: '🏃 去健身房', weight: 1, order: 4 },
      { id: 'opt-6', name: '🛋️ 追剧躺平', weight: 1, order: 5 },
    ],
  },
  {
    name: '喝什么饮料？☕',
    description: '为你的一天加点甜！',
    icon: '☕',
    options: [
      { id: 'opt-1', name: '☕ 美式咖啡', weight: 1, order: 0 },
      { id: 'opt-2', name: '🥤 拿铁', weight: 1, order: 1 },
      { id: 'opt-3', name: '🧋 奶茶', weight: 1, order: 2 },
      { id: 'opt-4', name: '🍵 绿茶', weight: 1, order: 3 },
      { id: 'opt-5', name: '🥛 鲜榨果汁', weight: 1, order: 4 },
      { id: 'opt-6', name: '💧 矿泉水', weight: 1, order: 5 },
    ],
  },
]

export const getRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * THEME_TEMPLATES.length)
  return THEME_TEMPLATES[randomIndex]
}

export const getAllTemplates = () => {
  return THEME_TEMPLATES
}
