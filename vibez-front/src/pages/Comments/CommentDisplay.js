import React,{useState,useEffect} from 'react'
import CommentCard from './CommentCard'
import './CommentDisplay.css'
export function Commentdisplay({comment,post,replyCm,left1,left2}) {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    },[replyCm, next])
    return (
        <div className="comment_display_1">
            <CommentCard comment={comment} post={post} commentId={comment._id} left1={left1} left2={left2}>
                <div className="comment_display_2">
                    {
                        showRep.map((item,index) => (
                            item.reply &&
                            <CommentCard 
                            key={index}
                            comment={item}
                            post={post}
                            commentId={comment._id}
                            left1={left1}
                            left2={left2}/>
                        ))
                    }
                    {
                replyCm.length - next > 0
                ? <div className="comment_21" style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(next + 10)}>
                    See More Comments....
                </div>
                : replyCm.length > 1 &&
                <div className="comment_21" style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(1)}>
                    Hide Comments
                </div>
            }
                </div>
            </CommentCard>
        </div>
    )
}

export default Commentdisplay
