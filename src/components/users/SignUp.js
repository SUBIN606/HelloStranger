import React, { useState, useEffect } from 'react';
import { connect } from  'react-redux';
import * as action from '../../redux/actions/userActions';

import SignUpAlert from './SignUpAlert';

const SignUp = ({userReducer, userSignUp, requestIdDuplicate, requestNameDuplicate, history}) => {
    const { signUpResult, idDuplicate, nameDuplicate } = userReducer;

    const [ id, setId ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ name, setName ] = useState("");
    const [ file, setFile ] = useState(null);
    const [ fileName, setFileName ] = useState("선택된 파일이 없습니다.");
    const [ fileURL, setFileURL ] = useState("");
  
    function onChangeId(e) {
        setId(e.target.value);
        requestIdDuplicate(e.target.value);
    }
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    function onChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }
    function onChangeName(e) {
        setName(e.target.value);
        requestNameDuplicate(e.target.value);
    }
    function onChangeFile(e) {
        let reader = new FileReader();
        let imgFile = e.target.files[0];
        console.log(imgFile);
        reader.onloadend = () => {
            setFile(imgFile);
            setFileURL(reader.result);
        }
        reader.readAsDataURL(imgFile);
        onChangeFileName(imgFile.name.length>20?imgFile.name.slice(0,20).concat('...'):imgFile.name);
    }
    function onChangeFileName(filename){
        setFileName(filename);
    }
    function deleteFile() {
        document.getElementById('file_upload').value = null;
        setFile(null);
        setFileName("선택된 파일이 없습니다.");
        setFileURL("");
    }
    function onSubmit(e) {
        e.preventDefault();
        if(id === "" || name === "" || password === "" || confirmPassword === ""
            || idDuplicate || nameDuplicate ){
            alert("회원가입 정보를 모두 정확하게 입력해 주세요");
        }else{
            const signUpInfo = new FormData();
            signUpInfo.append('id', id);
            signUpInfo.append('password', password);
            signUpInfo.append('name', name);
            signUpInfo.append('profile_img', file);
            userSignUp(signUpInfo);
        }
    }
    useEffect(()=>{
        const afterSignUp = () => {
            return signUpResult?history.push("/users/sign_in"):null;
        }
        afterSignUp();
    },[signUpResult, history])

    return (
        <div className='sign-up-wrapper'>
            <div className='sign-up-content-title'>
                <span role="img" aria-label="writing hand" style={{fontSize: "20pt"}}>✍</span>Create Account&nbsp;&nbsp;
            </div>
            <form>
                <span className='sign-up-span'>ID</span>
                <input type='text' className='sign-up-contents __input' 
                    value={id} onChange={onChangeId} placeholder='ID를 입력하세요'/>
                {id === "" || idDuplicate === null ? null  
                    : idDuplicate ? <SignUpAlert type="true" msg="이미 사용 중인 아이디 입니다." />
                        :<SignUpAlert type="false" msg="사용하실 수 있는 아이디 입니다." />}
                
                <span className='sign-up-span'>PASSWORD</span>
                <input type='password' className='sign-up-contents __input' 
                    value={password} onChange={onChangePassword} placeholder='비밀번호를 입력하세요' autoComplete='true'/>
                
                <span className='sign-up-span'>COFIRM PASSWORD</span>
                <input type='password' className='sign-up-contents __input' 
                    style={password===confirmPassword?{color: '#34c8ff'}:{color: '#e54b4b'}}
                    value={confirmPassword} onChange={onChangeConfirmPassword} placeholder='비밀번호를 다시 입력하세요' autoComplete='true'/>
                
                <span className='sign-up-span'>USER NAME</span>
                <input type='text' className='sign-up-contents __input' 
                    value={name} onChange={onChangeName} placeholder='이름(닉네임)을 입력하세요'/>
                {name === "" || nameDuplicate === null ? null  
                    : nameDuplicate ? <SignUpAlert type="true" msg="이미 사용 중인 이름 입니다." />
                        :<SignUpAlert type="false" msg="사용하실 수 있는 이름 입니다." />}

                <span className='sign-up-span'>PROFILE IMAGE</span>
                <div className='sign-up-contents-file-wrapper'>
                    <input type='text' className='file-name' readOnly={true}
                        value={fileName}  onChange={onChangeFileName}/>
                    
                    {file!==null?<button type='button' className='file-delete-btn' onClick={deleteFile}>&times;</button>:null}
                    
                    <input type='file' id='file_upload' onChange={onChangeFile}
                        accept='image/jpg,image/png,image/jpeg,image/gif'/>
                    <label htmlFor='file_upload'>파일 선택</label>
                </div>

                {fileURL!==""?<img className='file-preview' alt="이미지 불러오기 실패" src={fileURL}/>:null}
                
                <button type='button' className='sign-up-contents __btn' onClick={onSubmit}>SIGN UP</button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => {
    return {
        userSignUp: (signUpInfo) => {dispatch(action.userSignUp(signUpInfo))},
        requestIdDuplicate: (id) => {dispatch(action.requestIdDuplicate(id))},
        requestNameDuplicate: (name) => {dispatch(action.requestNameDuplicate(name))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);