import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ChatHeader ({ chatReducer, handleModal, clearChat }) {
    const {partnerInfo} = chatReducer;

    // console.log("partner info : ", partnerInfo);

    function onClickBackBtn() {
        clearChat();
    }
    
    return (
        <div className='chat-header-wrapper'>         
            <div className='chat-header-content'>
                <Link to="/" onClick={onClickBackBtn}>
                    <img className='chat-header-back-btn' alt='back btn' src='/resources/back.png'/>
                </Link>
            </div>
            
            <div className='chat-header-content'>
                <div className='chat-heder-partner'>
                    <img className='chat-header-partner-profile-img' 
                            alt='profile_img' 
                            src={`/uploads/${partnerInfo.partner_profile_img}`}
                            onError={(e)=>{e.target.onerror = null; e.target.src='/resources/astronaut.png'}}
                    />
                    <div className='chat-header-partner-name'>
                        {partnerInfo.partner_name?partnerInfo.partner_name:'상대방을 찾을 수 없습니다.'}
                    </div>
                </div>
            </div>

            <div className='chat-header-content'>
                <button type="button" onClick={handleModal}>    
                    <img className='chat-header-leave-btn' alt='menu btn' src='/resources/exit.png'/>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, null)(ChatHeader);
