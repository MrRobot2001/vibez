import {GLOBALTYPES} from './globalTypes'
import {getDataAPI} from '../../fetchData'

export const EXPLORE_TYPES = {
    LOADING: 'LOADING_EXPLORE',
    GET_POSTS: 'GET_EXPLORE_POSTS',
    UPDATE_POST: 'UPDATE_EXPLORE_POST'
}

export const getExplorePosts = (token) => async (dispatch) => {
    try {
        dispatch({type : EXPLORE_TYPES.LOADING, payload:true})

        const res = await getDataAPI('post_explore',token)
        dispatch({type : EXPLORE_TYPES.GET_POSTS, payload: res.data})
        
        dispatch({type : EXPLORE_TYPES.LOADING, payload:false})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}