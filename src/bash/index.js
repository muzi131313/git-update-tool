const Tool = require('../utils/tool');
const Log = require('../utils/log');

const Bash = {
  executeBashItem: (json) => {
    Log.log('[debug] json: ', json);
    if (!json) {
      console.warn('[bash] json is null');
      return '';
    }
    const pathBranchBash = Bash.generateChangePathAndTarget(json);
    Bash.executeBash(pathBranchBash);
  },
  generateChangePathAndTarget: (json) => {
    const { path, branch, envScript, installScript, updateScript, commit } = json;
    const template = `
    # 1. change to target path
    cd ${path} && pwd
    git status

    # 2. change to target branch
    echo "will execute: git stash && git checkout ${branch}"
    git stash
    git checkout ${branch}
    git pull

    # 3. env change(eg: change node version to 16.15.1 when current node version is 14.19.3)
    ${envScript ? `${envScript} && node -v` : ''}

    # 4. install basic dependencies
    ${installScript}

    # 5. update dependencies
    ${updateScript}

    # 6. add commit msg and push to remote branch
    git add .
    HUSKY_SKIP_HOOKS=1 git commit -m "${commit}"
    git push
    `;
    return template;
  },
  executeBash: (bashString) => {
    const bash = `
    # support nvm
    source ~/.nvm/nvm.sh;
    echo "nvm: " && nvm --version;

    ${bashString}
    `
    try {
      Log.log('[bash] bash: ', bash)
      Tool.execCommand(bash);
    } catch (e) {
      Log.error('[bash] error: ', e);
    }
  },
}

module.exports = Bash;
