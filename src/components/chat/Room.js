import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { enterChatroom } from '../../redux/actions/chatActions';

function Room ({ room }) {
    const [notification, setNotification] = useState(0);
    const [users] = useState(JSON.parse(localStorage.getItem('users')));
    const { chat_room_id, partner_profile_img, partner_name } = room;

    useEffect(()=>{
        fetch(`http://localhost:3002/chat/notification?chat_room_id=${chat_room_id}&id=${users.id}`)
        .then(res => res.json())
        .then(data => {
            setNotification(data.notification);
        })
    },[users.id, chat_room_id]);

    // function enterRoom() {
    //     enterChatroom({chat_room_id: chat_room_id, id: users.id});
    // }
    return (
        <>
            <Link key={chat_room_id} 
                    to={`/chat/room/${chat_room_id}`}>
                <div className='room-list-room'>
                    <div>
                        <img className='room-list-profile-img' 
                                alt='profile_img' 
                                src={`/uploads/${partner_profile_img}`} 
                                onError={(e)=>{e.target.onerror = null; e.target.src='/resources/astronaut.png'}}
                        />
                        {notification>0?<span className='room-list-notification'>{notification}</span>:null}
                    </div>
                    
                    <span className='room-list-partner-name'>{partner_name?partner_name:'상대방을 찾을 수 없습니다.'}</span>
                    
                </div>
            </Link>
        </>
    )
}

export default Room;