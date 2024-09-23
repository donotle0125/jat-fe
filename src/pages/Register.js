import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

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

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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

    return (
        <div className='signup-form-body'>
            <div className='signup-form-container'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div class='input-box'>
                        <input
                            type='text'
                            name='name'
                            placeholder='Full Name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='text'
                            name='job_title'
                            placeholder='Job Title'
                            value={formData.job_title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='date'
                            name='birthday'
                            placeholder='Birthday (YYYY-MM-DD)'
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='input-box'>
                        <input
                            type='text'
                            name='phone'
                            placeholder='Phone Number'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class='policy'>
                        <input type='checkbox' />
                        <h3>I accept all terms & condition</h3>
                    </div>
                    <div class='input-box button'>
                        <input type='submit' value='Register Now' />
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Register;
