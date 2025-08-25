import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    const authContextValue = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={{ authContextValue }}>
            {children}
        </AuthContext.Provider>
    );
}