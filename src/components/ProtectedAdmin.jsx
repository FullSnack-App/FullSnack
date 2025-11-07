import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ProtectedAminRoute = ({ children }) => {
    const { isAuthenticated, isLoading, role } = useAuth();
    const location = useLocation();
    
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast.error('Please log in as admin to access this page');
        } else if (!isLoading && isAuthenticated && role !== 'admin') {
            toast.error('You do not have admin privileges');
        }
    }, [isLoading, isAuthenticated, role]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} state={{ openAuthModal: true }} replace />;
    }

    if (role !== 'admin') {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children;
};

export default ProtectedAminRoute;
