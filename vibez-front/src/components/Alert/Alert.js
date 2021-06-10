import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import './Notify.css';
import Toast from './Toast';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
export function Notify() {
    const {alert} = useSelector(state => state)
    const dispatch = useDispatch()
    return (
        <div>
            {alert.loading && <Loading />}
            {alert.error && <Toast msg={{body:alert.error}}
            handleShow={() => dispatch({type: GLOBALTYPES.ALERT,payload:{}})} bg="red" />
            }
            {alert.success && <Toast msg={{body:alert.success}}
            handleShow={() => dispatch({type: GLOBALTYPES.ALERT,payload:{}})} bg="green"/>}
        </div>
    )
}

export default Notify;