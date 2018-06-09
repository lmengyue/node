var express = require('express');
var router = express.Router();
var connection = require('./db');

//插入文章
router.post('/news_insert',(req,res)=>{
    let news=req.body;
    console.log('插入文章');
    console.log(news.name);
    connection.query('select * from news where name="'+news.name+'"', function (error, result) {
        if (error) throw error
        else{
            if(result.length>0){
                res.send({
                    code:1,
                    result:'',
                    msg:'您的文章名已存在！'
                })
            }else{
                console.log(news.type);
                console.log(news.content);
                var datetime=Date.parse(new Date());
                console.log(datetime);
                let sql='insert into news(type,name,content,datetime)  value(?,?,?,?)';
                let sqlData=[news.type,news.name,news.content,datetime];
                connection.query(sql,sqlData, function (error, result) {
                    if (error) throw error
                    else{
                        res.send({
                            code:0,
                            result: 'success',
                            msg:''
                        })
                    }
                });
            }
        }
    });
});

//文章列表
router.get('/news_list',(req,res)=>{
    console.log('文章列表');
    let sql='select id,name,type from news';
    connection.query(sql, function (error, result) {
        if (error) throw error
        else{
            res.send({
                code:0,
                result:result,
                msg:''
            })
        }
    });
});
//文章内容
router.get('/news_detail',(req,res)=>{
    let news=req.query;
    console.log('文章详情');
    console.log(news.id);
    let sql='select * from news where id='+news.id;
    connection.query(sql, function (error, result) {
        if (error) throw error
        else{
            res.send({
                code:0,
                result:result[0],
                msg:''
            });
        }
    });
});

//修改文章
router.post('/news_change',(req,res)=>{
    let news=req.body;
    console.log('修改文章');
    console.log(news.id);
    console.log(news.name);
    console.log(news.type);
    console.log(news.content);
    var datetime=Date.parse(new Date());
    console.log(datetime);
    let sql='update news set name=?,type=?,content=?,datetime=? where id=?';
    let sqlData=[news.name,news.type,news.content,datetime,news.id];
    console.log(sql)
    connection.query(sql,sqlData, function (error, result) {
        if (error) throw error
        else{
            res.send({
                code:0,
                result: 'success',
                msg:''
            })
        }
    });
});
//删除文章
router.get('/del_news',(req,res)=>{
    let news=req.query;
    console.log('删除');
    console.log(news.id);
    let sql='delete from news where id="'+news.id+'"';
    connection.query(sql, function (error, result) {
        if (error) {throw error}
        else{
            res.send({
                code:0,
                result: 'success',
                msg:''
            })
        }
        console.log(result);
    });
});

module.exports = router;
