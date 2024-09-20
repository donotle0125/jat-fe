import React from 'react';

const Home = () => {
    return (
        <div className='home-container'>
            <header className='home-header'>
                <h1>Welcome to the AppHub</h1>
                <p>Track all your job applications in one place!</p>
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

export default Home;
