import { apple, banana, flow, doc, writer } from './data'

export interface SiteData {
  id: string
  name: string
  description: string
  icon: string
  iconBgClass: string
  features: Array<{
    text: string
    color: string
  }>
  buttonClass: string
  buttonHoverClass: string
  href: string
}

export interface Site {
  data?: SiteData
  path: string
  name: string
  hidden?: boolean
}

export const sites: Site[] = [
  {
    path: '',
    name: 'home',
  },
  {
    name: 'apple',
    path: 'apple.ai',
    hidden: true,
    data: apple,
  },
  {
    name: 'banana',
    path: 'banana.ai',
    hidden: true,
    data: banana,
  },
  {
    name: 'flow',
    path: 'flow.ai',
    data: flow,
  },
  {
    name: 'doc',
    path: 'doc.ai',
    data: doc,
  },
  {
    name: 'writer',
    path: 'writer.ai',
    data: writer,
  },
]
