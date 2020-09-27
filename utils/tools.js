const axios = require('./axios');

/**
 * 获取access_token
 * 
 * https请求方式:
 * GET
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 
 * @param { string } appid
 * @param { string } appsecret
 */
function getAccessToken (appid, appsecret) {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
  return axios.get(url);
}

/**
 * 获取jsapi_ticket
 * 
 * https请求方式:
 * GET
 * https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
 * 
 * @param { string } accessToken
 */
function getTicket (accessToken) {
  const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
  return axios.get(url);
}

/**
 * 生成随机字符串
 * @param { number } length - 随机字符串的长度
 */
function createRandomStr (length = 32) {

  const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

  let temp = [],
      item;

  function compareFn (a, b) {
    return Math.random() > 0.5
      ? 1
      : -1;
  }

  for (let i = 0; i < length; i ++) {
    item = arr.sort(compareFn);
    temp.push(item.slice(0, 1));
  }
  
  return temp.join('');
}

function raw (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

module.exports = {
  getAccessToken,
  getTicket,
  createRandomStr,
  raw
}