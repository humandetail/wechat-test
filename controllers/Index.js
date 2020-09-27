const sha1 = require('sha1');

const {
  getAccessToken,
  getTicket,
  createRandomStr,
  raw
} = require('../utils/tools')

const {
  APPID,
  APPSECRET
} = require('../config/wechat');

class IndexController {
  // 获取微信签名
  async getSignature (ctx, next) {
    
    const {
      url
    } = ctx.request.body;

    const {
      access_token
    } = await getAccessToken(APPID, APPSECRET);

    const {
      ticket
    } = await getTicket(access_token);

    // let ticket = ''

    // let {
    //   protocol,
    //   host,
    //   url
    // } = ctx;

    // url = `${protocol}://${host}${url}`;

    const noncestr = createRandomStr(16), // 随机字符串
          timestamp = parseInt(new Date().getTime() / 1000) + ''; // 时间戳

    const signRet = {
      jsapi_ticket: ticket,
      timestamp,
      nonceStr: noncestr,
      url
    }

    const signString = raw(signRet)

    // 生成签名，并使用sha1加密
    const signature = sha1(signString);

    console.log(signRet);

    ctx.body = {
      err_code: 0,
      message: 'success',
      data: {
        url,
        access_token,
        ticket,
        signature,
        noncestr,
        timestamp,
        appid: APPID,
      }
    }
  }

}

module.exports = IndexController;