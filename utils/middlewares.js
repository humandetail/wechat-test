// 中间件
const sha1 = require('sha1');

/**
 * 微信公众号 - 接入接口配置验证
 * 请原样返回echostr参数内容，则接入生效，成为开发者成功
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319
 * Display a listing of the posts.
 *
 * @param { object } config - 配置项
 * @param { string } config.token - TOKEN
 * 
 */
function checkSignature (config) {
  return async function (ctx, next) {
    const {
      method,
      request: {
        query: {
          echostr,
          signature,
          timestamp,
          nonce
        }
      }
    } = ctx;
  
    const { token } = config;

    const tempStr = [token, timestamp, nonce].sort().join(''),
          sha = sha1(tempStr);
  
    if (method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr + '';
      } else {
        ctx.body = 'error';
      }
    } else {
      await next();
    }
  }
}

module.exports = {
  checkSignature
}