import React from 'react';
import "./Home.scss"
import TimeCard from '../component/cards/TimeCard.tsx';

const Home = () =>{
    return(
        <div className="home">
            <div className="first-row">
                <TimeCard/>
            </div>
        </div>
    )
}

export default Home