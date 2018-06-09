const mysql = require('mysql');
//连接数据库
var connection = mysql.createConnection({
    host     : 'bucong1129.mysql.rds.aliyuncs.com',
    user     : 'root',
    password : 'Bucong5733',
    database : 'node'
});
connection.connect();

module.exports = connection;