import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, role } = useAuth();
    
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast.error('Please log in to access this page');
        }
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} state={{ openAuthModal: true }} replace />;
    }
    
    if (role === "admin") {
        return <Navigate to={ROUTES.ADMIN} replace />;
    }

    return children;
};

export default ProtectedRoute;
