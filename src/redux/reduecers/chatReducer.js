// import {actionCreators} from './actions';
import * as type from '../constants/actionTypes';

const chatStates = {
    chatList: [],
    socketId: null,
    roomList: [],
    matchResult: {},
    partnerInfo: {}
};

const chatReducer = (state = chatStates, action) => {
    switch(action.type){
        case type.MY_SOCKET_ID:
            return { ...state, socketId: action.socketId };
        case type.GET_ROOM_LIST:
            return { ...state, roomList: action.roomList };
        case type.MATCHING_SOMEONE:
            return { ...state, matchResult: action.matchResult };
        case type.RECEIVE_CHAT:
            let newChatList = state.chatList.slice();
            newChatList.push(action.data);
            return { ...state, chatList: newChatList };
        case type.CLEAR_CHAT:
            return {...state, chatList: [], partnerInfo: {}, matchResult: {}}
        case type.GET_CHAT_LIST:
            return { ...state, chatList: action.chatList };
        case type.GET_PARTNER_INFO:
            return { ...state, partnerInfo: action.partnerInfo };
        default:
            return state;
    }
}

export default chatReducer;