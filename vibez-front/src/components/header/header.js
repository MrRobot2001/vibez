import React,{useState,useEffect,useRef} from 'react';
import './header.css'
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/authAction';
import { getDataAPI } from '../../fetchData';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import UserCard from '../../components/UserCard';
import LoadIcon from '../../loading.gif'; 
import NotifyModel from './NotifyModel'

export function Header() {
    const {pathname} = useLocation()
    const [search,setSearch] = useState('')
    const [users,setUsers] = useState([])
    const [load,setLoad] = useState(false)
    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }

    const [show,setShow] = useState(false)
    let menuRef = useRef()
    useEffect(() => {
      let handler = (event) => {
        if(menuRef.current && !menuRef.current.contains(event.target)){
          setShow(false);
        }
      };
      document.addEventListener("mousedown",handler);
      return () => {
        document.removeEventListener("mousedown",handler);
      };
    });

    const {auth, notify} = useSelector(state => state);
    const dispatch = useDispatch()

    const buttonxy = () => {
        setSearch('')
        setUsers([])
    }
    const handleSearch = async(e) => {
        e.preventDefault()
        if(!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`http://localhost:3000/search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)   
        } catch (err) {
            dispatch(
                {type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
     return (
        <div className="home1">
            <div className="image1">
            <a href="/" className="a1"><h2 className="text1">VibeZ</h2></a>
            </div>
            <div className="search">
                <form className="searchform" method="post" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search..." name="search" value={search} 
                    onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}>
                    </input>
                    <small className="buttonxy" onClick={buttonxy} style={{opacity: users.length === 0 ? 0 : 1}}>X</small>
                    {load && <img src={LoadIcon} className="load" alt=""/>}
                </form>
                <div className="users" id="users" style={{zIndex: search ? 11:10}}>
                    {
                        search && users.map(user => (
                                <UserCard key={user._id} user={user} border="1px solid black" buttonxy={buttonxy}/>
                        ))
                    }
                </div>
            </div>
            <div className="nav1">
                <Link to="/" title="Home" className="link1"><HomeIcon style={{fontSize: 31}} className={`home ${isActive('/')}`}></HomeIcon></Link>
                <Link to="/message" title="Messenger" className="link1"><MessageIcon style={{fontSize: 31}} className={`message ${isActive('/message')}`}></MessageIcon></Link>
                <Link to="/explore" title="Explore" className="link1"><ExploreIcon style={{fontSize: 31}} className={`explore ${isActive('/explore')}`}></ExploreIcon></Link>
                <span title="Notifications" className="link1"><NotificationsIcon style={{color: notify.data.length > 0 ? 'yellow' : 'grey'}} className={`notifications ${isActive('/notifications')}`} onClick={() => setShow(!show)}></NotificationsIcon></span>
                <small className="small_notify" onClick={() => setShow(!show)}>{notify.data.length}</small>
                {show ? 
            <div className="dropdown_1">
                        { 
                        <div className="dropdown-content_1" id="drop" ref={menuRef}>
                            <NotifyModel/>
                        </div>
                        } 
            </div> : null}
                <Link to={`/profile/${auth.user._id}`} title="Profile" className="link1"><img src={auth.user.avatar}  height="31px" width="31px" alt="" className="profile"/></Link>
                <Link to="/logout" title="Logout" className="link1"><ExitToAppIcon style={{fontSize: 31}} className={`logout ${isActive('/logout')}`} onClick={() => dispatch(logout())}></ExitToAppIcon></Link>
            </div>
        </div>
    )
}
export default Header;