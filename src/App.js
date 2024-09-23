import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { NavigationBar } from './components/NavigationBar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        // Add logout logic here, e.g., clearing tokens
        setIsAuthenticated(false);
    };
    return (
        <Router>
            <NavigationBar
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
