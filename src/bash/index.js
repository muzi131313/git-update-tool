const Tool = require('../utils/tool');
const Log = require('../utils/log');
const { JSONKeys, JSONDefault, RequireJSONKeys, MsgType } = require('../utils/constant');

const Bash = {
  invalidateJSON: (json) => {
    return RequireJSONKeys.some((key) => {
      const jsonItem = json[key];
      return jsonItem === undefined || jsonItem === null || jsonItem?.trim() === '';
    });
  },
  executeBashItem: async (json, callback) => {
    if (!json) {
      Log.warn('[bash] json is empty');
      callback && callback({
        type: MsgType.Error,
        data: 'json is empty',
      });
      return;
    }
    const invalidate = Bash.invalidateJSON(json);
    if (invalidate) {
      Log.error('[bash] json is invalidate');
      callback && callback({
        type: MsgType.Error,
        data: 'json is invalidate',
      });
      return;
    }
    Log.log('[bash] execute json: ', json);
    const pathBranchBash = Bash.generateChangePathAndTarget(json);
    await Bash.executeBash(pathBranchBash, callback);
  },
  generateChangePathAndTarget: (json) => {
    const path = json[JSONKeys.path];
    const baseBranch = json[JSONKeys.baseBranch] || JSONDefault.baseBranch;
    const branch = json[JSONKeys.branch];
    const envScript = json[JSONKeys.envScript];
    const installScript = json[JSONKeys.installScript];
    const updateScript = json[JSONKeys.updateScript];
    const beforeCommit = json[JSONKeys.beforeCommit];
    const commit = json[JSONKeys.commit];

    const template = `
    # 1. change to target path
    cd ${path} && pwd
    git status

    # 2. change to target branch
    echo "will execute: git stash && git checkout ${branch}"
    # execute stash to save current changes
    git stash
    # check if branch exists
    if git branch --list | grep -q "target-branch-name"; then
      echo "Branch exists"
      git checkout ${branch}
    else
      echo "Branch does not exist"
      # checkout to base branch
      git checkout ${baseBranch}
      git checkout -b ${branch}
      git push --set-upstream origin ${branch}

    fi
    # pull latest code
    git pull

    # 3. env change(eg: change node version to 16.15.1 when current node version is 14.19.3)
    ${envScript ? `${envScript} && node -v` : ''}

    # 4. install basic dependencies
    ${installScript}

    # 5. update dependencies
    ${updateScript}

    # 6.1 before commit

    # 6.2 add commit msg and push to remote branch
    ${beforeCommit ? `${beforeCommit} && ` : ''}git add .
    ${beforeCommit ? `${beforeCommit} && ` : ''}HUSKY_SKIP_HOOKS=1 git commit -m "${commit}"
    git push
    `;
    return template;
  },
  executeBash: async (bashString, callback) => {
    const bash = `
    # load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo "nvm: " && nvm --version;

    ${bashString}
    `
    try {
      Log.log('[bash] bash: ', bash)
      await Tool.execCommand(bash, callback);
    } catch (e) {
      Log.error('[bash] error: ', e);
    }
  },
}

module.exports = Bash;
