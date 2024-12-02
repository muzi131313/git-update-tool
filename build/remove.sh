#!/bin/bash

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 18.20.0
# 确认 Node.js 版本
node -v

server_name="git-update-server"

# enter server directory
cd ./server
yarn
npx forever stop "$server_name"
