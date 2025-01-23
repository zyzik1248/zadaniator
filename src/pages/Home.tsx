import React from 'react';
import "./Home.scss"
import Card from '../component/cards/Card.tsx';
import TimeCard from '../component/cards/TimeCard.tsx';
import ProgressCard from '../component/cards/ProgressCard.tsx';
import Tasks from '../component/tasks/Tasks.tsx';

const Home = () =>{
    return(
        <div className="home">
            <div className="first-row">
                <TimeCard/>
                <ProgressCard/>
            </div>
            <div className="second-row">
                <Card title="Teams"></Card>
                <Tasks/>
                <Card title="Completed Tasks"></Card>
            </div>
        </div>
    )
}

export default Home