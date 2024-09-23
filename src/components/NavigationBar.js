import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavigationBar.css';

export const NavigationBar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className='navigation-bar'>
            <div className='nav-left'>
                <div className='nav-logo'>
                    <h2>
                        <Link to='/'>AppHub</Link>
                    </h2>
                </div>
                <ul className='nav-links'>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to='/dashboard'>Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/resume-tailor'>Resume Tailor</Link>
                            </li>
                            <li>
                                <Link to='/cv-generator'>CV Generator</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/features'>Features</Link>
                            </li>
                            <li>
                                <Link to='/pricing'>Pricing</Link>
                            </li>
                            <li>
                                <Link to='/resources'>Resources</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className='nav-actions'>
                {isAuthenticated ? (
                    <button
                        className='nav-button logout-button'
                        onClick={onLogout}
                    >
                        Log Out
                    </button>
                ) : (
                    <>
                        <Link to='/log-in' className='nav-button login-button'>
                            Log In
                        </Link>
                        <Link
                            to='/register'
                            className='nav-button register-button'
                        >
                            Register Now
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
