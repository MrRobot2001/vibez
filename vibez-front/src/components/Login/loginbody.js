import React,{useState,useEffect} from 'react';
import image from '../../image5.png';
import './loginbody.css';
import {useHistory} from 'react-router-dom';
import {login} from '../../redux/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
export function Loginbody() {
    const initialState = { email: '', password:'' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typepass, settypepass] = useState(false)

    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=> {
        if(auth.token) history.push("/login")
    },[auth.token,history])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }
    return (
        <div className="loginbody">
            <img src={image} alt="image45" width="1536" height="679"/>
            <div className="f">
            <form className="box1" method="post" onSubmit={handleSubmit}>
                <h4 className="h">Login</h4>
            <input type="email" name="email" placeholder="E-Mail" required onChange={handleChangeInput} value={email}/>
            <input type={typepass ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChangeInput} value={password}/>
            <small onClick={() => settypepass(!typepass)} className="show">
                {typepass ? 'Hide' : 'Show'}
            </small>
            <input type="submit" name="" value="LOGIN"/>
            </form>
            </div>
        </div>
    )
}
export default Loginbody;