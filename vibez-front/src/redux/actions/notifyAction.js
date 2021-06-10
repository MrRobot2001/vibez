import {GLOBALTYPES} from './globalTypes'
import {postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI} from '../../fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    DELETE_NOTIFY: 'DELETE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFY: 'DELETE_ALL_NOTIFY'
}

export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await postDataAPI('http://localhost:3000/notify', msg, auth.token)
        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteNotify = ({msg, auth, socket}) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`http://localhost:3000/notify/${msg.id}?url=${msg.url}`, auth.token)
        socket.emit('deleteNotify', msg)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getNotify = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('http://localhost:3000/notifies', token)
        dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const isReadNotify = ({msg,auth}) => async (dispatch) => {
    dispatch({type : NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})

    try {
        await patchDataAPI(`http://localhost:3000/isReadNotify/${msg._id}`, null , auth.token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteAllNotify = (token) => async (dispatch) => {
    dispatch({type : NOTIFY_TYPES.DELETE_ALL_NOTIFY, payload: []})

    try {
        await deleteDataAPI('http://localhost:3000/deleteAllNotify', token)
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}