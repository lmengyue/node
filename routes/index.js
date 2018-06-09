var express = require('express');
var router = express.Router();
var connection = require('./db');
var fs = require('fs');
var multiparty = require('connect-multiparty');

//页面
router.get('/',function(req,res){
    res.render('index',{
        userInfo: req.userInfo
    });
});
router.get('/index',function(req,res){
    res.render('index');
});
router.get('/register',function(req,res){
    res.render('register');
});
router.get('/bannerSet',function(req,res){
    res.render('bannerSet');
});
router.get('/login',function(req,res){
    res.render('login');
});
router.get('/news',function(req,res){
    res.render('news');
});
router.get('/newsDetail',function(req,res){
    res.render('newsDetail');
});

//上传图片接口
router.post('/upload_img',multiparty(),function(req, res,next) {
    var posterData = req.files.imgFile;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;
    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();//当前时间戳
            var type = posterData.type.split('/')[1];//图片类型
            var posterUrl = 'images/'+timestamp + '.' + type;//回发路径和名称
            var poster = 'public/images/'+timestamp + '.' + type;//图片保存路径和名称
            fs.writeFile(poster, data, function(err) {
                if(err)
                    throw err;
                console.log('写入图片成功');
                //回发图片路径
                res.send({
                    errno: 0,
                    data:[posterUrl]
                })
            })
        })
    }else{
        res.send('上传失败');
    }
});

//获取轮播图
router.get('/banner',(req,res)=>{
    console.log('轮播图');
    fs.readdir('./public/images/banner', function (err,files) {
        console.log(files);
        res.send({
            code:0,
            result: files,
            msg:''
        })
    })
});
//上传轮播图
router.post('/banner_set',multiparty(),function(req, res,next) {
    var posterData = req.files.imgFile;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;
    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timestamp = Date.now();//当前时间戳
            var type = posterData.type.split('/')[1];//图片类型
            var posterUrl = 'images/banner/'+timestamp + '.' + type;//回发路径和名称
            var poster = 'public/images/banner/'+timestamp + '.' + type;//图片保存路径和名称
            fs.writeFile(poster, data, function(err) {
                if(err)
                    throw err;
                console.log('写入图片成功');
                //回发图片路径
                res.send({
                    code:0,
                    result: posterUrl,
                    msg:''
                })
            })
        })
    }else{
        res.send('上传失败');
    }
});
//删除轮播图
router.post('/banner_del',function(req, res,next) {
    var imgData = 'public/'+req.body.file;
    console.log(imgData);
    fs.unlink(imgData,function(err){
        if(err)
            throw err;
        console.log('删除成功');
        res.send({
            code:0,
            result: 'success',
            msg:''
        });
    });
});

module.exports = router;
