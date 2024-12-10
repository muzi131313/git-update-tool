# git-update-tool
git update tool for many projects

## Usage with git update tool
### install
```bash
npm install git-update-tool -g
```
### config `update-version.json`
```json
[
  {
    "path": "/Users/xxx/code/admin",
    "baseBranch": "master",
    "branch": "feature_manage",
    "envScript": "nvm use 14.19.3",
    "installScript": "yarn",
    "updateScript": "yarn add @manage/login@0.0.1-BETA.20",
    "beforeCommit": "git config user.name 'muzi131313' && git config user.email 'muzi131313@163.com'",
    "commit": "feat(other): bump version to @manage/login@0.0.1-BETA.20"
  },
  {
    "path": "/Users/xxx/code/web",
    "baseBranch": "master",
    "branch": "feature_manage",
    "envScript": "nvm use 16.20.2",
    "installScript": "pnpm i",
    "updateScript": "pnpm add @manage/login@0.0.1-BETA.20",
    "beforeCommit": "git config user.name 'muzi131313' && git config user.email 'muzi131313@163.com'",
    "commit": "feat(other): bump version to @manage/login@0.0.1-BETA.20"
  }
]
```

- path: project path(will open the target project by path)
- baseBranch: base branch(create new branch from base branch)
- branch: new branch
- installScript: install script(update dependencies before update version)
- updateScript: update script
- beforeCommit: before commit script
- commit: commit message

### execute
```
gu -c update-version.json
```

## Usage with gu web
### start service
```bash
gu -s
# or
gu --start
```
### set port
```bash
gu -p 3000
# or
gu --port 3000
```
### restart service
```bash
gu -rs
# or
gu --restart
```
### list service
```bash
gu -l
# or
gu --list
```
### stop service
```bash
gu -r
# or
gu --remove
```

### visit web
- [http://localhost:8802](http://localhost:8802)
or
```bash
gu -s -p 3000
```
- [http://localhost:3000](http://localhost:3000)


## develop in git update tool
### start server
```bash
nvm use 18.20.0 && yarn dev:server
```
### start web
```bash
nvm use 18.20.0 && yarn dev:web
```
### visit web

- [http://localhost:8088](http://localhost:8088)
