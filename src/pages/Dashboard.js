import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ userData }) => {
    console.log('dashboard: ', userData);
    return <div className='dashboard-container'>this is your dashboard</div>;
};

export default Dashboard;
