const sha1 = require('sha1');

const {
  getAccessToken,
  getTicket,
  createRandomStr,
} = require('../utils/tools')

const {
  APPID,
  APPSECRET
} = require('../config/wechat');

class IndexController {
  // 获取微信签名
  async getSignature (ctx, next) {
    const {
      accessToken
    } = await getAccessToken(APPID, APPSECRET);

    const {
      ticket
    } = await getTicket(accessToken);

    let {
      protocol,
      host,
      url
    } = ctx;

    url = `${protocol}://${host}${url}`;

    const noncestr = createRandomStr(), // 随机字符串
          timestamp = new Date().getTime(); // 时间戳
          // url = ctx.url;

    // 生成签名，并使用sha1加密
    const signature = sha1(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`);

    ctx.body = {
      err_code: 0,
      message: 'success',
      data: {
        signature,
        noncestr,
        timestamp,
        appid: APPID,
      }
    }
  }

}

module.exports = IndexController;