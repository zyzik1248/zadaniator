import React, { useEffect, useRef } from 'react';
import "./Progressbar.scss"

interface IProps {
    progress?: number,
    size?: number,
    stroke?: number,
    background?: string,
    color?: string
}

const Progressbar: React.FC<IProps> = ({ progress = 0, size = 120, stroke=10, background="#e6e6e6", color="#3498db" }) => {
    const ref = useRef()

    useEffect(() => {
        if(ref.current){
            const radius = ref.current.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
      
            ref.current.style.strokeDasharray = circumference;
            ref.current.style.strokeDashoffset = circumference - (progress / 100) * circumference;
        }
    }, [progress, size, ref, stroke, background, color]);

    return (
        <svg className="progress-circle" width={size} height={size}>
            <circle stroke={background} strokeWidth={stroke} className="background" cx={size/2} cy={size/2} r={size/2 -stroke} />
            <circle stroke={color} strokeWidth={stroke} ref={ref} className="progress" cx={size/2} cy={size/2} r={size/2 -stroke} />
        </svg>
    )
}

export default Progressbar