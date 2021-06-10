import React,{useState,useEffect,useRef} from 'react'
import './CommentMenu.css'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {useDispatch,useSelector} from 'react-redux'
import {deleteComment} from '../../redux/actions/commentAction'
export function Commentmenu({post, comment, setOnEdit, left1, left2}) {
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch() 

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
    const handleClick = () => {
      setOnEdit(true)
      setShow(false)
    }
    const handleRemove = () => {
      if(post.user._id === auth.user._id || comment.user._id === auth.user._id){
      dispatch(deleteComment({post, auth, comment, socket}))}
      setShow(false)
    }

    return (
        <div className="comment_menu_1">
          { (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
            <div className="horizontal_2">
            <MoreVertIcon className="vert" onClick={() => setShow(!show)}/>
            
            {show ? 
            <div className="dropdown_2" style={{left:left1,left:left2}}>
                        {
                            post.user._id === auth.user._id ? comment.user._id === auth.user._id ?
                            <div className="dropdown-content_2" id="drop" ref={menuRef}><a onClick={handleClick}><EditIcon className="edit_posts" />Edit Comment</a>
                            <a onClick={handleRemove}><DeleteIcon className="delete_posts"/>Delete</a></div> 
                            : <div className="dropdown-content_2" id="drop" ref={menuRef}> <a onClick={handleRemove}><DeleteIcon className="delete_posts"/>Delete</a></div> 
                            : comment.user._id === auth.user._id && <div className="dropdown-content_2" id="drop" ref={menuRef}><a onClick={() => setOnEdit(true)}><EditIcon className="edit_posts"/>Edit Comment</a>
                            <a onClick={handleRemove}><DeleteIcon className="delete_posts"/>Delete</a></div> 
                        } 
            </div> : null}
        </div>}
        </div>
    )
}

export default Commentmenu;