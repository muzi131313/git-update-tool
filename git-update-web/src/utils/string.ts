/**
 * @name getRandomString
 * @description get random string
 * @created 2024-11-23 11:36:34
 */
export function getRandomString(number?: number) {
  const random = Math.random();
  const randomStr = `${random}`.substr(2);
  if (number) {
    const randomLen = randomStr.length;
    // doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    const subStrIndex = number <= randomLen ? number : randomLen;
    return randomStr.substring(0, subStrIndex);
  } else {
    return randomStr;
  }
}
