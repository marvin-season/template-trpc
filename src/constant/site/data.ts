import type { SiteData } from '.'
const apple: SiteData = {
  id: 'apple',
  name: 'Apple AI',
  description:
    '简洁优雅的侧边栏设计，专注于高效的 AI 工具集成。提供智能对话、数据分析、模型管理等核心功能。',
  icon: '🍎',
  iconBgClass: 'bg-gradient-to-r from-gray-100 to-slate-100',
  features: [
    { text: '侧边栏布局，可展开收起', color: 'bg-green-400' },
    { text: 'Clean & Minimalist Design', color: 'bg-blue-400' },
    { text: '专业级 AI 工具套件', color: 'bg-purple-400' },
  ],
  buttonClass: 'bg-slate-800 text-white',
  buttonHoverClass:
    'group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-700 hover:bg-slate-900',
  href: 'apple.ai',
}

const banana: SiteData = {
  id: 'banana',
  name: 'Banana AI',
  description:
    '活力四射的顶部导航设计，注重用户交互体验。集成丰富的 AI 功能模块，让创作更有趣。',
  icon: '🍌',
  iconBgClass: 'bg-gradient-to-r from-yellow-100 to-orange-100',
  features: [
    { text: '顶部导航栏，下拉菜单', color: 'bg-yellow-400' },
    { text: 'Vibrant & Interactive UI', color: 'bg-orange-400' },
    { text: '创意驱动的 AI 平台', color: 'bg-red-400' },
  ],
  buttonClass: 'bg-yellow-500 text-white',
  buttonHoverClass:
    'group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-orange-500 hover:bg-yellow-600',
  href: 'banana.ai',
}

const flow: SiteData = {
  id: 'flow',
  name: 'Flow AI',
  description: '基于 Flow 的 AI 平台，提供丰富的 AI 功能模块，让创作更有趣。',
  icon: '🌊',
  iconBgClass: 'bg-gradient-to-r from-blue-100 to-cyan-100',
  features: [
    { text: '基于 Flow 的 AI 平台', color: 'bg-blue-400' },
    { text: '可视化工作流设计', color: 'bg-cyan-400' },
    { text: '丰富的 AI 功能模块', color: 'bg-indigo-400' },
  ],
  buttonClass: 'bg-blue-500 text-white',
  buttonHoverClass:
    'group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 hover:bg-blue-600',
  href: 'flow.ai',
}

const doc: SiteData = {
  id: 'doc',
  name: 'Doc AI',
  description:
    '专业的文档处理 AI 平台，支持智能文档分析、格式转换、内容提取等功能，让文档处理更高效。',
  icon: '📄',
  iconBgClass: 'bg-gradient-to-r from-emerald-100 to-teal-100',
  features: [
    { text: '智能文档分析处理', color: 'bg-emerald-400' },
    { text: '多格式文档转换', color: 'bg-teal-400' },
    { text: '内容提取与总结', color: 'bg-green-400' },
  ],
  buttonClass: 'bg-emerald-500 text-white',
  buttonHoverClass:
    'group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 hover:bg-emerald-600',
  href: 'doc.ai',
}

const writer: SiteData = {
  id: 'writer',
  name: 'Writer AI',
  description:
    '智能写作助手平台，提供文案创作、内容优化、多语言翻译等功能，让写作更高效更有创意。',
  icon: '✍️',
  iconBgClass: 'bg-gradient-to-r from-purple-100 to-pink-100',
  features: [
    { text: '智能文案创作助手', color: 'bg-purple-400' },
    { text: '内容优化与润色', color: 'bg-pink-400' },
    { text: '多语言翻译支持', color: 'bg-violet-400' },
  ],
  buttonClass: 'bg-purple-500 text-white',
  buttonHoverClass:
    'group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 hover:bg-purple-600',
  href: 'writer.ai',
}

export { apple, banana, flow, doc, writer }
