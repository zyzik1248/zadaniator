import React from 'react';
import "./modal.scss"

interface IProps {
    children: React.node
    isOpen?: boolean
    title: string
    setIsOpen: (isOpen: boolean)=>void
}

const Modal: React.FC<IProps> = ({ children, isOpen, setIsOpen, title }) => {

    return (
        <div className={`modal-wrapper ${isOpen ? "open" : ""}`}>
            <div></div>
            <div onClick={()=>setIsOpen(false)} className="modal-cover"></div>
            <div className="modal-content">
                <h3 className="title">{title}</h3>
                <div className="divider"></div>
                {children}
            </div>
        </div>
    )
}

export default Modal