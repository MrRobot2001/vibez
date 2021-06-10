import React from 'react'
import '../../pages/message.css'
import LeftSide from '../../pages/message/LeftSide'
export function Index() {
    return (
        <div className="index_1">
            <div className="index_1_1">
                <LeftSide/>
            </div>
            <div className="index_2">
                <div className="index_2_2">
                    <i className="fab fa-facebook-messenger i_11"/>
                    <h4 className="facebook_h4">Messenger</h4>
                </div>
            </div>
        </div>
    )
}

export default Index;