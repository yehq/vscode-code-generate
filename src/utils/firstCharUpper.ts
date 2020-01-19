/**
 * 首字母大写
 * @param {string} str
 */
function firstCharUpper(str: string) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default firstCharUpper;
