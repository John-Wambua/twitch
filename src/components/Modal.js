import React from "react";
import ReactDOM from 'react-dom'

const Modal = props=>{
    //React Portal -- displaying a modal
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className={"ui dimmer modals visible active"}>
            <div onClick={e=>e.stopPropagation()} className={"ui standard modal visible active"}>
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        //Reference to the element that we want to render to portal into
        //Create a new div in index.html
        document.querySelector('#modal')
    )
}
export default Modal;