const MsgType = {
  Log: 'stdout',
  Error: 'stderr',
  Close: 'close',
}

const JSONKeys = {
  path: 'path',
  baseBranch: 'baseBranch',
  branch: 'branch',
  envScript: 'envScript',
  installScript: 'installScript',
  updateScript: 'updateScript',
  beforeCommit: 'beforeCommit',
  commit: 'commit',
}

const JSONDefault = {
  baseBranch: 'master',
  envScript: '',
  installScript: '',
  updateScript: '',
  beforeCommit: '',
}

const RequireJSONKeys = [
  JSONKeys.path,
  JSONKeys.branch,
  JSONKeys.installScript,
  JSONKeys.updateScript,
  JSONKeys.commit,
]
module.exports = {
  MsgType,
  JSONKeys,
  JSONDefault,
  RequireJSONKeys,
}
