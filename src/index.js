const Gu = require('./utils/tool.js');
const Bash = require('./bash/index.js');
const Log = require('./utils/log.js');
const { MsgType } = require('./utils/constant.js');

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
    GuEntry.executeBashWithJson(configData);
  },
  /**
   *
   * @param {Array<String>} jsonData json array
   */
  executeBashWithJson: async (jsonData, callback) => {
    if (!jsonData || !jsonData?.length) {
      Log.warn('[gu] json is empty');
      callback && callback({
        type: MsgType.Error,
        data: 'json is empty',
      });
      return;
    }
    for (let i = 0; i < jsonData.length; i++) {
      await Bash.executeBashItem(jsonData[i], callback)
    }
  },
}

module.exports = GuEntry;
