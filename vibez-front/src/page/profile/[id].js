import React,{useState,useEffect} from 'react'
import Info from '../../components/profile/info';
import Posts from '../../components/profile/posts';
import Save from '../../components/profile/Save';
import {useSelector,useDispatch} from 'react-redux';
import LoadIcon from '../../loading.gif';
import '../../pages/id.css';
import {getProfileUsers} from '../../redux/actions/profileAction';
import {useParams} from 'react-router-dom';
export function Profile() {
    const {profile,auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const {id} = useParams()
    const[saveTab, setSaveTab] = useState(false)

    useEffect(() =>{
        if(profile.ids.every(item => item !== id)){
        dispatch(getProfileUsers({id, auth}))}
    },[id, profile.ids, auth, dispatch])
    return (
        <div className="profile">

<Info auth={auth} profile={profile} dispatch={dispatch} id={id}/>
{
    auth.user._id === id && 
    <div className="savetab_1">
        <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>POSTS</button>
        <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>SAVED</button>
    </div>
}
        {
        profile.loading ? 
        <img src={LoadIcon} width="60px" height="60px" alt="Loading" className="loadimage"/>
        : <>
        {
            saveTab
            ? <Save auth={auth} dispatch={dispatch} />
            : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}/>
        }
        </>
        }
        </div>
    )
}

export default Profile;
