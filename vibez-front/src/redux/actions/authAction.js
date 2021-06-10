import {GLOBALTYPES} from './globalTypes';

import { postDataAPI } from '../../fetchData';
import valid from '../../valid';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading:true}})
        const res = await postDataAPI('login',data)
        dispatch({type: GLOBALTYPES.AUTH, 
        payload: {token: res.data.access_token,user:res.data.user}})

        localStorage.setItem('firstlogin',true)

        dispatch({type: GLOBALTYPES.ALERT, 
        payload: {success: res.data.msg}
    })
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstlogin = localStorage.getItem("firstlogin")
    if (firstlogin){
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        try {
            const res = await postDataAPI('http://localhost:3000/refresh_token')
            dispatch({type: GLOBALTYPES.AUTH, 
            payload: {token: res.data.access_token,user:res.data.user}})
            dispatch({type: GLOBALTYPES.ALERT, payload: {}})
        } catch (err) {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
}

export const signup = (data) => async (dispatch) => {
    const check = valid(data);
    if(check.errLength > 0)
    return dispatch({type : GLOBALTYPES.ALERT, payload: check.errMsg })
    try {
        dispatch({type : GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataAPI('signup', data)
        dispatch({type: GLOBALTYPES.AUTH, 
        payload: {token: res.data.access_token,user:res.data.user}})
    
        localStorage.setItem('firstlogin',true)
    
        dispatch({type: GLOBALTYPES.ALERT, 
        payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstlogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}