const Gu = require('./utils/tool.js');
const Bash = require('./bash/index.js');
const Log = require('./utils/log.js');

const GuEntry = {
  /**
   *
   * @param {String} filePath config file path
   */
  readConfig: async (filePath) => {
    const configData = Gu.readFile(filePath);
    if (!configData) {
      Log.warn('[gu] config is null');
      return;
    }
    await GuEntry.executeBashWithJson(configData);
  },
  /**
   *
   * @param {Array<String>} jsonData json array
   */
  async executeBashWithJson(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
      await Bash.executeBashItem(jsonData[i]);
    }
  },
}

module.exports = GuEntry;
