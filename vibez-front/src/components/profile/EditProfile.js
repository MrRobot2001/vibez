import React,{useState,useEffect} from 'react'
import './EditProfile.css'
import {useSelector,useDispatch} from 'react-redux'
import {checkImage} from '../../imageupload'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {updateProfileUser} from '../../redux/actions/profileAction'
export function Editprofile({setOnEdit}) {
    const initialState = {
        name:'',mobile:'',website:'',gender:''
    }
    const [userData, setUserData] = useState(initialState)
    const {name,mobile,website,gender} = userData

    const [avatar,setAvatar] = useState('')
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    },[auth.user])
    const changeAvatar = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)
        if(err) return dispatch({type: GLOBALTYPES.ALERT,payload: {error: err}})   
        setAvatar(file)
    }

    const handleInput = e => {
        const {name,value} = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({userData,avatar,auth}))  
    }
    return (
        <div className="edit_1">
            <button className="editbtn" onClick={() => setOnEdit(false)}>X</button>
            <form className="edit_form" onSubmit={handleSubmit}>
                <div className="edit_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                    alt="avatar" height="140px" width="140px" />
                    <span>
                        <i className="fas fa-camera" />
                        <p className="edit_p1">Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>
                <div className="edit_grp">
                    <label htmlFor="name">Name</label>
                    <div className="edit_name">
                        <input type="text" name="name" value={name} 
                        onChange={handleInput}/>
                        <small className="edit_length">
                            {name.length}/25
                        </small>
                    </div>
                </div>
                <div className="edit_grp_1">
                <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile} 
                    onChange={handleInput}/>
                </div>
                <div className="edit_grp_2">
                <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={website} 
                    onChange={handleInput}/>
                </div>    
                <label htmlFor="gender">Gender</label>
                <div className="edit_grp_3">
                    <select name="gender" onChange={handleInput}
                    id="gender" className="edit_options" value={gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Other</option>
                    </select>    
                </div>
                <button className="edit_btn" type="submit">Save</button>
            </form>
        </div>
    )
}
export default Editprofile;
