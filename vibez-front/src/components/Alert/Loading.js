import React from 'react';
import './Loading.css'
export function Loading() {
    
    return (
        <div className="loading"
            style={{background:"#0008", color:"white",top: "0",left: "0",zIndex:50,width:"100%",height:"100%",position: "fixed"}}>
                <svg width="205" height="250" viewBox="0 0 40 50">
                    <polygon stroke="#fff" strokeWidth="1" fill="none"
                    points="20,1 40,40 1,40" />
                    <text fill="#fff" x="5" y="47">LOADING</text>
                </svg>
        </div>
    )
}

export default Loading;