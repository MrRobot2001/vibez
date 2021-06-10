import React,{useState,useEffect} from 'react'
import '../pages/explore.css'
import {useSelector,useDispatch} from 'react-redux'
import {getExplorePosts,EXPLORE_TYPES} from '../redux/actions/exploreAction'
import LoadIcon from '../loading.gif'
import PostThumb from '../components/profile/PostThumb'
import LoadMoreBtn from '../pages/LoadMoreBtn'
import {getDataAPI} from '../fetchData'
export function Explore() {
    const {auth,explore} = useSelector(state => state)
    const dispatch = useDispatch()

    const [load,setLoad] = useState(false)

    useEffect(() => {
        if(!explore.firstLoad){
            dispatch(getExplorePosts(auth.token))   
        }
    },[dispatch, auth.token, explore.firstLoad])

    const handleLoadMore = async() => {
        setLoad(true)
        const res = await getDataAPI(`post_explore?num=${explore.page * 9}`,auth.token)
        dispatch({type : EXPLORE_TYPES.UPDATE_POST, payload: res.data})
        setLoad(false)
    }
    return (
        <div>
            {
                explore.loading
                ? <img src={LoadIcon} width="70px" height="70px" alt="Loading" className="loadimage_2"/>
                : <div className="Post_31"><PostThumb posts={explore.posts} result={explore.result} /></div>
            }     
            {
                load && <img src={LoadIcon} width="70px" height="70px" alt="Loading" className="loadimage_2"/>
            }
            {
                !explore.loading && 
                <LoadMoreBtn result={explore.result} page={explore.page}
                load={load} handleLoadMore={handleLoadMore}/>
            }     
        </div>
    )
}

export default Explore;