import type { NavigationConfig } from '@/types/navigation'

export const navigation: NavigationConfig = {
  items: [
    {
      id: 'dashboard',
      title: '控制台',
      href: '',
    },
    {
      id: 'ai-tools',
      title: 'AI 工具',
      items: [
        {
          id: 'chat',
          title: '智能对话',
          href: '/chat',
          description: 'AI 智能对话助手',
        },
        {
          id: 'analysis',
          title: '数据分析',
          href: '/analysis',
          description: '智能数据分析工具',
        },
        {
          id: 'generator',
          title: '内容生成',
          href: '/generator',
          description: 'AI 内容生成器',
        },
      ],
    },
    {
      id: 'models',
      title: '模型管理',
      items: [
        {
          id: 'model-library',
          title: '模型库',
          href: '/models/library',
          description: '浏览可用的 AI 模型',
        },
        {
          id: 'custom-models',
          title: '自定义模型',
          href: '/models/custom',
          description: '管理自定义训练的模型',
        },
      ],
    },
    {
      id: 'settings',
      title: '设置',
      href: '/settings',
    },
  ],
}
