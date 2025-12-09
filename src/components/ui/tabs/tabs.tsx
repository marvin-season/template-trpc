'use client'

import * as React from 'react'
import {
  Tabs as AntdTabs,
  ConfigProvider,
  type TabsProps as AntdTabsProps,
} from 'antd'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ThemeConfig } from 'antd'
import type { TabsRef } from 'antd/es/tabs'
import styles from './index.module.css'

const tabsVariants = cva('', {
  variants: {
    variant: {
      'default': '',
      'rounded-card': `
        ${styles.tabs}
      `,
    },
    tabSize: {
      small: `
        [&_.ant-tabs-tab]:!py-1.5
        [&_.ant-tabs-tab-btn]:!text-sm
      `,
      large: `
        [&_.ant-tabs-tab]:!py-3
        [&_.ant-tabs-tab-btn]:!text-base
      `,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CustomTabsProps
  extends Omit<AntdTabsProps, 'className' | 'style'> {
  className?: string
  style?: React.CSSProperties
  /**
   * 自定义样式变体
   */
  variant?: VariantProps<typeof tabsVariants>['variant']
  /**
   * 自定义标签页尺寸样式（不影响 antd 的 size 属性）
   */
  tabSize?: VariantProps<typeof tabsVariants>['tabSize']

  /**
   * 自定义主题配置，会与默认主题合并
   */
  theme?: ThemeConfig
  /**
   * 是否使用自定义样式
   */
  useCustomStyles?: boolean
}

const CustomTabs = React.forwardRef<TabsRef, CustomTabsProps>(
  (
    {
      className,
      style,
      variant,
      tabSize,
      theme,
      useCustomStyles = true,
      ...props
    },
    ref,
  ) => {
    // 默认主题配置
    const defaultTheme: ThemeConfig = {
      components: {
        Tabs: {
          itemActiveColor: 'var(--color-primary)',
          itemHoverColor: 'var(--color-primary)',
          itemSelectedColor: 'var(--color-primary)',
          inkBarColor: 'var(--color-primary)',
          cardBg: 'var(--color-card)',
          cardGutter: 8,
          horizontalMargin: '0 0 16px 0',
          ...(theme?.components?.Tabs || {}),
        },
      },
    }

    // 合并用户提供的主题配置
    const mergedTheme: ThemeConfig | undefined = useCustomStyles
      ? {
          ...defaultTheme,
          ...theme,
          components: {
            ...defaultTheme.components,
            ...theme?.components,
            Tabs: {
              ...defaultTheme.components?.Tabs,
              ...theme?.components?.Tabs,
            },
          },
        }
      : theme

    return (
      <ConfigProvider theme={mergedTheme}>
        <AntdTabs
          ref={ref}
          className={cn(tabsVariants({ variant, tabSize }), className)}
          style={style}
          {...props}
        />
      </ConfigProvider>
    )
  },
)

CustomTabs.displayName = 'CustomTabs'

// 导出 TabPane 类型（antd 5.x 中已废弃，但为了兼容性保留）
export const TabPane = AntdTabs.TabPane

export { CustomTabs, CustomTabs as Tabs }
