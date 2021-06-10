import React,{useState,useEffect} from 'react'
import './Follow.css'
import {useSelector,useDispatch} from 'react-redux'
import {follow,unfollow} from '../../redux/actions/profileAction'
export function Follow({user,width,marginLeft,marginTop}) {
    const [followed, setFollowed] = useState(false)

    const {auth,profile,socket} = useSelector(state => state)
    const dispatch = useDispatch()

    const [load,setLoad] = useState(false)
    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
        return () => setFollowed(false)
    },[auth.user.following,user._id])

    const handleFollow = async() => {
        if(load) return;

        setFollowed(true)
        setLoad(true)
        await dispatch(follow({users:profile.users, user, auth, socket}))
        setLoad(false)
    }

    const handleUnFollow = async() => {
        if(load) return;

        setFollowed(false)
        setLoad(true)
        await dispatch(unfollow({users:profile.users, user, auth, socket}))
        setLoad(false)
    }
    return (
        <>
        {
            followed
            ? <button className="fifth2" onClick={handleUnFollow} style={{width:width,marginLeft:marginLeft,marginTop:marginTop}}>UnFollow</button>
            : <button className="fifth1" onClick={handleFollow} style={{width:width,marginLeft:marginLeft,marginTop:marginTop}}>Follow</button>
        }
        </>
    )
}
export default Follow;
