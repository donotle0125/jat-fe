import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import AcceptTerms from '../components/AcceptTerms';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        username: '',
        email: '',
        phone: '',
        job_title: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting');
        try {
            console.log(formData);
            const response = await axios.post(
                process.env.REACT_APP_API_URL_PROD,
                formData
            );
            setMessage(response.data.message);
            setFormData({
                name: '',
                birthday: '',
                username: '',
                email: '',
                phone: '',
                job_title: '',
                password: '',
            });
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                    'An error occurred. Please try again.'
            );
        }
    };

    const handleCheckboxChange = (checked) => {
        setIsChecked(checked);
    };

    return (
        <div className='signup-form-container'>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className='input-box'>
                    <label htmlFor='fullname'>Full Name:</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Full Name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='jobtitle'>Job Title:</label>
                    <input
                        type='text'
                        name='job_title'
                        placeholder='Job Title'
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='birthday'>Birthday:</label>
                    <input
                        type='date'
                        name='birthday'
                        placeholder='Birthday (YYYY-MM-DD)'
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='phonenumber'>Phone Number:</label>
                    <input
                        type='text'
                        name='phone'
                        placeholder='Phone Number'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='policy'>
                    <AcceptTerms
                        isChecked={isChecked}
                        onCheckboxChange={handleCheckboxChange}
                    />
                </div>
                <div className='input-box button'>
                    <input
                        type='submit'
                        value='Register Now'
                        disabled={!isChecked} // Should disable if terms are not accepted
                    />
                </div>
                <div style={{ marginTop: '1em' }}>
                    <p style={{ fontSize: '14px' }}>
                        Already have an account? Login{' '}
                        <Link to='/login'>here</Link>
                    </p>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
