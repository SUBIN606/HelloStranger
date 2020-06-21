import React from 'react';
// import { connect } from 'react-redux';
// import * as chatAction from '../redux/actions/chatActions';
// import * as userAction from '../redux/actions/userActions';

import Header from './common/Header';
import RoomList from './chat/RoomList';

function Home () {

    return (
        <>
            <Header />
            <h4>Home.js</h4>
            {/* <button onClick={userLogout}>Logout</button> */}
            <RoomList />
        </>
    )
}

export default Home;