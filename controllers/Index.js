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
      access_token
    } = await getAccessToken(APPID, APPSECRET);

    const {
      ticket
    } = await getTicket(access_token);

    // let ticket = ''

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

    //jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value

    console.log(ticket, noncestr, timestamp, url);

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