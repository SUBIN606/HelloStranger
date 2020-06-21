import fetch from 'isomorphic-fetch';
import * as type from '../constants/actionTypes';

export const mySocketId = (socketId) => {
    return {
        type: type.MY_SOCKET_ID,
        socketId
    }
}

export const requestRoomList = (id) => {
    return dispatch => {
        fetch("http://localhost:3002/chat/roomList", {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('rooms', JSON.stringify(data));
            dispatch(getRoomList(data));
        })
    }
}

export const getRoomList = (roomList) => {
    return {
        type: type.GET_ROOM_LIST,
        roomList
    }
}

export const matchingSomeone = (matchResult) => {
    return {
        type: type.MATCHING_SOMEONE,
        matchResult
    }
}

export const getPartnerInfo = (partnerInfo) => {
    return {
        type: type.GET_PARTNER_INFO,
        partnerInfo
    }
}

export const requestChatList = (data) => {
    return dispatch => {
        fetch("http://localhost:3002/chat/chatList", {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(getChatList(data));
        })
    }
}

export const getChatList = (chatList) => {
    return {
        type: type.GET_CHAT_LIST,
        chatList
    }
}

export const receiveChat = (data) => {
    return {
        type: type.RECEIVE_CHAT,
        data
    }
}

export const clearChat = () => {
    return {
        type: type.CLEAR_CHAT
    }
}

