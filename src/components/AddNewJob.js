import React, { useState } from 'react';
import '../styles/AddNewJob.css';
import { addNewJobApplication } from '../services/api';
import Select from 'react-select';

const AddNewJob = ({ userData, handleCloseModal, onJobAdded }) => {
    const [formData, setFormData] = useState({
        user_id: userData.id,
        company_name: '',
        job_title: '',
        job_url: '',
        date_applied: '',
        status: '',
        keywords: '',
    });
    const [message, setMessage] = useState('');

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Applied', label: 'Applied' },
        { value: 'Interview', label: 'Interview' },
        { value: 'Offer', label: 'Offer' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await addNewJobApplication(formData);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                setMessage(response.data.message);

                setFormData({
                    user_id: userData.id,
                    company_name: '',
                    job_title: '',
                    job_url: '',
                    date_applied: '',
                    status: '',
                    keywords: '',
                });

                onJobAdded(response.data.job);

                setTimeout(() => {
                    setMessage('');
                    handleCloseModal();
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(
                error.response?.data?.error ||
                    'An error occurred. Please try again.'
            );
        }
    };

    return (
        <div className='container'>
            <div className='text'>Add a New Job Application</div>
            {message && <p>{message}</p>}
            <form action='#' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='input-data'>
                        <input
                            type='text'
                            name='job_title'
                            value={formData.job_title}
                            onChange={handleInputChange}
                            required
                        />
                        <div className='underline'></div>
                        <label htmlFor='job_title'>Title</label>
                    </div>
                    <div className='input-data'>
                        <input
                            type='text'
                            name='company_name'
                            value={formData.company_name}
                            onChange={handleInputChange}
                            required
                        />
                        <div className='underline'></div>
                        <label htmlFor='company_name'>Company</label>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-data'>
                        <input
                            type='date'
                            name='date_applied'
                            id='date_applied'
                            value={formData.date_applied}
                            onChange={handleInputChange} // Handle like the other inputs
                            required
                        />
                        <div className='underline'></div>
                    </div>
                    <div className='input-data status'>
                        <Select
                            options={options}
                            onChange={(selectedOption) =>
                                setFormData({
                                    ...formData,
                                    status: selectedOption.value,
                                })
                            }
                            required
                        />
                        <div className='underline'></div>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-data'>
                        <input
                            type='text'
                            name='job_url'
                            value={formData.job_url}
                            onChange={handleInputChange}
                        />
                        <div className='underline'></div>
                        <label htmlFor='job_url'>Job URL</label>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='input-data'>
                        <input
                            type='text'
                            name='keywords'
                            value={formData.keywords}
                            onChange={handleInputChange}
                            required
                        />
                        <div className='underline'></div>
                        <label htmlFor='keywords'>Keywords</label>
                    </div>
                </div>
                <div className='form-row submit-btn'>
                    <div className='input-data'>
                        <div className='inner'></div>
                        <input type='submit' value='Submit' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewJob;
