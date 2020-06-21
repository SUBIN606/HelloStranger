import { connect } from  'react-redux';
import * as action from '../redux/actions/chatActions';
import io from 'socket.io-client';
import App from '../../src/App';


const socket = io.connect("http://localhost:3005");

const socketSubscribe = dispatch => {
    socket.on('my socket id', (data) => {
        dispatch(action.mySocketId(data.socketId));
    });

    // 랜덤채팅 요청 결과
    socket.on('matching someone', (matchResult) => {
        console.log(matchResult);
        dispatch(action.matchingSomeone(matchResult));
    })

    // 채팅 방 입장
    socket.on('enter chatroom', (data) => {
        console.log(data);
        dispatch(action.getPartnerInfo(data));
    })

    socket.on('receive chat', (data) => {
        // console.log("App.js Socket(receive chat) ", data);
        dispatch(action.receiveChat(data));
    });
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    socketSubscribe(dispatch);
    return {
        requestMatching: (id) => {
            socket.emit('matching someone', {id: id, socketId: socket.id});
        },
        enterChatroom: (data) => {
            socket.emit('enter chatroom', {room: data.chat_room_id, id: data.id});
        },
        deleteChatroom: (data) => {
            socket.emit('delete chatroom', {room: data.chat_room_id, id: data.id});
        },
        sendChat: (chatData) => { 
            socket.emit('send chat', {type: "msg", 
                                      room: chatData.chat_room_id,
                                      id: chatData.userId,
                                      socketId: socket.id, 
                                      chat: chatData.chat});
        },
        clearChat: () => {
            dispatch(action.clearChat());
        },
        quitMatching: (id) => {
            socket.emit('quit matching', {id: id, socketId: socket.id});
        },
        leaveChatroom: (data) => {
            socket.emit('leave chatroom', {room: data.chat_room_id})
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);