//导入模块
//express
let express = require('express');
//验证码
let svgCapaptcha =require('svg-capaptcha');
//path 模块 内置模块
let path = require('path');
//创建app
let app = express();
//托管静态资源
app.use(express.static('static'));
//路由1 
//使用get方法 访问登陆页面时, 直接读取登陆页面 ,并返回
app.get('/login',(req,res)=>{
    //直接读取文件并返回
    res.sendFile(path.join(__dirname,'static/views/login.html'));
})
//路由2
//生成图片的功能
//把这个地址 设置给 登陆页的图片的src属性
app.get('/login/captchaImg',(req,res)=>{
    var captcha = svgCaptcha.create();
	req.session.captcha = captcha.text;
	
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
})