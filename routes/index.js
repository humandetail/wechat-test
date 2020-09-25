const router = require('koa-router')(),
      IndexController = require('../controllers/Index');

const indexController = new IndexController();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello world!',
  })
})

router.get('/getSignature', indexController.getSignature);

module.exports = router
