#!/bin/bash

set -e

# 1. 创建一个新的临时分支，基于 main
TIMESTAMP=$(date +%Y%m%d%H%M%S)
NEW_BRANCH="mr-main-$TIMESTAMP"


git checkout -b $NEW_BRANCH

# 3. 推送到远程
git push origin $NEW_BRANCH

# 4. 使用 GitHub CLI 创建 PR（浏览器交互 or 命令行交互）
gh pr create --base main --head $NEW_BRANCH --title "Merge dev into main - $TIMESTAMP"

# 5. 返回原分支
git checkout -

# 6. 提示手动删除命令（不要自动删）
echo ""
echo "👉 如 PR 合并后可手动删除临时分支："
echo "   git push origin --delete $NEW_BRANCH"