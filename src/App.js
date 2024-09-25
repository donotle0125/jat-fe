import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import { NavigationBar } from './components/NavigationBar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [userData]);

    const handleLogout = () => {
        // Add logout logic here, e.g., clearing tokens
        setUserData({});
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <>
            <NavigationBar
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/login'
                    element={<Login setUserData={setUserData} />}
                />
                <Route
                    path='/dashboard'
                    element={<Dashboard userData={userData} />}
                />
            </Routes>
        </>
    );
}

export default App;
