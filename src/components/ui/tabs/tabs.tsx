'use client'

import { Tabs as AntdTabs, type TabsProps as AntdTabsProps } from 'antd'
import { type VariantProps, cva } from 'class-variance-authority'
import { ConfigProvider } from 'antd'

import styles from './index.module.css'
import { cn } from '@/lib/utils'

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
        [&_.ant-tabs-tab-btn]:!text-xs
      `,
      default: `
        [&_.ant-tabs-tab]:!px-3 [&_.ant-tabs-tab]:!py-1.25
        [&_.ant-tabs-tab-btn]:!text-sm
      `,
      large: `
        [&_.ant-tabs-tab]:!px-4 [&_.ant-tabs-tab]:!py-1.5
        [&_.ant-tabs-tab-btn]:!text-base
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
  showIndicator?: boolean
}

const themeMap = {
  outline: {
    itemSelectedColor: 'var(--f-foreground)',
    itemHoverColor: 'var(--f-foreground)',
    itemActiveColor: 'var(--f-text-light)',
    itemColor: 'var(--f-secondary-foreground)',
  },
  default: {},
  primary: {
    itemSelectedColor: 'var(--f-text-light)',
    itemHoverColor: 'var(--f-primary)',
    itemActiveColor: 'var(--f-text-light)',
    itemColor: 'var(--f-secondary-foreground)',
  },
}

function Tabs({
  className,
  variant,
  size,
  showIndicator = false,
  ...props
}: TabsProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: themeMap[variant || 'default'],
        },
      }}
    >
      <AntdTabs
        indicator={showIndicator ? undefined : { size: 0 }}
        className={cn(`
          ${styles.tabs}
          ${tabsVariants({ variant, size })}
          ${className}
        `)}
        {...props}
      />
    </ConfigProvider>
  )
}

Tabs.displayName = 'Tabs'

export { Tabs }
