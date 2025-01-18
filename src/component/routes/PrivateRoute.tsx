import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { checkAuth } from '../../api/index.ts';

interface IProps {
    children: React.node
}

const PrivateRoute:React.FC<IProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    const fetch = async () => {
        try{
            await checkAuth()
            setIsAuth(true)
        } catch(error){
            navigate("/login")
        }

    }

    useEffect(() => {
        fetch()
    }, [])

    return(
        <>
            {isAuth && 
                children
            }
        </>
    )
};

export default PrivateRoute;