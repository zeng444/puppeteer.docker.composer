
const router = require('koa-router')()
const puppeteerMethod = require ('../../controller/puppeteer/index.js')
router.post('/cut',async (ctx,next)=>{
  var req=ctx.request.body
  // console.log(req.pos)
  var res= await puppeteerMethod.cutImage(req.url,'1',req.pos)
  if(res.code==='200') ctx.success()
  ctx.error(res.msg,'200')
});


module.exports=router