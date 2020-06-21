import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from './helpers/PrivateRoute';
import Home from './components/Home';
import RoomList from './components/chat/RoomList';
import Match from './components/chat/Match';
import Loading from './components/chat/Loading';
import Chat from './components/chat/Chat';
import SingIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';


function App(props) {
  const {
    getRoomList,
    requestMatching,
    enterChatroom,
    leaveChatroom,
    deleteChatroom,
    sendChat,
    clearChat,
    quitMatching
  } = props;
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home}  getRoomList={getRoomList} />
        
        <PrivateRoute path="/chat/room_list" component={RoomList} enterChatroom={enterChatroom} />
        <PrivateRoute path="/chat/matching" component={Match} 
                                            requestMatching={requestMatching} 
                                            quitMatching={quitMatching}/>
        <PrivateRoute path="/chat/loading" component={Loading} />
        <PrivateRoute path="/chat/room/:id" component={Chat}  enterChatroom={enterChatroom}
                                                              leaveChatroom={leaveChatroom}
                                                              deleteChatroom={deleteChatroom}
                                                              sendChat={sendChat}
                                                              clearChat={clearChat} /> 
        <Route path="/users/sign_in" component={SingIn}/>
        <Route path="/users/sign_up" component={SignUp}/>

      </Switch>
    </Router>
  );
}

export default App;
