const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

const {dd, url} = require('./config')
const accessToken = require('./accessToken')

const user = require('./user')

router
    .get('/', async ctx => ctx.redirect(dd.loginUrl))
    .get('/token/verify/:type/:sns/:token', user.verify)
    .post('/accessToken/update', accessToken.update)
    .get('/callback', async ctx => ctx.body = 'callback')
    .get('/redirect', user.auth)

app
    .use(router.routes())
    .use(router.allowedMethods())

console.log(dd.loginUrl)
// console.log(uri.port)
app.listen(url.port, () => accessToken.cron())    // 定期更新accessToken

