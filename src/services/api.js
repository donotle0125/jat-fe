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
    return axios.post(`${API_URL}/login`, credentials, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const getJobApplications = (userId) => {
    return axios.get(`${API_URL}/jobs`, {
        params: { user_id: userId },
    });
};

export const updateJobApplicationStatus = (jobAppData, jobId) => {
    return axios.put(`${API_URL}/jobs/${jobId}`, jobAppData, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const addNewJobApplication = (jobAppData) => {
    return axios.post(`${API_URL}/jobs`, jobAppData, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const deleteJobApplication = (jobId) => {
    return axios.delete(`${API_URL}/jobs/${jobId}`, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const uploadResume = (formData) => {
    return axios.post(`${API_URL}/resume-upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
