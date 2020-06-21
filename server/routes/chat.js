const express = require('express');
const router = express();
const bodyParser = require('body-parser');

// MySQL 
const mysql_config = require('../config/mysql')();
const mysql = mysql_config.init();
mysql_config.conn_test(mysql);

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

router.post('/roomList', (req, res) => {
   // console.log('chat/roomList ', req.body);
    let sql = 'select chat_room_id, r.partner as partner_id, u.name as partner_name, u.profile_img as partner_profile_img '
                    + 'from (select chat_room_id, if(host_user=?, participant_user, host_user) as partner '
                    + 'from chat_rooms where host_user=? or participant_user=? ) r left join chat_users u '  
                    + 'on r.partner = u.id ;';
    let params = [req.body.id, req.body.id, req.body.id, req.body.id, req.body.id];
    mysql.query(sql, params, (err, result) => {
        if(err){console.log("get room list err! ", err)}    
      //  console.log("get room list result : ", result);   
        result.length>0?res.send(result):res.send([]);
    })

})

router.get('/notification', (req, res) => {
    let sql = "select ifnull(?, chat_room_id) as chat_room_id, count(*) as notification "
            + "from chat_msgs "
            + "where chat_room_id=? and isread=0 and user_id!=? ";
    let datas = [parseInt(req.query.chat_room_id), parseInt(req.query.chat_room_id), req.query.id];
    mysql.query(sql, datas, (err, result) => {
        if(err){console.log("안읽은 개수 가져오기 err ", err)}
       // console.log(result);
        if(result.length > 0){
            res.send(result[0]);
        }else{
            res.send([]);
        }
    })

})

router.post('/chatList', (req, res) => {
   // console.log('chat/chatList', req.body);
    let sql1 = "update chat_msgs set isread=1 where chat_room_id=? and user_id!=? ;";
    let datas1 = [req.body.chat_room_id, req.body.id];
    sql1 = mysql.format(sql1, datas1);

    let sql2 = "select * from chat_msgs where chat_room_id=? ;";
    let datas2 = [req.body.chat_room_id];
    sql2 = mysql.format(sql2, datas2);

    let sql = sql1 + sql2;
    mysql.query(sql, (err, result) => {
        if(err){console.log("chatList 가져오기 err ", err)}
       // console.log("chatList ", result[1]);
        if(result.length>0){
            res.send(result[1]);
        }else{
            res.send([]);
        }
    })
})

router.get("/partner_info", (req, res) => {
    const partner_id = req.query.id;
    console.log("chat/partner_info ", partner_id);
    let sql = "select id as partner_id, name as partner_name, profile_img as partner_profile_img from chat_users where id=? ;";
    mysql.query(sql, [partner_id], (err, result) => {
        if(err){console.log("파트너 정보 가져오기 err ", err)}
        if(result.length > 0){
            res.send(result[0]);
        }else{
            res.send({partner_id: null, partner_name: '상대방을 찾을 수 없습니다.', partner_profile_img: 'question.png'});
        }
    })
})

module.exports = router;