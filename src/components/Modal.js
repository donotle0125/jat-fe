// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css'; // Optional: Create a separate CSS file for styling

const Modal = ({ show, onClose, children }) => {
    if (!show) return null; // Don't render the modal if show is false

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='close-button' onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
