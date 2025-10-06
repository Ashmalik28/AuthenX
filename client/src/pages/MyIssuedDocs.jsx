import React, { useContext } from 'react'
import { Button } from '../components';

import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"

const MyIssuedDocs = () => {
    const {currentAccount} = useContext(TransactionContext)




    const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full inline-block";
    const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
    };

    return (
        <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
        </span>
    );
    };

    return (
        <div className='w-screen h-screen flex flex-col text-white'>
            <div className='w-full bg-white fixed top-0 flex justify-between items-center px-2 h-[60px]'>
                <div className='w-40 h-10'>
                    <img src={logo} alt="logo" className='w-40 h-10 cursor-pointer' />
                </div>
                <div className='flex justify-center items-center'>
                    <div className='text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    {shortenAddress(currentAccount)}</div>
                    <div className='border-1 rounded-full h-12 w-12 bg-gray-700 flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='flex flex-1 h-screen mt-[60px] bg-gray-300'> 
                 <Sidebar />
                 <div className='flex ml-72 w-full'>
                    <div className='bg-gray-700 w-3/5 my-6 ml-6 mr-4 flex items-center h-12 rounded-full px-6 transition-all duration-300 ease-in-out focus-within:bg-gray-800'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                      </svg>
                      <input type="text" placeholder='Search document by Recipient Name or wallet Address' className='text-white placeholder:text-white text-lg outline-none rounded-full w-full p-3' />
                    </div>
                    <div className='flex gap-2 bg-blue-500 h-12 px-4 py-2 mt-6 hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-full items-center'>
                        <div className='text-white'>Filters</div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                          </svg>
                        </div>
                    </div>
                    <div>

                    </div>
                 </div>
                 
            </div>
        </div>
    )
}

export default MyIssuedDocs;


