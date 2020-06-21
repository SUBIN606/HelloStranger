const express = require('express');
const router = express();
const bodyParser = require('body-parser');

// MySQL 
const mysql_config = require('../config/mysql')();
const mysql = mysql_config.init();
mysql_config.conn_test(mysql);

// multer
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/'});

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

router.post('/signUp', upload.single('profile_img'), (req, res) => {
    console.log('users/signUp ', req.body);
    console.log(req.file);
    let sql = 'insert into chat_users   values(?, ?, ?, ?);';
    let datas = [req.body.id, req.body.password, req.body.name, req.file===undefined?null:req.file.filename];
    mysql.query(sql, datas, (err, result) => {
        if(err){
            console.log('회원가입 insert err! ' + err);
            res.send({result:"fail"});
        }
        res.send({result:"success"});
    })
});

router.post('/signIn', (req, res) => {
    console.log('users/signIn ', req.body);
    let sql = 'select id, name, profile_img from chat_users where id=? and password=? ;';
    let datas = [req.body.id, req.body.password];
    mysql.query(sql, datas, (err, result) => {
        if(err){
            console.log('로그인 err! ', err);
            res.send({result:"fail", users: []});
        }
        console.log(result);
        result.length>0?res.send({result:"success", users: result[0]}):res.send({result:"fail", users: []});
    })
});

router.post('/editProfile', upload.single('profile_img'), (req, res) => {
    console.log('users/editProfile ', req.body);
    console.log(req.file);
    let sql1 = 'update chat_users set name=?, profile_img=? where id=? ;';
    let datas1 = [req.body.name, req.file===undefined?req.body.profile_img:req.file.filename, req.body.id];
    sql1 = mysql.format(sql1, datas1);

    let sql2 = 'select id, name, profile_img from chat_users where id=? ;';
    let datas2 = [req.body.id];
    sql2 = mysql.format(sql2, datas2);

    let sql = sql1 + sql2;
    mysql.query(sql, (err, result) => {
        if(err){
            console.log('프로필 수정 update err! ' + err);
            res.send({result:"fail"});
        }
        res.send({result:"success", users: result[1][0]});
    })
});

router.get('/idDuplicate', (req, res) => {
    // console.log("아이디 중복 확인 : ", req.query.id);
    let sql = "select * from chat_users where id=? ;";
    mysql.query(sql, [req.query.id], (err, result) => {
        if(err){console.log("아이디 중복확인 err ! ", err)}
        if(result.length > 0){
            res.send({result : true})
        }else{
            res.send({result : false})
        }
    })
})

router.get('/nameDuplicate', (req, res) => {
    // console.log("이름 중복 확인 : ", req.query.name);
    let sql = "select * from chat_users where name=? ;";
    mysql.query(sql, [req.query.name], (err, result) => {
        if(err){console.log("이름 중복확인 err ! ", err)}
        if(result.length > 0){
            res.send({result : true})
        }else{
            res.send({result : false})
        }
    })
})

module.exports = router;