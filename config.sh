#!/bin/bash

# global config
# updateParam: -s/-D
# updateType: add/install
# projects[0]='{
#   "path":"/Users/muzi131313/code/test/email-remind",
#   "branch":"master",
#   "updateParam":"-s",
#   "updateType":"add",
#   "packageName":"yarn"
# }'

# ===== test/hello =====

# export PACKAGE_NAME="@test/hello"
# export PACKAGE_VERSION="1.1.0-alpha.82"

# # declare associative array
# declare -A projects

# projects[0]='{
#   "path": "/Users/muzi131313/code/test/test_entry",
#   "branch": "develop/11",
#   "installScript": "lerna bootstrap",
#   "updateScript": "lerna add @test/hello@1.1.0-alpha.82 --scope=@manage/login",
#   "commitPrefix": "feat(other):"
# }'
# projects[1]='{
#   "path": "/Users/muzi131313/code/test/test_official",
#   "branch": "develop/11",
#   "installScript": "yarn",
#   "updateScript": "yarn add @test/hello@1.1.0-alpha.82",
#   "commitPrefix": "feat(other):"
# }'
# projects[2]='{
#   "path": "/Users/muzi131313/code/test/test-list",
#   "branch": "develop/11",
#   "installScript": "nvm use 16.15.1 && pnpm -v && pnpm i",
#   "updateScript": "nvm use 16.15.1 && pnpm add @test/hello@1.1.0-alpha.82",
#   "commitPrefix": "feat(other):"
# }'
# export projects



# ===== @manage/login =====
export PACKAGE_NAME="@manage/login"
export PACKAGE_VERSION="1.4.0-alpha.78"

# declare associative array
declare -A projects

projects[0]='{
  "path": "/Users/muzi131313/code/test/test_entry",
  "branch": "feature_login",
  "installScript": "lerna bootstrap",
  "updateScript": "lerna add @manage/login@1.4.0-alpha.78 --scope=@board/feat-project-entry",
  "commitPrefix": "feat(other):"
}'
projects[1]='{
  "path": "/Users/muzi131313/code/test/test-list",
  "branch": "feature_login",
  "installScript": "nvm use 16.15.1 && pnpm -v && pnpm i",
  "updateScript": "nvm use 16.15.1 && pnpm add @manage/login@1.4.0-alpha.78",
  "commitPrefix": "feat(other):"
}'
projects[2]='{
  "path": "/Users/muzi131313/code/test/test_official",
  "branch": "feature_login",
  "installScript": "yarn",
  "updateScript": "yarn add @manage/login@1.4.0-alpha.78",
  "commitPrefix": "feat(other):"
}'
projects[3]='{
  "path": "/Users/muzi131313/code/test/test-order",
  "branch": "feature_login",
  "installScript": "npm i",
  "updateScript": "npm add @manage/login@1.4.0-alpha.78",
  "commitPrefix": "feat(other):"
}'
export projects
