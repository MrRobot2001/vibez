import React from 'react';
import './Followers.css';
import UserCard from '../UserCard';
import Follow from './Follow';
import {useSelector} from 'react-redux';
export function Followers({users,setShowFollowers}) {
    const {auth} = useSelector(state => state)
    return (
        <div className="follow_1" id="follow_1">
            <div className="follow_2">
                <h5 className="h5_1">Followers</h5>
                <hr/>
                <div className="follow_3">
                {
                    users.map(user => (
                        <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers} text="24px" width="35px" height="35px">
                            {
                                auth.user._id !== user._id && <Follow user={user} width="130px" marginLeft="140px" marginTop="3px"/>
                            }
                            </UserCard>
                        
                    ))
                }
                </div>
                <div>
                <button className="editbtn1" onClick={() => setShowFollowers(false)}>X</button>
                </div>
            </div>
        </div>
    )
}
export default Followers;