import {GLOBALTYPES,DeleteData} from './globalTypes'
import {postDataAPI,getDataAPI,deleteDataAPI} from '../../fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CHATS: 'GET_CHATS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CHATS: 'DELETE_CHATS',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}

export const addMessage = ({msg, auth, socket}) => async (dispatch) => {
    dispatch({type : MESS_TYPES.ADD_MESSAGE, payload: msg})

    const { _id, avatar, name, username } = auth.user
    socket.emit('addMessage', {...msg, user: {_id, avatar, name, username}})
    try {
        const res = await postDataAPI('http://localhost:3000/message', msg, auth.token)
        
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getChat = ({auth, page=1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`http://localhost:3000/chats?limit=${page * 9}`,auth.token)

        let newArr = [];
        res.data.chats.forEach(item => {
            item.recipients.forEach(cv => {
                if(cv._id !== auth.user._id) {
                    newArr.push({...cv, text: item.text, media: item.media, call: item.call})
                }
            })
        })
        dispatch({type:MESS_TYPES.GET_CHATS, payload: {newArr, result: res.data.result}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})       
    }
}

export const getMessage = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`http://localhost:3000/message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}
        dispatch({type:MESS_TYPES.GET_MESSAGES,payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const loadMoreMessage = ({auth, id, page = 1}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`http://localhost:3000/message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}
        dispatch({type:MESS_TYPES.UPDATE_MESSAGES,payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteMessage = ({msg, data, auth}) => async (dispatch) => {
    const newData = DeleteData(data, msg._id)
    dispatch({type: MESS_TYPES.DELETE_MESSAGES, payload: {newData, _id: msg.recipient}})
    try {
        await deleteDataAPI(`http://localhost:3000/message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteChat = ({auth, id}) => async (dispatch) => {
    dispatch({type: MESS_TYPES.DELETE_CHATS, payload: id})
    try {
        await deleteDataAPI(`http://localhost:3000/chat/${id}`, auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}