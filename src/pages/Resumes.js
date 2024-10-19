import React, { useState } from 'react';
import { uploadResume } from '../services/api'; // Import the API call
import '../styles/Resumes.css';

const Resumes = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        try {
            setUploading(true);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', storedUserData.id);

            // Use the uploadResume API
            const response = await uploadResume(formData);

            if (response.status === 200 || response.status === 201) {
                setUploadSuccess(true);
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        const validFileTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'];

        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (validFileTypes.includes(fileExtension)) {
            setFile(selectedFile);
        }
    };

    return (
        <div className='resume-container'>
            <form onSubmit={handleSubmit}>
                <h1>Upload Your Resume</h1>
                <input
                    type='file'
                    accept='.pdf, .doc, .docx, .txt, .rtf, .odt'
                    onChange={handleChange}
                />
                <button type='submit' disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {uploading && (
                <div className='progress-container'>
                    <div
                        className='progress-bar'
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}

            {uploadSuccess && <p>File uploaded successfully!</p>}
        </div>
    );
};

export default Resumes;
