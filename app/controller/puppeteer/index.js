const fs = require('fs');
const path=require('path')
const puppeteer = require('puppeteer');
const os = require('os');
module.exports = {
  cutImage(url,id=1,pos,type) {
    // var executablePath = ''
    // if (os.type() == 'Windows_NT') {
    //   executablePath = './static/chromium/chrome-win/chrome.exe'
    // } else if (os.type() == 'Darwin') { //mac
     
    // } else if (os.type() == 'Linux') {
    //   executablePath='./static/chromium/chrome-linux/chrome'
    // }
    return new Promise(async (resolve,reject)=>{
        if(!pos || pos.length===0) {
          return resolve({code:500,msg:'请输入截图地址'})
        }
        const browser = await puppeteer.launch({
          // executablePath,
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ]
        });
        if (!url) {
          url = 'http://elephant.xy.cn/home';
        }
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
          url = 'http://' + url;
        }
        const page = await browser.newPage();
        await page.emulateTimezone('Asia/Shanghai');
        await page.goto(url, {
          'waitUntil': 'networkidle2'
        });
    
        // let path = '/tmp/example';
        let dirPath=`./public/puppeteer/${id}`
        const localPath=path.join(__dirname,'../../',dirPath)
        if(!fs.existsSync(localPath)) {
           fs.mkdirSync(localPath);
        }
        if (type==='pdf') {
          // await page.pdf({
          //   path: dirPath,
          //   displayHeaderFooter: false
          // });
        } else {
          var PromiseArr = (() => {
            var arr = pos.map((item,key)=>{
              return page.screenshot({ 
                path: `${dirPath}/${key+1}.png`,
                clip:item,
                // fullPage: true,
                type: 'png' 
              });
            })
            return arr
          })()
          await Promise.all(PromiseArr)
        }
        await browser.close();
        return resolve({code:200})
    })
  }
}
