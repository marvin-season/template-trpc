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
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface TabsProps extends AntdTabsProps {
  className?: string

  /**
   * 自定义样式变体
   */
  variant?: VariantProps<typeof tabsVariants>['variant']
  /**
   * 自定义标签页尺寸样式（不影响 antd 的 size 属性）
   */
  /**
   * 是否显示指示器
   */
  showIndicator?: boolean
}

const Tabs = React.forwardRef<TabsRef, TabsProps>(
  ({ className, variant, showIndicator = false, ...props }, ref) => {
    return (
      <AntdTabs
        ref={ref}
        indicator={showIndicator ? undefined : { size: 0 }}
        className={cn(styles.tabs, tabsVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Tabs.displayName = 'Tabs'

export { Tabs }
