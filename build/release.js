const fs = require('fs')
const { execSync } = require('child_process')
const semver = require('semver')

function cmd(command) {
  try {
    const output = execSync(command)
    return output.toString()
  }
  catch (error) {
    return ''
  }
}

function getVersion() {
  try {
    const tag = cmd('git describe --tags')
      .split('-')
      .filter(Boolean)[0];
    if (tag && semver.valid(tag)) {
      return tag.slice(1).replace('\n', '')
    }

    return ''
  }
  catch (error) {
    return ''
  }
}

const packageInfo = JSON.parse(fs.readFileSync('package.json'))
const version = getVersion()
if (version && version !== packageInfo.version) {
  packageInfo.version = version
  fs.writeFileSync('package.json', JSON.stringify(packageInfo, null, 2) + '\r')
}
