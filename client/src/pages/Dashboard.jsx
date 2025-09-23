
import React from 'react'
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';
import logout from '../components/logout';

const Dashboard = () => {
    return (
        <div className='w-screen h-screen bg-blue-500 text-5xl flex flex-col text-white'>
         <div className='w-full h-14 bg-white flex justify-end'>
            <Button onClick={(logout)} variant="primary" size="md" className="before:bg-white rounded-full w-24 m-2 justify-center text-lg  outline-blue-400 flex gap-2 items-center">
            Logout
            </Button>
         </div>
         <div className=' flex flex-1 justify-center h-full items-center text-4xl text-white'>Hi this is a dashboard page</div>
        </div>
    )
}

export default Dashboard;
