import React, { useState, useEffect } from 'react';
import "./Cards.scss"
import { getDayOfWeek, getOrdinalSuffix, getTime } from '../../utils/index.ts';

const TimeCard = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="small-card time-card">
            <h3 className="week">{getDayOfWeek(date)}, <span className="day">{date.getDate()}</span>{getOrdinalSuffix(date.getDate())}</h3>
            <div className="time-wrapper">
                <h5 className="time">{getTime(date)}</h5>
            </div>
        </div>
    )
}

export default TimeCard