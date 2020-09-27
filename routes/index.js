const router = require('koa-router')(),
      IndexController = require('../controllers/Index');

const indexController = new IndexController();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello world!',
  })
})

// // 微信接入验证
// router.get('/checkSignature', indexController.checkSignature);

router.post('/getSignature', indexController.getSignature);

module.exports = router
