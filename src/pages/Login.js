import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL_PROD,
                formData
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                    'An error occurred. Please try again.'
            );
        }
        setError('');
        alert('Logged in successfully!');
    };

    return (
        <div className='login-container'>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <h2>Login Here</h2>
                <div className='input-group'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Enter your username'
                        required
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                        required
                    />
                </div>
                <button type='submit'>Login</button>
                <div style={{ marginTop: '1em' }}>
                    <t>
                        Don't have an account? Register{' '}
                        <Link to='/register'>here</Link>
                    </t>
                </div>
            </form>
        </div>
    );
};

export default Login;
