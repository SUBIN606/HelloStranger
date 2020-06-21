import React, {useEffect} from 'react';

import SendChat from './msg/SendChat';
import ReceiveChat from './msg/ReceiveChat';
import AlertMsg from './msg/AlertMsg';

import '../../resources/chat.css';

function MsgArea({users, chatList}) {
    useEffect(()=>{
        const msgScroll = document.getElementsByClassName('chat-msgs')[0];
        msgScroll.scrollTop = msgScroll.scrollHeight;
    });
    return(
        <div className="chat-msgs">
            {chatList.map(chat =>{ 
                return chat.user_id===users.id && chat.type==="msg"?
                <SendChat key={chat.msg_id} chat={chat.chat} regDate={chat.reg_date} />:
                chat.user_id!==users.id && chat.type==="msg"?
                <ReceiveChat key={chat.msg_id} chat={chat.chat} regDate={chat.reg_date}/>:
                <AlertMsg key={chat.msg_id} chat={chat.chat} />}
            )}
        </div>
    )
}

export default MsgArea;