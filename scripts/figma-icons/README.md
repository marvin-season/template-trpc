# 通过 @iconify/tools 引入 Figma 图标

## 引入来源

## Figma 图标规范

### 限制条件

https://iconify.design/docs/libraries/tools/import/figma/#limitations

### 命名规范

- Figma 图标通过 Component 封装，命令为 `cus-` 前缀的节点会被导出为自定义图标
- 默认 `cus-` 前缀的图标支持修改颜色
- 如果图标不支持修改颜色，需要将 `cus-` 前缀的图标放到 Figma Group 中，并命名为 `un-colored`

### 通用图标库

Figma Component 前缀为 `com-`，实现上另行规划。
