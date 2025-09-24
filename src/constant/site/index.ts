import { template, banana, flow, doc, writer, type SiteData } from './data'

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
    name: 'template',
    path: 'template',
    hidden: true,
    data: template,
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
