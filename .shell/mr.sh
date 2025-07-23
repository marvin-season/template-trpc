# 创建一个新的临时分支，基于 main
TIMESTAMP=$(date +%Y%m%d%H%M%S)
NEW_BRANCH="mr-main-$TIMESTAMP"
git checkout -b $NEW_BRANCH

# 4. 推送到远程
git push origin $NEW_BRANCH

# 或者 GitHub 示例（如果你用的是 GitHub）：
gh pr create --base main --head $NEW_BRANCH --title "Merge dev into main - $TIMESTAMP"

# 回到当前分支
git checkout -

git push origin --delete $NEW_BRANCH
