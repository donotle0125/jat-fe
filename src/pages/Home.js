import React from 'react';
import '../styles/Home.css';

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
                <div class='container'>
                    <div class='box'>
                        <span></span>
                        <div class='content'>
                            <h2>Manage Your Applications Effortlessly</h2>
                            <p>
                                Keep all your job applications organized in one
                                place. Easily add, view, and update applications
                                as you progress through the hiring process
                            </p>
                        </div>
                    </div>
                    <div class='box'>
                        <span></span>
                        <div class='content'>
                            <h2>Stay on Top of Your Job Hunt</h2>
                            <p>
                                Never miss an important deadline. Track the
                                status of each application, set reminders, and
                                stay ahead of your job search
                            </p>
                        </div>
                    </div>
                    <div class='box'>
                        <span></span>
                        <div class='content'>
                            <h2>Insights and Analytics</h2>
                            <p>
                                Get valuable insights with analytics that help
                                you understand your job search patterns and
                                identify opportunities for improvement
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div class='background'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};
