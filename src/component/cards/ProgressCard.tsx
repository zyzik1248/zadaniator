import React from 'react';
import "./Cards.scss"
import Progressbar from '../progressbar/Progressbar.tsx';

interface IProps {
    progress?: number
}

const ProgressCard: React.FC<IProps> = ({ progress = 0 }) => {


    return (
        <div className="small-card progress-card">
            <h3 className="name">Today's progress</h3>
            <div className="progress-wrapper">
                <Progressbar size={48} stroke={5} progress={progress} background="#BBBBBB" color="#151515"/>
            </div>
        </div>
    )
}

export default ProgressCard