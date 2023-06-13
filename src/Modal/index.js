import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';

function Modal({children}) {
    return ReactDOM.createPortal(   /* primer argumento indica todo lo que se transportará y, en el segundo argumento, dónde se lo enviará */
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal')
    );
}

export {Modal};