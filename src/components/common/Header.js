import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/userActions';

import DropDown from './DropDown';
import EditProfileModal from '../users/EditProfileModal';
import '../../resources/common.css';

function Header ({userReducer, userLogout, requestEditProfile, requestNameDuplicate}) {
    const [users] = useState(JSON.parse(localStorage.getItem('users')));
    const [showDropDown, setShowDropDown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    function handleDropDown() {
        setShowDropDown(showDropDown?false:true);
    }
    function handleModal() {
        setShowModal(showModal?false:true);
    }
    return (
        <>
        <div className="header-wrapper">
            <div className="header-logo">
                <span role="img" aria-label="wave hand" style={{fontSize: "17pt"}}>👋</span>Hello Stranger!
            </div>
            <div className="header-user-area">
                <img className="header-profile-img" alt="my profile img" src={`/uploads/${users.profile_img}`} />
                <span className="header-user-name">{users.name}</span>
                <button type="button" onClick={handleDropDown}>
                    <img className="header-menu-btn" alt="menu btn" src={`/resources/more.png`} /> 
                </button>
                
            </div>
            {showDropDown?<DropDown userLogout={userLogout} handleModal={handleModal}  />:null}
            
        </div>
        {showModal?<EditProfileModal 
                        userReducer={userReducer}
                        handleModal={handleModal} 
                        requestEditProfile={requestEditProfile} 
                        requestNameDuplicate={requestNameDuplicate}
                        editProfileResult={userReducer.editProfileResult} />
            :null}
        </>
    )
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => {
            dispatch(action.userLogout());
        },
        requestEditProfile: (editProfile) => {
            dispatch(action.requestEditProfile(editProfile));
        },
        requestNameDuplicate: (name) => {
            dispatch(action.requestNameDuplicate(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);