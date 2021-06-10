import React from 'react'
import '../../pages/message.css'
import LeftSide from '../../pages/message/LeftSide'
import RightSide from '../../pages/message/RightSide'
export function Message() {
    return (
        <div className="index_1">
            <div className="index_1_1">
                <LeftSide/>
            </div>
            <div className="index_2">
                <RightSide/>
            </div>
        </div>
    )
}

export default Message;