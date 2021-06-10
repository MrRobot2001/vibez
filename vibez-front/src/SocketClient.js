import React,{useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {POST_TYPES} from './redux/actions/postAction'
import {GLOBALTYPES} from './redux/actions/globalTypes'
import {NOTIFY_TYPES} from './redux/actions/notifyAction'
import {MESS_TYPES} from './redux/actions/messageAction'
import audio from './audio.mp3'

const spawnNotification = (body, icon, url, title) => {
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

export function Socketclient() {
    const{auth,socket,notify,online,call} = useSelector(state => state)
    const dispatch = useDispatch()

    const audioRef = useRef()

    useEffect(() => {
        socket.emit('joinUser', auth.user) 
    },[socket, auth.user])

    useEffect(() => {
        socket.on('likeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POSTS, payload: newPost})
        }) 

        return () => socket.off('likeToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POSTS, payload: newPost})
        })

        return () => socket.off('unLikeToClient')
    },[socket, dispatch])
    
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POSTS, payload: newPost})
        })

        return () => socket.off('createCommentToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POSTS, payload: newPost})
        })

        return () => socket.off('deleteCommentToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('followToClient', newUser => {
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('followToClient')
    },[socket, dispatch, auth])

    useEffect(() => {
        socket.on('unfollowToClient', newUser => {
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('unfollowToClient')
    },[socket, dispatch, auth])

    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY,payload: msg})
            if(notify.sound) audioRef.current.play()
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'ViBez'
            )
        })

        return () => socket.off('createNotifyToClient')
    },[socket, dispatch,notify.sound])

    useEffect(() => {
        socket.on('deleteNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.DELETE_NOTIFY,payload: msg})
        })

        return () => socket.off('deleteNotifyToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('addMessageToClient', msg => {
            dispatch({type: MESS_TYPES.ADD_MESSAGE,payload: msg})
            dispatch({type: MESS_TYPES.ADD_USER, payload: {...msg.user, text: msg.text, media:msg.media}})
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch])
    
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user)
    },[socket, auth.user])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if(!online.includes(item.id)){
                    dispatch({type: GLOBALTYPES.ONLINE, payload: item.id})
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    },[socket, dispatch, online])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id => {
            if(!online.includes(id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: id})
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    },[socket, dispatch, online])

    useEffect(() => {
        socket.on('CheckUserOffline', id => {
            dispatch({type: GLOBALTYPES.OFFLINE, payload: id})
        })

        return () => socket.off('CheckUserOffline')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('callUserToClient', data => {
            dispatch({type: GLOBALTYPES.CALL, payload: data})
        })

        return () => socket.off('callUserToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('userBusy', data => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: `${call.username} is Busy!`}})
        })

        return () => socket.off('userBusy')
    },[socket, dispatch, call])

    return (
        <>
        <audio controls ref={audioRef} style={{display: 'none'}} >
            <source src={audio} type="audio/mp3"/>
        </audio>
        </>
    )
}

export default Socketclient;