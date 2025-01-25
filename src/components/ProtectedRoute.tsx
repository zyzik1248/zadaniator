import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeJWT } from '../utils/jwtFormatter';

interface IProps {
    children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<IProps> = ({ children }) => {
    const user = decodeJWT();
    
    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedAdminRoute; 