import React from 'react'
import './Toast.css'
export function Toast({msg,handleShow,bg}) {
  const buttonx = () => {
    document.getElementById('buttonx').style.display = "none";
    handleShow();
  }
  return (
    <div className="modal" id="buttonx" style={{'backgroundColor':`${bg}`}}>
      <strong className="vibez">Vibez</strong>
      <small className="buttonx"  onClick={buttonx}>X</small>
      <div className="modal-body">
        {msg.body}
      </div>
    </div>
  )
}
export default Toast;
