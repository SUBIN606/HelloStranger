import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/chatActions';

import Room from './Room';

function RoomList({ chatReducer, requestRoomList, enterChatroom }) {
    const {
        roomList
    } = chatReducer;

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('users'));
        const myRooms = () => {
            if(localStorage.getItem('users') !== undefined){
                requestRoomList(user.id);
            }
        }
        myRooms();
    },[requestRoomList]);

    return (
        <div className="room-list-wrapper">
            <div className="room-list-title">
                <span role="img" aria-label="speech balloon" 
                    style={{fontSize: "15pt", verticalAlign: "text-top"}}>💬&nbsp;</span>
                    My Chat List
                <Link className="new-chat-btn" to="/chat/matching">
                    <img alt="new chat btn" src="/resources/plus.png" 
                        style={{width: "25px", height: "25px", verticalAlign: "bottom"}}/>
                </Link>
            </div>

            <div className="room-list-container">
            {roomList.length!==0?roomList.map(room=>{
                return  <Room key={room.chat_room_id} room={room} enterChatroom={enterChatroom} />})
                :<div className="room-list-empty-room">
                    <img alt="new chat btn" src="/resources/plus.png" 
                        style={{width: "20px", height: "20px", verticalAlign: "bottom"}}/>
                    &nbsp;버튼을 눌러 채팅을 시작해 보세요!</div>}
            </div>
            
        </div>
    );
}
const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        requestRoomList: (id) => {
            dispatch(action.requestRoomList(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
