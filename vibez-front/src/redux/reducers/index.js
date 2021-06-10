import {combineReducers} from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import status from './statusReducer'
import HomePosts from './postReducer'
import detailPost from './detailPostReducer'
import explore from './exploreReducer'
import suggestions from './suggestionReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'

export default combineReducers({
    auth,
    alert,
    profile, 
    status,
    HomePosts,
    detailPost,
    explore,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer
})