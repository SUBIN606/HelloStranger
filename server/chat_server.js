const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3005 ;

server.listen(port, () => { console.log(`Listening on port ${port}`) });

// MySQL 
const mysql_config = require('./config/mysql')();
const mysql = mysql_config.init();
mysql_config.conn_test(mysql);

// socket에 연결된 유저들
const totalUserList = {};

// 랜덤 연결을 기다리는 리스트
const waitingQueue = []; 

io.on('connection', socket => {
    console.log("연결된 socketID : ", socket.id);
    
    io.to(socket.id).emit('my socket id', {socketId: socket.id});

    socket.on('matching someone', data => {
        totalUserList[socket.id] = data.id;
        console.log('matching someone', data);
        console.log("waitingQueue length is not 0!", waitingQueue);
        waitingQueue.forEach(w => console.log(w.id));

        const possibleUsers = waitingQueue.filter(waiting => 
            waiting.socket.id !== socket.id && waiting.id !== data.id
        )
        console.log("possibleUsers : " , possibleUsers);

        if(waitingQueue.length > 0 && possibleUsers.length > 0) {
            const participant = possibleUsers.shift();
            console.log("participant ", participant.socket.id);
            const participant_user = totalUserList[participant.socket.id];
            console.log("participant_user ", participant_user);
            const host_user = data.id;

            let sql = "insert into chat_rooms (host_user, participant_user) values(?, ?) ; ";
            let datas = [host_user, participant_user];
            mysql.query(sql, datas, (err, result) => {
                if(err){console.log("chat_rooms insert err! " , err);}
                console.log("insertId : " , result.insertId);
                let room_id = result.insertId;
                socket.join(room_id);
                participant.socket.join(room_id);
                io.to(data.socketId).emit('matching someone', { isMatch: true, 
                                                                chat_room_id: room_id, 
                                                                partner_id: participant_user });
                io.to(participant.socket.id).emit('matching someone', { isMatch: true, 
                                                                        chat_room_id: room_id, 
                                                                        partner_id: host_user });
            })
        }else{
            console.log("waitingQueue length is 0!");
            waitingQueue.push({socket: socket, id: data.id});
            io.to(data.socketId).emit('matching someone', {isMatch: false});
        }
    })

    socket.on('quit matching', data => {
        console.log("quit matching ", data);
        const disconnectedUser = waitingQueue.find(w=>w.id===data.id);
        console.log(disconnectedUser);
        if(disconnectedUser != undefined){
            delete waitingQueue[waitingQueue.findIndex(w=>w.id===data.id)];
            console.log(waitingQueue);
        }
    })

    socket.on('enter chatroom', (data) => {
        console.log("누군가가 입장함");
        socket.join(data.room);
        let sql = "select id as partner_id, name as partner_name, profile_img as partner_profile_img from chat_users "
                + "where id=(select if(host_user=?, participant_user, host_user) from chat_rooms where chat_room_id=?) ;"
        mysql.query(sql, [data.id, data.room], (err, result) => {
            if(err){console.log("enter chatroom 파트너 id 가져오기 err ", err)}
            if(result.length > 0){
                console.log("enter chat room partner id : " ,result[0].partner_id);
                io.to(socket.id).emit('enter chatroom', result[0] );
            }
        })
    })

    socket.on('leave chatroom', (data) => {
        console.log('leave chatroom ', data);
        socket.leave(data.room);
        io.in(data.room).clients((error, clients) => {
            if (error) throw error;
            console.log(clients); 
        });
    })

    socket.on('send chat', data => {
        console.log(`room${data.room} | ${socket.id} : ${data.chat}`);
        
        io.in(data.room).clients((error, clients) => {
            let isOnline = 0;
            if (error) throw error;
            console.log(clients); 
            if(clients.length > 0 && clients.find(c => c !== socket.id)){
                isOnline = 1;
            }
            let sql = "insert into chat_msgs(chat_room_id, type, user_id, chat, reg_date, isread) "
                + "values( ?, 'msg', ?, ?, now(), ? ) ;";
            let datas = [data.room, data.id, data.chat, isOnline];
            mysql.query(sql, datas, (err, result) => {
                if(err){console.log("채팅 insert err ", err)}
                let sql = "select * from chat_msgs where msg_id=? ;";
                mysql.query(sql, [result.insertId], (err, result) => {
                    io.to(data.room).emit('receive chat', result[0]);
                })
            })
        });
    })

    socket.on('delete chatroom', (data) => {
        console.log('delete chatroom ', data);
        socket.leave(data.room);
        let sql1 = "update chat_rooms "
            + "set host_user = case when host_user=? then null else host_user end, "
            + "participant_user = case when participant_user=? then null else participant_user end "
            + "where chat_room_id=? ;";
        let datas1 = [data.id, data.id, data.room];
        sql1 = mysql.format(sql1, datas1);

        let sql2 = "insert into chat_msgs(chat_room_id, type, user_id, chat, reg_date, isread) "
                + "values( ?, 'alert', null, '상대방이 대화에서 퇴장하셨습니다.', now(), 0 ) ;";
        let datas2 = [data.room, data.id];
        sql2 = mysql.format(sql2, datas2);

        let sql3 = "delete from chat_msgs where chat_room_id in "
                 + "(select chat_room_id from chat_rooms "
                 + "where chat_room_id=? and host_user is null and participant_user is null) ;";
        let datas3 = [data.room];
        sql3 = mysql.format(sql3, datas3);

        let sql4 = "delete from chat_rooms where chat_room_id=? and host_user is null and participant_user is null ;";
        let datas4 = [data.room];
        sql4 = mysql.format(sql4, datas4);

        let sql = sql1 + sql2 + sql3 + sql4;
        mysql.query(sql, (err, result) => {
            if(err){console.log("leave chatroom update err ", err)}
            let sql = "select * from chat_msgs where msg_id=? ;";
            mysql.query(sql, [result[1].insertId], (err, result) => {
                console.log("leave chat select ", result);
                socket.broadcast.to(data.room).emit('receive chat', result[0]);
            })
        })
    })
   
    socket.on('disconnect', () => {
        console.log("socket on disconnect ! ");

        const disconnectedUser = waitingQueue.find(w=>w.socket.id===socket.id);
        console.log(disconnectedUser);
        if(disconnectedUser != undefined){
            delete waitingQueue[waitingQueue.findIndex(w=>w.socket.id===socket.id)];
        }
        delete totalUserList[socket.id];
    })

    socket.on('reconnect', () => {
        console.log("************* socket reconnect!!!");
    })

})

