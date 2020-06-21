import React from 'react';

function ReceiveChat({chat, regDate}) {
    function convertDate (date) {
        const regDate = new Date(date);
        const hour = regDate.getHours()>10?regDate.getHours()+"":"0"+regDate.getHours();
        const minute = regDate.getMinutes()>10?regDate.getMinutes()+"":"0"+regDate.getMinutes();
        
        return hour+":"+minute;
    }
    return(
        <div className='chat-wrapper-receive'>
            <p className="receive chat">{chat}</p>
            <span className="chat-date">{convertDate(regDate)}</span>
        </div>
    );
}

export default ReceiveChat;
