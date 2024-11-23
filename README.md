# git-update-tool
git update tool for many projects

## Usage with gu
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
