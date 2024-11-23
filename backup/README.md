# git-update

git update tool for many projects

# Usage with gu
## install
```bash
npm i -g gu
```

## touch config.json
```
touch config.json
```

insert array json like below
```json
[
  {
    "path": "/Users/muzi131313/code/test/email-remind",
    "branch": "master",
    "installScript": "yarn",
    "updateScript": "yarn add @manage/login@1.4.0-alpha.20",
    "commit": "feat(app-web): add @manage/login@1.4.0-alpha.20"
  }
]
```

## run
```bash
gu -c config.json
```

# Usage with bash
## config.sh
```bash
# global config
export PACKAGE_NAME="@manage/login"
export PACKAGE_VERSION="0.0.15"

# declare associative array
declare -A projects

# config projects
# updateParam: -s/-D
# updateType: add/install
# packageName: yarn/npm
projects[0]='{
  "path": "/Users/muzi131313/code/test/email-remind",
  "branch": "master",
  "updateParam": "-s",
  "updateType": "add",
  "packageName": "yarn"
}'
# you can change node version in install script, eg: `nvm use 16.15.1 && pnpm -v && pnpm i`
# installScript: yarn/npm install
projects[1]='{
  "path": "/Users/muzi131313/code/test/email-remind",
  "branch": "develop/layer",
  "installScript": "yarn",
  "updateScript": "yarn add @manage/login@1.4.0-alpha.37",
  "commitPrefix": "feat(其它):"
}'
export projects
```

## Install before

```bash
brew install jq
# require bash 4 or above version
brew install bash
# add config below to ~/.bashrc
# export PATH=/usr/local/bin/bash:$PATH
# alias bash=/usr/local/bin/bash
# alias sh=/usr/local/bin/bash
source ~/.zshrc
sudo ln -s $(brew --prefix)/bin/bash /usr/local/bin/bash
# download git-update
git clone git@github.com:muzi131313/git-update-tool.git
```

## Uninstall

del `git-update` folder

## License
MIT
