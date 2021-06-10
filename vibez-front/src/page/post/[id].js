import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import '../../pages/id_2.css'
import {getPost} from '../../redux/actions/postAction'
import LoadIcon from '../../loading.gif'
import PostCard from '../../pages/PostCard/PostCard'
export function Post() {
    const {id} = useParams()
    const [post, setPost] = useState([])

    const {auth, detailPost} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({detailPost, id, auth}))

        if(detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    },[detailPost, dispatch, id, auth])

    return (
        <div className="Post_1"> 
            {
                post.length === 0 &&
                <img src={LoadIcon} width="70px" height="70px" alt="Loading" className="loadimage_1"/>
            }    
            {
                post.map(item => (
                    <div className="Post_21">
                    <PostCard key={item._id} post={item} width="1200px" left="80%" left1="50%" left2="77%"/>
                    </div>
                ))
            }    
        </div>
    )
}

export default Post