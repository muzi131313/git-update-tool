const MsgType = {
  Log: 'stdout',
  Error: 'stderr',
  Close: 'close',
}

const JSONKeys = {
  path: 'path',
  branch: 'branch',
  envScript: 'envScript',
  installScript: 'installScript',
  updateScript: 'updateScript',
  beforeCommit: 'beforeCommit',
  commit: 'commit',
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
  RequireJSONKeys,
}
