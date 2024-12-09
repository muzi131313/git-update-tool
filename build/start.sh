#!/bin/bash

port=$1

if [ -z "$port" ]; then
  port=8802
fi

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 18.20.0
# 确认 Node.js 版本
node -v

server_name="git-update-server"

# create folder
current_dir=$(pwd)
logPath=$current_dir/server/logs
if [ ! -d "$logPath" ]; then
  mkdir $logPath
fi

echo "log path: $logPath"

# 定义函数
create_file_if_not_exists() {
  local file_path="$1" # 接收文件路径作为参数

  # 检查文件是否存在
  if [ -e "$file_path" ]; then
    echo "文件 '$file_path' 已经存在。"
  else
    # 如果文件不存在，则创建文件
    touch "$file_path"
    echo "文件 '$file_path' 已创建。"
  fi
}


log_file="$logPath/$server_name.log"
out_file="$logPath/$server_name.out"
err_file="$logPath/$server_name.err"

create_file_if_not_exists "$log_file"
create_file_if_not_exists "$out_file"
create_file_if_not_exists "$err_file"

# enter server directory
cd ./server
yarn
# 使用 forever 启动应用，传递动态路径
PORT=$port npx forever start --append -l "$log_file" -o "$out_file" -e "$err_file" --uid "$server_name" src/index.js

echo "Server started, please visit http://localhost:$port"
