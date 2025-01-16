import React from 'react';
import "./Home.scss"
import TimeCard from '../component/cards/TimeCard.tsx';
import ProgressCard from '../component/cards/ProgressCard.tsx';

const Home = () =>{
    return(
        <div className="home">
            <div className="first-row">
                <TimeCard/>
                <ProgressCard/>
            </div>
        </div>
    )
}

export default Home