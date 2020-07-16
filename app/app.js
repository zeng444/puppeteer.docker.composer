const Koa=require('koa'),
      router=require('koa-router')(),//路由中间件
      koaBody = require('koa-body'),//post传值与formate文件
      static = require('koa-static'), //静态资源
      session=require('koa-session'), //session
      cors = require('koa2-cors'),//跨域
      koaResponse = require('./utils/response/index.js'),
      allRouter=require('./routes/index.js'),
      path=require('path')
const app=new Koa()
app.use(cors());

// app.use(bodyParser())
// app.use(koaBody());
app.use(koaResponse)

app.use(koaBody({
  multipart:true, // 支持文件上传
  strict  : false,
  // encoding:'gzip', // 启用这个会报错
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      const ext =upload.getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = upload.getUploadDirName();
      const dir = path.join(__dirname,`public/upload/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      upload.checkDirExist(dir);
      // 重新覆盖 file.path 属性
      const fileName = upload.getUploadFileName(ext);
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `/upload/${dirName}/${fileName}`;
      app.context.uploadname = app.context.uploadname ? app.context.uploadname : {};
      app.context.uploadname[name] = `${fileName}`;

    },
    onError:(err)=>{
      console.log(err);
    }
  }
}));
app.use(static(path.join( __dirname, 'public')))
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
router.use(allRouter.routes())
app.use(router.routes()).use(router.allowedMethods());
app.listen(80);
console.log('listening on port 80');
