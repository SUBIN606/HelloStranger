import React from 'react';

function LeaveChatModal ({handleModal, deleteChat, history}) {
    function handleLeaveChat() {
        handleModal();
        deleteChat();
        return history.push("/");
    }
    return (
        <>
            <div className="modal-background">
                <div className="modal-msg-wrapper">
                    <p><img style={{width: "40px", height: "40px"}} alt="warning sign" src="/resources/warning.png" /></p>
                    <p>채팅방을 나가면 대화내역이 모두 삭제됩니다.</p>
                    <p>정말 나가시겠습니까?</p>
                    <div className="modal-btn-area">
                        <button className="modal-btn yes" onClick={handleLeaveChat}>YES</button>&nbsp;&nbsp;&nbsp;
                        <button className="modal-btn cancle" onClick={handleModal}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveChatModal;