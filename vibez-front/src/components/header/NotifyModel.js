import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './model.css'
import image2 from '../../image2.jpg'
import moment from 'moment'
import {isReadNotify,NOTIFY_TYPES,deleteAllNotify} from '../../redux/actions/notifyAction'
export function Notifymodel() {
    const {auth,notify} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleIsRead = msg => {
        dispatch(isReadNotify({msg, auth}))
    }

    const handleSound = () => {
        dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if(newArr.length === 0) return dispatch(deleteAllNotify(auth.token))

        if(window.confirm(`You have ${newArr.length} unread notifications. Are you sure you want to delete all?`)){
            return dispatch(deleteAllNotify(auth.token))
        }
    }
    return (
        <div style={{minWidth: '270px'}}>
            <div className="notify_1">
                <h3>Notifications</h3>
                {
                    notify.sound
                    ? <i className="fas fa-bell text-danger" onClick={handleSound}/>
                    : <i className="fas fa-bell-slash text-danger" onClick={handleSound}/>
                }
            </div>
            <hr style={{opacity: 0.5}}/>
            {
                notify.data.length === 0 && 
                <img src={image2} alt="Image2" width="150px" height="150px" className="image_notify"/>
            }
            <div style={{maxHeight:'350px',overflowY:'auto'}}>
                {
                    notify.data.map((msg,index) => (
                        <div key={index} className="notify_map_1">
                            <a href={`${msg.url}`} className="notify_a" onClick={() => handleIsRead(msg)}>
                                <img src={msg.user.avatar} alt="image2" width="45px" height="45px" className="image_notify_2"/>
                                <div className="notify_map_3">
                                    <div>
                                        <strong className="strong_notify">{msg.user.username}</strong>
                                        <span className="span_notify">{msg.text}</span>
                                    </div>
                                    {msg.content && <small className="notify_small">{msg.content.slice(0,20)}...</small>}
                                </div>
                                <div>
                                    {msg.image && <img src={msg.image} alt="image3" height="36px" width="36px" className="image_notify_3"/>}
                                </div>
                            </a>
                            <small className="moment_notify">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle circle"/>
                                }
                            </small>
                        </div>
                    ))
                }
            </div>

            <hr style={{marginTop: '5px',opacity:0.5}}/>
            <div className="delete_notify" onClick={handleDeleteAll}>
                Delete All
            </div>
        </div>
    )
}

export default Notifymodel