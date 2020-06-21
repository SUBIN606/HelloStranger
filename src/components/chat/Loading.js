import React from 'react';
import { Link } from 'react-router-dom';

function Loading({quit}) {
    
    return (
        <div className="loading-contents-wrapper">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
            <p>대화 상대를 찾고 있어요!</p>
            <Link className="loading-quit-btn" to="/" onClick={quit}>그만 찾기</Link>
        </div>
    )
}

export default Loading;