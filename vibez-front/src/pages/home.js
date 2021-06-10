import React from 'react';
import Status from './Status';
import Posts from './Posts';
import './home.css';
import {useSelector} from 'react-redux';
import LoadIcon from '../loading.gif';
import SideBar from './SideBar/SideBar'
export function Home() {
    const {HomePosts} = useSelector(state => state)
     return (
        <div className="home_1">
            <div className="home_2">
            <Status/>
            {
                HomePosts.loading
                ? <img src={LoadIcon} width="50px" height="50px" className="loading_posts" alt="Loading"/>
                : (HomePosts.result === 0 && HomePosts.posts.length === 0)
                    ? <h2 className="text_posts">NO POSTS</h2> 
                    : <Posts/>
            }
            </div>
            <div className="home_3">
                <SideBar/>
            </div>
        </div>
    )
}
export default Home;
