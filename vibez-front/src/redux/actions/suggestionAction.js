import {GLOBALTYPES} from '../actions/globalTypes'
import {getDataAPI} from '../../fetchData'

export const SUGGESTION_TYPES = {
    LOADING: 'LOADING_SUGGESTION',
    GET_USERS: 'GET_USERS_SUGGESTION'
}

export const getSuggestion = (token) => async (dispatch) => {
    try {
        dispatch({type: SUGGESTION_TYPES.LOADING, payload: true})

        const res = await getDataAPI('http://localhost:3000/suggestionUser', token)
        
        dispatch({type: SUGGESTION_TYPES.GET_USERS, payload: res.data})
        dispatch({type: SUGGESTION_TYPES.LOADING, payload: false})
    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}