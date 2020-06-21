import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute ({ component: Component, 
                            getRoomList, 
                            requestMatching, 
                            enterChatroom,
                            leaveChatroom,
                            deleteChatroom,
                            sendChat,
                            clearChat,
                            quitMatching,
                            handleBackBtn,
                            ...rest }) {
    return (
        <Route
            {...rest}
            render = {props => 
                localStorage.getItem('users')?(
                    <Component {...props} 
                                getRoomList={getRoomList} 
                                requestMatching={requestMatching}
                                enterChatroom={enterChatroom}
                                leaveChatroom={leaveChatroom}
                                deleteChatroom={deleteChatroom}
                                sendChat={sendChat}
                                clearChat={clearChat}
                                quitMatching={quitMatching}
                                handleBackBtn={handleBackBtn}
                    />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/users/sign_in', 
                                    state: {from: props.location}
                                  }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;