import React from "react";
import "../modal.css";

const Modal = (props) => {
    return (
        <div class="modal" id="modal">
            <h2>Modal Window</h2>
            {/* <div class="content">
                <img src={props.image.urls.regular} alt="unsplash pic"/>
            </div>
            <div class="actions">
                <button class="toggle-button" onClick={props.onClose}> Close </button>
            </div> */}
        </div>
    )
}

export default Modal;
