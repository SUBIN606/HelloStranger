import fetch from 'isomorphic-fetch';
import * as type from '../constants/actionTypes';

export const userSignUp = (signUpInfo) => {
    return dispatch => {
        fetch("http://localhost:3002/users/signUp", {
            method:'post',
            body: signUpInfo
        })
        .then(res => res.json())
        .then(data => {
            data.result === "success" ? dispatch(userSignUpResult(true)):
                                            dispatch(userSignUpResult(false))   
        })
        .catch(error => dispatch(userSignUpResult(error)))
    }
}

export const userSignUpResult = (result) => {
    return {
        type: type.USER_SIGN_UP_RESULT,
        result
    }
}

export const userSignIn = (signInInfo) => {
    return dispatch => {
        fetch("http://localhost:3002/users/signIn", {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(signInInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === "success") {
                dispatch(userSignInResult(true))
                dispatch(getUsers(data.users))
                localStorage.setItem('users', JSON.stringify(data.users));
            }else{
                dispatch(userSignInResult(false)) 
                dispatch(getUsers([]))
            }                             
        })
    }
}

export const userSignInResult = (result) => {
    return {
        type: type.USER_SIGN_IN_RESULT,
        result
    }
}

export const getUsers = (users) => {
    return {
        type: type.GET_USERS,
        users
    }
}

export const userLogout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(userSignInResult(null));
        dispatch(getUsers([]));
        window.location.reload();
    }
}

export const requestEditProfile = (editProfile) => {
    return dispatch => {
        fetch("http://localhost:3002/users/editProfile", {
            method:'post',
            body: editProfile
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === "success"){
                dispatch(editProfileResult(true));
                dispatch(getUsers(data.users));
                localStorage.setItem('users', JSON.stringify(data.users));
                window.location.reload();
            }else{
                dispatch(editProfileResult(false))
            }
                                              
        })
        .catch(error => dispatch(editProfileResult(error)))
    }
}

export const editProfileResult = (result) => {
    return {
        type: type.USER_EDIT_PROFILE_RESULT,
        result
    }
}

export const requestIdDuplicate = (id) => {
    return dispatch => {
        fetch(`http://localhost:3002/users/idDuplicate?id=${id}`, {
                method:'get'
        })
        .then(res => res.json())
        .then(data => {
            dispatch(userIdDuplicate(data.result));
        })
    }
}

export const userIdDuplicate = (result) => {
    return {
        type: type.USER_ID_DUPLICATE,
        result
    }
}

export const requestNameDuplicate = (name) => {
    return dispatch => {
        fetch(`http://localhost:3002/users/nameDuplicate?name=${name}`, {
            method: 'get'
        })
        .then(res => res.json())
        .then(data => {
            dispatch(userNameDuplicate(data.result));
        })
    }
}

export const userNameDuplicate = (result) =>{
    return {
        type: type.USER_NAME_DUPLICATE,
        result
    }
}