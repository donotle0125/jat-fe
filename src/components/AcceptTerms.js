// src/components/AcceptTerms.js
import React, { useState } from 'react';
import Modal from './Modal';
import TermsAndConditions from './TermsAndConditions';
import '../styles/AcceptTerms.css';

const AcceptTerms = ({ isChecked, onCheckboxChange }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        onCheckboxChange(checked);
    };

    return (
        <div className='policy'>
            <div className='checkbox-container'>
                <input
                    type='checkbox'
                    id='acceptTerms'
                    checked={isChecked} // Bind checked state to parent state
                    onChange={handleCheckboxChange} // Handle checkbox change
                />
                <label htmlFor='acceptTerms'>
                    I accept all{' '}
                    <a onClick={handleOpenModal}>terms & conditions</a>
                </label>
            </div>

            {/* Modal Popup */}
            <Modal show={showModal} onClose={handleCloseModal}>
                <TermsAndConditions />
            </Modal>
        </div>
    );
};

export default AcceptTerms;
