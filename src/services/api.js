// src/services/api.js
import axios from 'axios';

const API_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL_PROD;

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const loginUser = (credentials) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL_PROD}/login`,
        credentials,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
};
