import React from 'react';
import '../styles/Homepage.css';

export const Home = () => {
    return (
        <div className='home-container'>
            <header className='home-header'>
                <div class='home-header-content'>
                    <h1>Welcome to the AppHub</h1>
                    <div class='description'>
                        <p>Track all your job applications in one place!</p>
                    </div>
                </div>
                <div class='picture'></div>
            </header>

            <section className='features'>
                <h2>Features</h2>
                <ul>
                    <li>Register and manage your job applications easily.</li>
                    <li>
                        Keep track of your application status and deadlines.
                    </li>
                    <li>
                        View and update details as you progress through the
                        hiring process.
                    </li>
                </ul>
            </section>
        </div>
    );
};
