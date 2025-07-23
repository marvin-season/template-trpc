# 创建一个新的临时分支，基于 master
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
NEW_BRANCH="mr-master-$TIMESTAMP"
git checkout -b $NEW_BRANCH master

# 3. 把 dev 分支合并进来
git merge dev
# 如果有冲突，此时手动解决冲突，再执行：
# git add .
# git commit

# 4. 推送到远程
git push origin $NEW_BRANCH

# 或者 GitHub 示例（如果你用的是 GitHub）：
gh pr create --base master --head $NEW_BRANCH --title "Merge dev into master - $TIMESTAMP" --web