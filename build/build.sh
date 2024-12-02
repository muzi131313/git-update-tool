#!/bin/bash

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 18.20.0
# 确认 Node.js 版本
node -v

pwd

echo "build web start"
cd ./git-update-web
yarn
yarn build
cd ../
echo "build web end"

pwd

echo "build server start"
cp -Rf ./git-update-web/dist/ ./server/dist
echo "build server end"
