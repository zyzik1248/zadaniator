import React from 'react';
import './Loader.scss';

interface LoaderProps {
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Ładowanie...' }) => {
    return (
        <div className="loader-container">
            <div className="spinner" />
            <span className="loader-text">{text}</span>
        </div>
    );
};

export default Loader; 