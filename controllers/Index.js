class IndexController {
  async getSignature (ctx, next) {
    ctx.body = 'Hello Sign'
  }

}

module.exports = IndexController;