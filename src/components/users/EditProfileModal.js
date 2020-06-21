import React, {useState, useEffect} from 'react';

import SignUpAlert from './SignUpAlert';

const EditProfileModal = ({ userReducer, 
                            handleModal, 
                            requestEditProfile, 
                            editProfileResult, 
                            requestNameDuplicate }) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const [name, setName] = useState(users.name);
    const [ file, setFile ] = useState(users.profile_img);
    const [ fileURL, setFileURL ] = useState("/uploads/"+users.profile_img);

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
    }

    function onSubmit(e) {
        e.preventDefault();
        if(userReducer.nameDuplicate){
            alert("중복된 이름을 사용하실 수 없습니다.")
        }else{
             const editProfile = new FormData();
            editProfile.append('id', users.id);
            editProfile.append('name', name);
            editProfile.append('profile_img', file);
            requestEditProfile(editProfile);
        }
    }

    useEffect(() => {
        const afterEdit = () => {
            return editProfileResult?handleModal():null;
        }
        afterEdit();
    },[editProfileResult, handleModal]);

    return (
        <>
            <div className="modal-background">
                <div className="modal-content-wrapper">
                    <button type="button" onClick={handleModal}>
                        <img className="modal-close-btn" alt="닫기" src="/resources/delete.png"/>
                    </button>
                    <p className="modal-content-title">
                        <span role="img" aria-label="writing hand" style={{fontSize: "15pt", verticalAlign: "text-top"}}>✍&nbsp;</span>
                        Edit Profile&nbsp;&nbsp;
                    </p>
                    <img className='file-preview_edit' alt="프로필 이미지" src={fileURL}/>
                    <input type='file' id='file_upload_edit' onChange={onChangeFile}
                        accept='image/jpg,image/png,image/jpeg,image/gif'/>
                    <label htmlFor='file_upload_edit'>
                        <img alt="upload file" style={{width: "40px", height: "40px"}} src="/resources/image.png" />
                    </label>
                    <input type="text" value={name} onChange={onChangeName} />
                    {name === "" || userReducer.nameDuplicate === null ? null  
                    : userReducer.nameDuplicate ? <SignUpAlert type="true" msg="이미 사용 중인 이름 입니다." />
                        :<SignUpAlert type="false" msg="사용하실 수 있는 이름 입니다." />}

                    <button type="button" className="edit-profile-submit-btn" onClick={onSubmit}>
                        수정완료
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditProfileModal;