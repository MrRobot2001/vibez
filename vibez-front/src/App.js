import './App.css';
import React,{useEffect} from 'react';
import Home from './pages/home';
import HomePage from './pages/h';
import SignUp from './page/signup';
import Login from './pages/login';
import Alert from './components/Alert/Alert';
import Header from './components/header/header';
import StatusModal from './pages/StatusModal';
import {refreshToken} from './redux/actions/authAction';
import PageRender from './components/custom/PageRender';
import PrivateRouter from './components/custom/PrivateRouter';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getPosts} from './redux/actions/postAction';
import {getSuggestion} from './redux/actions/suggestionAction';
import io from 'socket.io-client'
import {GLOBALTYPES} from './redux/actions/globalTypes'
import Socketclient from './SocketClient'
import {getNotify} from './redux/actions/notifyAction'
import CallModal from './pages/message/CallModal'
import Peer from 'peerjs'
function App() {
  const { auth,status,call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io()
    dispatch({type : GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token){ 
      dispatch(getPosts(auth.token))
      dispatch(getSuggestion(auth.token))
      dispatch(getNotify(auth.token))
    }
  },[dispatch,auth.token])
  
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
  }
})

useEffect(() => {
  const newPeer = new Peer(undefined, {
    path: '/', secure: true
  })
  dispatch({type: GLOBALTYPES.PEER, payload: newPeer})
},[dispatch])

  return (
    <Router>
      <Alert/>
    <div>
      {auth.token  && <Header style/>}
      {status && <StatusModal/>}
      {auth.token && <Socketclient/>}
      {call && <CallModal/>}
      <Route exact path="/" component={auth.token ? Home : Login}/>
      <Route exact path="/h" component={auth.token ? Home : HomePage}/>
      <Route exact path="/signup" component={SignUp}/>

      <PrivateRouter exact path="/:page" component={PageRender} />
      <PrivateRouter exact path="/:page/:id" component={PageRender}/>
    </div>
    </Router>
  );
}

export default App;
