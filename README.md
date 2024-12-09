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
    "branch": "feature_manage",
    "installScript": "nvm use 16.20.2 && yarn",
    "updateScript": "nvm use 16.20.2 && yarn add @manage/login@0.0.1-BETA.20",
    "commit": "feat(other): bump version to @manage/login@0.0.1-BETA.20"
  },
  {
    "path": "/Users/xxx/code/web",
    "branch": "feature_manage",
    "installScript": "nvm use 16.20.2 && yarn",
    "updateScript": "nvm use 16.20.2 && yarn add @manage/login@0.0.1-BETA.20",
    "commit": "feat(other): bump version to @manage/login@0.0.1-BETA.20"
  }
]
```
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
