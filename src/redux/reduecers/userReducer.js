import * as type from '../constants/actionTypes';

const userStates = {
    users: [],
    signUpResult: null,
    signInResult: null,
    editProfileResult: null,
    idDuplicate: null,
    nameDuplicate: null
};

const userReducer = (state = userStates, action) => {
    switch(action.type){
        case type.USER_SIGN_UP_RESULT:
            return {...state, signUpResult:action.result}
        case type.USER_SIGN_IN_RESULT:
            return {...state, signInResult:action.result}
        case type.GET_USERS:
            return {...state, users:action.users}
        case type.USER_EDIT_PROFILE_RESULT:
            return {...state, editProfileResult:action.result}
        case type.USER_ID_DUPLICATE:
            return {...state, idDuplicate: action.result}
        case type.USER_NAME_DUPLICATE:
            return {...state, nameDuplicate: action.result}
        default:
            return state;
    }
}

export default userReducer;