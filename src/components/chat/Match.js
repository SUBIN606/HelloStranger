import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Loading from './Loading';

function Match ({ chatReducer, requestMatching, quitMatching }) {

    const [users] = useState(JSON.parse(localStorage.getItem('users')));
    useEffect(()=>{requestMatching(users.id)},[requestMatching, users.id]);

    function quit() {
        quitMatching(users.id);
    }
    return(
        <>
            {chatReducer.matchResult.isMatch===true?
                <Redirect to={`/chat/room/${chatReducer.matchResult.chat_room_id}`} />
                :<Loading quit={quit} />}
        </>
    );
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, null)(Match);
