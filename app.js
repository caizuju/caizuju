// 导入模块-----------------------------
// express
let express = require('express');
// svg-captcha 验证码
let svgCaptcha = require('svg-captcha');
// path模块 内置模块
let path = require('path');
// 导入 session模块
let session = require('express-session');
// 导入body-parser 格式化表单的数据
let bodyParser = require('body-parser');
// 导入mongoDB 
const MongoClient = require('mongodb').MongoClient;
// mongoDB 需要使用到的 配置
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'SZHM19';



// 创建app ------------
let app = express();

//托管静态资源
app.use(express.static('static'));
// 使用 session中间件
// 每个路由的 req对象中 增加 session这个属性
// 每个路由中 多了一个 可以访问到的 session 属性 可以再他身上 保存 需要共享的属性
app.use(session({
    secret: 'keyboard cat',
  
  }))
//路由1
//使用get方法 访问登陆页面时 直接读取登陆页面 并返回
app.get('/login',(req,res)=>{
    //直接读取文件并返回
    res.sendFile(path.join(__dirname,'static/views/login.html'))
})
//路由2
//生成图片的功能
//把这个地址设置给 登录页的 图片的 src属性
app.get('/login/captchaImg', (req, res)=> {
	var captcha = svgCaptcha.create();
    console.log(captcha.text);
	
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
});
//开启监听
app.listen(8848,'127.0.0.1',()=>{
    console.log('success');
})