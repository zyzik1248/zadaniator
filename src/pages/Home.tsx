import React, { useContext } from 'react';
import "./Home.scss"
import TimeCard from '../component/cards/TimeCard.tsx';
import Card from '../component/cards/Card.tsx';
import Table from '../component/table/Table.tsx';
import { Context } from '../component/context/ContextApi.ts';
import { IData } from '../types.ts';
import TasksBoxes from '../component/tasks/TasksBoxes.tsx';

const Home = () => {
    const { data } = useContext(Context)

    return (
        <div className="home">
            <div className="first-row">
                <TimeCard />
            </div>
            <div className="second-row">
                <Card title="Teams" className="card-home">
                    <Table
                        body={
                            data.sort((a: IData, b: IData) => (a.id || 0) - (b.id || 0)).map(d => ({ id: d.id, name: d.name }))
                        }
                    />
                </Card>
                <Card className="card-tasks card-home" title="Tasks">
                    <TasksBoxes column />
                </Card>
            </div>
        </div>
    )
}

export default Home