'use client'

import React from 'react'
import { ZodForm } from '@/app/_components/ZodForm'
import { z } from 'zod'

// 演示各种默认值的 schema
const demoSchema = z.object({
  // 字符串类型 - 有默认值
  username: z.string().min(3, '用户名至少3个字符').default('guest_user'),

  // Email - 无默认值
  email: z.string().email('请输入有效的邮箱地址').default('test@gmail.com'),

  // 数字 - 有默认值
  age: z.number().min(18, '年龄必须大于18岁').default(25),

  // 布尔值 - 有默认值
  isActive: z.boolean().default(true),

  // 枚举 - 有默认值
  role: z.enum(['admin', 'user', 'guest']).default('user'),

  // 可选字段 - 无默认值
  website: z
    .string()
    .url('请输入有效的网址')
    .optional()
    .default('https://test.cn'),

  // 可选字段 - 有默认值
  bio: z
    .string()
    .max(200, '简介最多200个字符')
    .optional()
    .default('这是我的个人简介'),

  // 布尔值 - 订阅选项，默认为 false
  newsletter: z.boolean().default(false),

  // 数字 - 评分，默认为 5
  rating: z.number().min(1).max(10).default(5),
})

const contactSchema = z.object({
  firstName: z.string().min(1, '名字不能为空'),
  lastName: z.string().min(1, '姓氏不能为空'),
  email: z.string().email('请输入有效的邮箱'),
  phone: z.string().min(10, '电话号码至少10位').optional(),
  message: z.string().min(10, '消息至少10个字符').max(500, '消息最多500个字符'),
  subscribe: z.boolean().default(false),
})

export default function Page() {
  const handleDemoSubmit = (data: z.infer<typeof demoSchema>) => {
    console.log('演示表单提交:', data)
    alert('提交成功！查看控制台了解详情\n\n' + JSON.stringify(data, null, 2))
  }

  const handleContactSubmit = async (data: z.infer<typeof contactSchema>) => {
    console.log('联系表单提交:', data)
    // 模拟异步提交
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert('联系表单提交成功！查看控制台了解详情')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8'>
      <div className='mx-auto max-w-6xl space-y-12'>
        {/* 页面标题 */}
        <div className='text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900'>
            ZodForm 自动表单生成组件
          </h1>
          <p className='text-lg text-gray-600'>
            基于 Zod Schema 自动生成表单，支持完整的验证功能
          </p>
        </div>

        {/* 功能特性 */}
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold text-gray-800'>
            ✨ 核心特性
          </h2>
          <ul
            className={`
              grid grid-cols-1 gap-3 text-gray-700
              md:grid-cols-2
            `}
          >
            <li className='flex items-start'>
              <span className='mr-2 text-green-500'>✓</span>
              <span>
                <strong>自动默认值：</strong>直接从 Zod Schema 中的{' '}
                <code>.default()</code> 获取
              </span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-green-500'>✓</span>
              <span>
                <strong>类型自动识别：</strong>string, number, boolean, date,
                enum
              </span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-green-500'>✓</span>
              <span>
                <strong>完整验证：</strong>min, max, email, url 等全部规则
              </span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2 text-green-500'>✓</span>
              <span>
                <strong>原生实现：</strong>无额外依赖，仅使用 Zod 和原生 Form
              </span>
            </li>
          </ul>
        </div>

        {/* 默认值演示表单 */}
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-2 text-2xl font-semibold text-gray-800'>
            🎯 默认值演示
          </h2>
          <p className='mb-6 text-gray-600'>
            所有字段的默认值都直接从 Zod Schema 中获取，无需手动指定
            <code className='ml-2 rounded bg-gray-100 px-2 py-1 text-sm'>
              .default()
            </code>
          </p>

          <div className='mb-6 rounded-lg bg-blue-50 p-4'>
            <h3 className='mb-2 font-semibold text-blue-900'>
              💡 注意查看表单的初始值
            </h3>
            <ul className='space-y-1 text-sm text-blue-800'>
              <li>• username 默认值：guest_user</li>
              <li>• age 默认值：25</li>
              <li>• isActive 默认值：true（勾选状态）</li>
              <li>• role 默认值：user</li>
              <li>• bio 默认值：这是我的个人简介</li>
              <li>• newsletter 默认值：false</li>
              <li>• rating 默认值：5</li>
            </ul>
          </div>

          <ZodForm
            schema={demoSchema}
            onSubmit={handleDemoSubmit}
            submitText='查看效果（打开控制台）'
            fieldClassName='mb-4'
          />
        </div>

        {/* 联系表单 */}
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-2 text-2xl font-semibold text-gray-800'>
            📧 联系表单示例
          </h2>
          <p className='mb-6 text-gray-600'>
            演示异步提交和复杂验证规则（subscribe 字段有默认值 false）
          </p>
          <div className='max-w-2xl'>
            <ZodForm
              schema={contactSchema}
              onSubmit={handleContactSubmit}
              submitText='发送消息'
              fieldClassName='mb-4'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
