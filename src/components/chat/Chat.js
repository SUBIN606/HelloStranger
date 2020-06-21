import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/chatActions';

import ChatHeader from './ChatHeader';
import MsgArea from './MsgArea';
import LeaveChatModal from './LeaveChatModal';

import '../../resources/styles.css';
import '../../resources/chat.css';

function Chat(props) {
    const { chatReducer,
            requestChatList, 
            enterChatroom,
            leaveChatroom,
            deleteChatroom, 
            sendChat, 
            clearChat,
            history } = props;

    const [users] = useState(JSON.parse(localStorage.getItem('users')));
    const chat_room_id = useParams();
    
    const [chat, setChat] = useState("");
    const [showModal, setShowModal] = useState(false);

    function onChange(e){
        setChat(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        sendChat({  userId: users.id, 
                    chat_room_id: chat_room_id.id, 
                    chat: chat });
        setChat("");
        document.getElementById('chat_input_text').focus();
    }
    
    // 채팅방 입장
    useEffect(()=>{
        enterChatroom({chat_room_id: chat_room_id.id, id: users.id})
    }, [chatReducer.matchResult, enterChatroom, chat_room_id.id, users.id])

    // DB저장된 채팅 목록 불러오기
    useEffect(()=>{requestChatList({chat_room_id: chat_room_id.id, id: users.id})}
        , [requestChatList, chat_room_id.id, users.id])
    
    // Chat Component unmount ==> leave chat
    useEffect(() => {
        return () => {
            console.log('will unmount');
            leaveChatroom({chat_room_id: chat_room_id.id})
        }
    }, [leaveChatroom, chat_room_id.id]);

    function deleteChat() {
        deleteChatroom({chat_room_id: chat_room_id.id, id: users.id});
    }

    function handleModal() {
        setShowModal(showModal?false:true);
    }

    return (
        <>
            {showModal?
                <LeaveChatModal handleModal={handleModal} 
                                deleteChat={deleteChat} 
                                history={history}/>
                :null}

            <div className="chat-wrap">
                <ChatHeader roomId={chat_room_id.id}
                            clearChat={clearChat} 
                            handleModal={handleModal} />
                    
                    <div className='chat-msgs-wrap'>
                        <MsgArea users={users} chatList={chatReducer.chatList}/>
                        {/* {chatReducer.matchResult.isMatch===true || chatReducer.matchResult.existRoom===true?
                            <MsgArea users={users} chatList={chatReducer.chatList}/>
                            :<Loading/>} */}
                    </div>

                    <div className="chat-form-wrap">
                        <form>
                            <input type="text" id="chat_input_text" value={chat} onChange={onChange} />
                            <button onClick={onSubmit}>SEND</button>
                        </form>
                    </div>      
            </div>
           
        </>
    );
}

const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = dispatch => {
    return {
        requestChatList: (chat_room_id) => {
            dispatch(action.requestChatList(chat_room_id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);