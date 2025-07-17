#!/bin/bash
docker run -it --rm \
  -v "$PWD":/app \
  -w /app \
  -p 3000:12345 \
  --entrypoint sh \
  --name node-app \
  node:22-alpine


# 这条命令会以交互方式启动一个 Node.js 22 Alpine 镜像的容器，并将你的当前项目挂载进去，同时开放端口，适合在本地开发和调试 Node.js 应用。
# docker run
# 启动容器命令
# -it
# 启用交互式终端（方便你输入命令）
# --rm
# 容器退出后自动删除，不保留残留
# -v "$PWD":/app
# 将当前主机目录挂载到容器的 /app 目录
# -w /app
# 设置容器的工作目录为 /app
# -p 6666:3000
# 将主机端口 6666 映射到容器端口 3000，让你能通过 localhost:6666 访问容器服务
# node:22-alpine
# 使用 Node.js 22 的 Alpine 轻量镜像
