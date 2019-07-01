const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const httpServer = require('http-server');
httpServer.createServer({root:'./dist'}).listen('8080')

/* const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const expressIns = express();
 
// 超时时间
const TIME_OUT = 30 * 1e3;
 
// 设置端口
expressIns.set('port', '8081');
 
// 设置超时 返回超时响应
// expressIns.use(timeout(TIME_OUT));
expressIns.use((req, res, next) => {
 if (!req.timedout) next();
});
 
 
// 静态资源路径
// expressIns.use('/', express.static('src/page'));
 
// 反向代理
expressIns.use('/c', proxy({target: 'http://localhost:5757', changeOrigin: true}));
 
// 监听端口
expressIns.listen(expressIns.get('port'), () => {
 console.log(`server running @${expressIns.get('port')}`);
}); */

let url
if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8081/'
} else {
  url = `http://localhost:8081/`
}

app.on('ready', () => {
  let window = new BrowserWindow({width: 800, height: 600, webPreferences: {
    webSecurity: false
  }})
  window.loadURL(url)
})