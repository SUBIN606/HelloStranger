import React from 'react';

function AlertMsg ({chat}) {
    return (
        <p className='chat alertMsg'>
            <span role="img" aria-label="sad but relieved face" style={{fontSize: "13pt"}}>😥&nbsp;</span>{chat}
        </p>
    );
}

export default AlertMsg;