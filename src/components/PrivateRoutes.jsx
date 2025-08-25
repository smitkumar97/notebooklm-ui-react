import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { authContextValue } = useAuth();
    return (
        authContextValue && authContextValue.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes


