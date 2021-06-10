import React,{useState,useEffect} from 'react'
import './CommentCard.css'
import moment from 'moment'
import LikeButton from '../PostCard/LikeButton'
import CommentMenu from './CommentMenu'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {updateComment,likeComment,unlikeComment} from '../../redux/actions/commentAction'
import InputComment from '../PostCard/InputComment'
export function Commentcard({children,comment,post,commentId,left1,left2}) {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const [content,setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike,setIsLike] = useState(false)
    const [loadLike,setLoadLike] = useState(false)
    const [onEdit,setOnEdit] = useState(false)
    const [onReply,setOnReply] = useState(false)

    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like => like._id === auth.user._id)){
            setIsLike(true)
        }
    },[comment,auth.user._id])

    const handleLike = async() => {
        if(loadLike) return;

        setIsLike(true)
        setLoadLike(true)
        await dispatch(likeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUnLike = async() => {
        if(loadLike) return;

        setIsLike(false)
        setLoadLike(true)
        await dispatch(unlikeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUpdate = () => {
        if(comment.content !== content){
            dispatch(updateComment({comment, post, content, auth}))
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }
    }

    const handleReply = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }
    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }
    return (
        <div className="comment_card_1" style={styleCard}>
            <a href={`/profile/${comment.user._id}`} className="comment_a">
                <img src={comment.user.avatar} alt="avatar" width="22px" height="22px" className="comment_images"/>
                <h6 className="comment_text">{comment.user.username}</h6>
            </a>
            <div className="comment_content_1">
                <div className="comment_content_2">
                    {
                        onEdit ?
                        <textarea className="textarea_comment" rows="5" value={content}
                        onChange={e => setContent(e.target.value)} />
                        :
                    <div>
                        {
                            comment.tag && comment.tag._id === comment.user._id &&
                            <Link to={`/profile/${comment.tag._id}`} className="a_reply_1">
                                @{comment.tag.username}  
                            </Link>
                        }
                    <span>
                        {
                            content.length < 100 ? content :
                            readMore ? content + ' ' : content.slice(0,100) + '....' 
                        }
                    </span>
                    {
                        content.length > 100 &&
                        <span className="comment_read" onClick={() => setReadMore(!readMore)}>
                            {readMore ? 'Hide Content' : 'Read More'}
                        </span>
                    }
                    </div> }
                    <div style={{cursor: 'pointer'}}>
                        <small className="comment_small">
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="comment_small_1">
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit
                            ? <>
                        <small className="comment_small_1" onClick={handleUpdate}>
                            Update
                        </small>
                        <small className="comment_small_1" onClick={() => setOnEdit(false)}>
                            Cancel
                        </small>
                            </>
                        :
                        <small className="comment_small_1" onClick={handleReply}>
                            {onReply ? 'cancel' : 'reply'}
                        </small>
                        }
                    </div>
                </div>
                <div className="like_menu">
                    <div className="comment_45"><CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} left1={left1} left2={left2}/> </div>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>
            
            {
                onReply && <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
                    <Link to={`/profile/${onReply.user._id}`} className="a_reply">
                        @{onReply.user.username}:
                    </Link>
                    </InputComment> 
            }

            {children}
        </div>
    )
}

export default Commentcard
