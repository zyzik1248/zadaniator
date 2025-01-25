import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAdmin } from '../utils/jwtFormatter.ts';

interface IProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<IProps> = ({ children }) => {
    if (!isUserAdmin()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute; 