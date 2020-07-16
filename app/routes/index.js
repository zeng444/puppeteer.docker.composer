
const router = require('koa-router')()
//后端接口
const routePuppeteer= require('./puppeteer')
router.use('/puppeteer',routePuppeteer.routes())
module.exports=router