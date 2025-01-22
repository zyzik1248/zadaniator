import React, { useState } from 'react';
import "./Home.scss"
import TimeCard from '../component/cards/TimeCard.tsx';
import CreateCard from '../component/cards/CreateCard.tsx';
import Modal from '../component/modals/Modal.tsx';
import AddTeam from '../component/teams/AddTeam.tsx';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="home">
            <div className="first-row">
                <TimeCard />
            </div>
            <div className="second-row">
                <CreateCard onClick={()=>setIsOpen(true)} title="add teams" />
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="add team">
                <AddTeam setOpenModal={setIsOpen} />
            </Modal>
        </div>
    )
}

export default Home