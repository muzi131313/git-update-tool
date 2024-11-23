#!/bin/bash

# import files
. ./config.sh

bashNvm="source ~/.nvm/nvm.sh;"

bashCExcute() {
  bash -c "$bashNvm $1"
}

# 遍历数组
for key in "${!projects[@]}"; do
  # read value from array
  (echo ${projects[$key]}) | jq -r ".path"
  UP_PATH=$(echo ${projects[$key]} | jq -r ".path")
  UP_BRANCH=$(echo ${projects[$key]} | jq -r ".branch")
  UP_UPDATE_PARAM=$(echo ${projects[$key]} | jq -r ".updateParam")
  UP_UPDATE_TYPE=$(echo ${projects[$key]} | jq -r ".updateType")
  UP_PACKER_NAME=$(echo ${projects[$key]} | jq -r ".packageName")
  UP_INSTALL_SCRIPT=$(echo ${projects[$key]} | jq -r ".installScript")
  UP_UPDATE_SCRIPT=$(echo ${projects[$key]} | jq -r ".updateScript")
  UP_COMMIT_PREFIX=$(echo ${projects[$key]} | jq -r ".commitPrefix")

  # 1.进入到指定目录
  cd $UP_PATH && pwd

  # 2.切换到目标分支
  git status
  git checkout $UP_BRANCH
  # TODO: 有可能会有冲突，需要手动解决
  git pull

  echo "1.add dep"
  # 3.执行更新 lock 命令
  if (test -n "$UP_INSTALL_SCRIPT"); then
    bashCExcute "$UP_INSTALL_SCRIPT"
  else
    bashCExcute "$UP_PACKER_NAME install"
  fi

  echo "1.update package"
  # 4.安装指定版本的 package(eg: yarn install laser-pen@0.0.15 -s)
  if (test -n "$UP_UPDATE_SCRIPT"); then
    bashCExcute "$UP_UPDATE_SCRIPT"
  else
    bashCExcute "$UP_PACKER_NAME $UP_UPDATE_TYPE $PACKAGE_NAME@$PACKAGE_VERSION $UP_UPDATE_PARAM"
  fi

  # 5.提交代码
  git add .
  # dynamic generate commit message
  commitMsg="$UP_COMMIT_PREFIX update $PACKAGE_NAME version to $PACKAGE_VERSION"
  if [[ "$UP_UPDATE_TYPE" == "add" ]]; then
    commitMsg="$UP_COMMIT_PREFIX add $PACKAGE_NAME@$PACKAGE_VERSION"
  fi
  echo "commit msg: $commitMsg"
  bashCExcute "HUSKY_SKIP_HOOKS=1 git commit -m '$commitMsg'"
  git push

done
