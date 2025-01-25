import React from 'react';
import "./modal.scss"
import close from "./../../assets/close.png"

interface IProps {
    children: React.node
    isOpen?: boolean
    title: string
    setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<IProps> = ({ children, isOpen, setIsOpen, title }) => {

    return (
        <div className={`modal-wrapper ${isOpen ? "open" : ""}`}>
            <div onClick={() => setIsOpen(false)} className="modal-cover"></div>
            <div className="modal-content">
                <img onClick={() => setIsOpen(false)} className="close-modal" src={close} alt="close" />
                <h3 className="title">{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default Modal