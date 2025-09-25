# VS Code 配置说明

## 自动补全配置

本项目已配置 Tailwind CSS IntelliSense 扩展，支持以下功能：

### 1. 自定义图标自动补全

- 输入 `i-cus--` 会自动提示可用的自定义图标
- 当前可用的图标：`add`
- 使用方法：`<span className="i-cus--add"></span>`

### 2. 标准 Tailwind CSS 类名自动补全

- 支持所有标准 Tailwind CSS 类名
- 支持响应式前缀（sm:, md:, lg:, xl:）
- 支持状态前缀（hover:, focus:, active: 等）

### 3. 扩展功能

- 颜色预览
- 像素值显示
- 类名冲突检测
- 自动排序建议

## 安装的扩展

确保安装以下 VS Code 扩展：

- `bradlc.vscode-tailwindcss` - Tailwind CSS IntelliSense
- `ms-vscode.vscode-typescript-next` - TypeScript 支持
- `esbenp.prettier-vscode` - 代码格式化
- `dbaeumer.vscode-eslint` - ESLint 支持

## 使用方法

1. 在 `className` 属性中输入类名
2. 按 `Ctrl+Space`（或 `Cmd+Space`）触发自动补全
3. 选择建议的类名

## 故障排除

如果自动补全不工作：

1. 确保已安装 Tailwind CSS IntelliSense 扩展
2. 重启 VS Code
3. 检查 `.vscode/settings.json` 文件是否存在
4. 确保项目根目录有正确的 Tailwind CSS 配置
