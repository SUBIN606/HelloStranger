import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/userActions';

import '../../resources/styles.css';
import '../../resources/users.css';

const SignIn = ({userReducer, userSignIn, history}) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isFail, setIsFail] = useState(false);
    function onChangeId(e) {
        setId(e.target.value);
    }
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        const signInInfo = {
            id: id,
            password: password
        }
        userSignIn(signInInfo);
        setPassword("");
    }
    useEffect(()=>{
        const afterSignIn = () => {
            if(userReducer.signInResult !==null && userReducer.signInResult === true) {
                return history.push("/");
            }else if(userReducer.signInResult !==null && userReducer.signInResult === false){
                return setIsFail(true);
            }
        }
        afterSignIn();
    },[userReducer.signInResult, history]);

    return (
        <div className='login-wrapper'>
            <div className='login-contents-logo'>
                <span role="img" aria-label="wave hand" style={{fontSize: "22pt"}}>👋</span>Hello Stranger!&nbsp;
            </div>
            <form>
                <input type='text' className='login-contents __input' value={id} onChange={onChangeId} placeholder="ID" />
                <input type='password' className='login-contents __input' value={password} onChange={onChangePassword} placeholder="PASSWORD" autoComplete='true' />
                {isFail===true?<div className='login-contents-alert'>가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.</div>:null}
                <button type='button' className='login-contents __btn' onClick={onSubmit}>LOGIN</button>
                <span>Don't have account?&nbsp;<Link to="/users/sign_up">Create Account</Link></span>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => {
    return {
        userSignIn: (signInInfo) => dispatch(action.userSignIn(signInInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
