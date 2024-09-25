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
import ProtectedRoute from './components/ProtectedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setIsAuthenticated(true);
            localStorage.setItem('userData', JSON.stringify(userData));
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem('userData');
        }
    }, [userData]);

    const handleLogout = () => {
        // Add logout logic here, e.g., clearing tokens
        setUserData({});
        setIsAuthenticated(false);
        localStorage.removeItem('userData');
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
                <Route
                    path='/register'
                    element={
                        <UnauthenticatedRoute isAuthenticated={isAuthenticated}>
                            <Register />
                        </UnauthenticatedRoute>
                    }
                />
                <Route
                    path='/login'
                    element={
                        <UnauthenticatedRoute isAuthenticated={isAuthenticated}>
                            <Login setUserData={setUserData} />
                        </UnauthenticatedRoute>
                    }
                />
                <Route
                    path='/user/dashboard'
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Dashboard userData={userData} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
