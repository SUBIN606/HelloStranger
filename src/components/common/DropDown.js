import React from 'react';

function DropDown ({ userLogout, handleModal }) {
    return(
        <div className="drop-down-wrapper">
            <ul>
                <li className="drop-down-contents" onClick={userLogout}>
                    로그아웃
                </li>
                <li className="drop-down-contents" onClick={handleModal}>
                    프로필 수정
                </li>
            </ul>
        </div>
    )
}

export default DropDown;