'use client'

import * as React from 'react'
import { Tabs as AntdTabs, type TabsProps as AntdTabsProps } from 'antd'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { TabsRef } from 'antd/es/tabs'
import styles from './index.module.css'

const tabsVariants = cva('', {
  variants: {
    variant: {
      default: '',
      outline: styles.outline,
      primary: styles.primary,
    },
    size: {
      small: `
        [&_.ant-tabs-tab]:!px-2 [&_.ant-tabs-tab]:!py-1
        [&_.ant-tabs-tab-btn]:!text-sm
      `,
      default: `
        [&_.ant-tabs-tab]:!px-3 [&_.ant-tabs-tab]:!py-1.5
        [&_.ant-tabs-tab-btn]:!text-base
      `,
      large: `
        [&_.ant-tabs-tab]:!px-4 [&_.ant-tabs-tab]:!py-2
        [&_.ant-tabs-tab-btn]:!text-lg
      `,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface TabsProps extends Omit<AntdTabsProps, 'className' | 'size'> {
  className?: string

  /**
   * 自定义样式变体
   */
  variant?: VariantProps<typeof tabsVariants>['variant']
  /**
   * 自定义标签页尺寸样式（不影响 antd 的 size 属性）
   */
  size?: VariantProps<typeof tabsVariants>['size']

  /**
   * 是否显示指示器
   */
  hideIndicator?: boolean
}

const Tabs = React.forwardRef<TabsRef, TabsProps>(
  ({ className, variant, size, hideIndicator = true, ...props }, ref) => {
    return (
      <AntdTabs
        ref={ref}
        className={cn(
          hideIndicator && '[&_.ant-tabs-ink-bar]:!hidden',
          styles.tabs,
          tabsVariants({ variant, size }),
          className,
        )}
        {...props}
      />
    )
  },
)

Tabs.displayName = 'Tabs'

export { Tabs }
