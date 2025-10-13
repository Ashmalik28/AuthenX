import React, { useContext } from 'react'
import { Button } from '../components';

import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect , useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import QRCodeDisplay from "../components/QRCodeDisplay"

const Verify = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [kycStatus, setKycStatus] = useState("Pending");
    const {currentAccount} = useContext(TransactionContext);
    const [selectedFile , setSelectedFile] = useState(null);
    const [isDragging , setIsDragging] = useState(false);
    const [verified , setVerified] = useState(true);
    const qrRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
        }
    }
    
    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = "AuthenX_QR_Code.png";
        link.click();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if(file){
            setSelectedFile(file);
        }
    }

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
                 <div className='flex flex-1 ml-72 mr-5 mb-5'>
                    <div className='ml-5 mt-5 grid grid-cols-3 gap-5 w-full'>
                    <div className='col-span-2 bg-white p-4 pb-0 rounded-xl flex flex-col'>
                    <div className='text-black text-6xl font-semibold flex justify-center'>Verify Document</div>
                    <div className="mt-6 mb-6 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="fullName" className='text-black font-semibold'>Your Name *</label>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input className="w-70 outline-none mt-0 text-black " type="text" placeholder="Your full name" id='fullName' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-black font-semibold'>Email Address *</label>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input className="w-70 outline-none mt-0 text-black " type="text" placeholder="Your email address" id='email' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-0 mb-6 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    <label htmlFor="document" className='text-black font-semibold'>Upload Document *</label>
                    <div onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => document.getElementById('document').click()} className={`flex gap-0 border-dashed cursor-pointer text-blue-500 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"}   w-2/3 h-40 border-2 outline-gray-400 rounded-xl p-3`}> 
                    <div className='flex flex-col justify-center items-center w-full gap-2'>
                     {selectedFile ? 
                     <div className='flex flex-col items-center'>
                        <div className='flex gap-2 items-center'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-16">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                        <div>
                        <p className='text-green-600 font-bold'>Upload Successful !</p>
                        <p className="text-gray-700 font-semibold">File name : {selectedFile.name}</p>
                        </div>
                     </div>
                     <button className='text-white bg-green-600 p-1 rounded-xl mt-2 w-2/3 hover:bg-blue-500 transition-all duration-300 ease-in-out'>Upload Another File</button>
                     </div>
                     
                      : 
                     <div className='flex flex-col gap-2 w-full justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                         <p className="text-gray-600 font-medium text-center">
                         <span className="text-blue-600">Click here</span> to upload your file or drag and drop
                    </p>
                    <p className='text-gray-400 font-semibold'>Supported Format : PDF , JPG , JPEG , PNG</p></div> }
                    </div>
                    <input onChange={handleFileChange} className="hidden" name='document' accept='.pdf , .jpg , .jpeg , .png' type="file" placeholder="Your email address" id='document' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-0 flex gap-6 items-center flex-col">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    <label htmlFor="Result" className='text-black font-semibold'>Result</label>
                    <div className= {`flex flex-col gap-0 cursor-pointer ${verified ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"} w-2/3 h-40 border-2   rounded-xl p-2 items-center`}> 
                    {verified && ( 
                    <div className='flex flex-col items-center'>
                    <div className='text-3xl'>😊</div>
                    <div className='text-green-600 text-xl font-semibold mt-1'>Document Valid and Verified !</div>
                    <div className='text-gray-500 mt-2'>Document Hash : Dummy data</div>
                    <button className='bg-gray-700 mt-2 hover:bg-black py-1 px-3 rounded-xl'>Check Transaction on Blockchain Explorer</button> 
                    </div> )}
                    {!verified && (
                    <div className='flex flex-col items-center'>
                    <div className='text-3xl'>🙁</div>
                    <div className='text-red-600 text-xl font-semibold mt-1'>Document Invalid and Unverified !</div>
                    <div className='text-gray-500 mt-2'>Document Hash : Dummy data</div>
                    <button className='bg-gray-700 mt-2 hover:bg-black py-1 px-3 rounded-xl'>Check Transaction on Blockchain Explorer</button> 
                    </div>)}
                    </div>
                    </div>
                    <Button variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl w-1/2 justify-center mt-2 mb-0 outline-blue-400 flex gap-2 items-center">
                     Verify Document
                    </Button>
                    <div className='flex text-sm justify-center items-center gap-1'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                      
                      <div className='text-black'>Verification is powered by Ethereum Smart Contract</div>
                    </div>
                    
                    </div>
                    </div>
                    <div ref={qrRef} className='bg-white border-green-600 border-2 p-5 flex flex-col items-center rounded-xl h-fit'>
                    <div className='text-3xl text-black font-semibold'>
                    Verify with QR Code
                    </div>
                    <div className='flex justify-center w-full mt-8'><QRCodeDisplay /></div>
                    <p className="mt-8 w-2/3 text-gray-600 text-center text-sm">Scan this to instantly verify the document on our website</p>
                    <Button onClick={downloadQRCode} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl justify-center mt-5 mb-0 outline-blue-400 flex gap-2 items-center">
                    Download QR Code
                    </Button>
                    </div>
                    
                 </div>
                 </div>
            </div>
        </div>
    )
}

export default Verify;
