import { useNavigate } from "react-router-dom";
import AdminCheck from "../protectedRoute/AdminProtectedRoute";
import { useEffect } from "react";
import logo from "../../images/AuthenXLogo.png"
import {shortenAddress} from "../utils/shortenAddress"
import { TransactionContext } from '../context/TransactionContext';
import React, { useContext } from 'react'


const Admin = () => {
    const {currentAccount} = useContext(TransactionContext);
    const navigate = useNavigate();
    const isAdmin = AdminCheck();

    const kycRequests = [
  {
    orgName: 'TechNova Labs',
    orgType: 'Software Solutions',
    email: 'contact@technova.io',
    website: 'https://technova.io',
    country: 'India',
    contactPerson: 'Arjun Mehta',
    contactPersonEmail : "abc@gmail.com",
    document: 'https://ipfs.io/ipfs/QmExample1',
  },
  {
    orgName: 'GreenGrid Energy',
    orgType: 'Renewable Energy',
    email: 'info@greengrid.com',
    website: 'https://greengrid.com',
    country: 'Germany',
    contactPerson: 'Sophia Müller',
    contactPersonEmail : "abc@gmail.com",
    document: 'https://ipfs.io/ipfs/QmExample2',
  },
  {
    orgName: 'FinSure Capital',
    orgType: 'Fintech',
    email: 'support@finsure.cap',
    website: 'https://finsure.cap',
    country: 'USA',
    contactPerson: 'David Carter',
    contactPersonEmail : "abc@gmail.com",
    document: 'https://ipfs.io/ipfs/QmExample3',
  },
  {
    orgName: 'MediCure Health',
    orgType: 'Healthcare',
    email: 'admin@medicure.org',
    website: 'https://medicure.org',
    country: 'Singapore',
    contactPerson: 'Lina Wong',
    contactPersonEmail : "abc@gmail.com",
    document: 'https://ipfs.io/ipfs/QmExample4',
  },
];

const issuedDocuments = [
  {
    name: "Aarav Patel",
    wallet: "0x8b12...f3a9",
    docType: "Business License",
    orgName: "TechNova Labs",
    orgWallet: "0x5f8d...154f",
    issuedAt: "Oct 8, 2025",
    hash: "0xa7f12b9cd4e9f1a8d4c3a5b76f89d1234a8fcd67",
    status: "Completed",
    link: "https://ipfs.io/ipfs/QmDocExample1",
  },
  {
    name: "Sophia Müller",
    wallet: "0x6c2a...7f1b",
    docType: "ISO Certification",
    orgName: "GreenGrid Energy",
    orgWallet: "0x3f0f...6a8e",
    issuedAt: "Oct 7, 2025",
    hash: "0xb4d19e7f8a5a9cde91234af678f1d23b45ed789c",
    status: "Pending",
    link: "https://ipfs.io/ipfs/QmDocExample2",
  },
  {
    name: "David Carter",
    wallet: "0x4a91...a8da",
    docType: "Financial Audit Report",
    orgName: "FinSure Capital",
    orgWallet: "0x7d24...5def",
    issuedAt: "Oct 5, 2025",
    hash: "0xc5a3d4b2e1a8f9d0b6c712e5f678a9dcb4f23489",
    status: "Failed",
    link: "https://ipfs.io/ipfs/QmDocExample3",
  },
  {
    name: "Lina Wong",
    wallet: "0x1d23...ac89",
    docType: "Medical License",
    orgName: "MediCure Health",
    orgWallet: "0x9a8c...12d4",
    issuedAt: "Oct 2, 2025",
    hash: "0xd9f234b1e5c7a8f0b2e4c8d1a6789bde234f12a3",
    status: "Completed",
    link: "https://ipfs.io/ipfs/QmDocExample4",
  },
];



    useEffect(() => {
        if(isAdmin === false){
            alert("You are not an Admin");
            navigate("/dashboard");
        }
    }, [isAdmin , navigate]);

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


    if (isAdmin === null) {
        return (
        <div className="w-screen h-screen flex justify-center items-center">
            <p>Checking admin privileges...</p>
        </div>
        );
    }

    if (!isAdmin) return null;

     return (
    <div className='w-full h-screen flex flex-col'>
            <div className='w-full bg-white fixed border-1 border-b-gray-300 top-0 flex justify-between items-center px-2 h-[60px]'>
                <div className='w-40 h-10'>
                    <img src={logo} alt="logo" className='w-40 h-10 cursor-pointer' />
                </div>
                <div className='flex justify-center text-white items-center'>
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
            <div className="bg-gray-200 flex-1 mt-[60px] flex-col flex h-screen">
                <div className='flex flex-col flex-1 h-fit mx-5 mt-5 bg-white rounded-2xl'>
                 <div className='w-full flex gap-3 bg-blue-700 rounded-t-2xl items-center h-24 p-6'>
                 <div className='bg-[#4d72e1] flex items-center justify-center text-white px-3 py-3 rounded-lg'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                 </svg>
                 </div>
                 <div className='flex flex-col'>
                    <div className='text-white text-3xl font-semibold'>KYC Requests</div>
                    <div className='text-white text-base'>Review and approve organization verification requests</div>
                 </div>
                 </div>
                 <div className="grid grid-cols-7 gap-4 p-3 px-4 border-b-2 border-gray-200 text-left text-lg bg-gray-100 font-semibold text-gray-700 tracking-wider">
                            <div>OrgName</div>
                            <div>OrgType</div>
                            <div>Email & Website</div>
                            <div>Country</div>
                            <div>Contact Person</div>
                            <div>Document</div>
                            <div>Actions</div>
                </div>
                <div>
                {kycRequests.map((req, index) => (
                <div
                    key={index}
                    className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-gray-200 text-gray-800 items-center hover:bg-gray-50 transition"
                >
                    <div className="text-lg font-semibold">{req.orgName}</div>
                    <div>{req.orgType}</div>
                    <div>
                    <p className="text-sm font-semibold">{req.email}</p>
                    <p className="text-xs text-blue-600">{req.website}</p>
                    </div>
                    <div>{req.country}</div>
                    <div >
                    <p className="text-sm font-semibold">{req.contactPerson}</p>
                    <p className="text-xs text-blue-600">{req.contactPersonEmail}</p>
                    </div>
                    <div>
                    <a
                        href={req.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                    >
                        View Doc
                    </a>
                    </div>
                    <div className="flex gap-2 justify-start">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Reject
                    </button>
                    </div>
                </div>
                ))}
                </div>
                
                </div>
                <div className="flex flex-col flex-1 h-fit mx-5 mt-5 bg-white rounded-2xl">
                <div className="w-full flex gap-3 bg-blue-700 rounded-t-2xl items-center h-24 p-6">
                    <div className="bg-[#4d72e1] flex items-center justify-center text-white px-3 py-3 rounded-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                   </svg>
                    </div>
                    <div className="flex flex-col">
                    <div className="text-white text-3xl font-semibold">Recent Issued Documents</div>
                    <div className="text-white text-base">View and manage recently issued documents</div>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 p-3 px-4 border-b-2 border-gray-200 text-left text-lg bg-gray-100 font-semibold text-gray-700 tracking-wider">
                    <div>Name & Wallet</div>
                    <div>Doc Type</div>
                    <div>Org Name & Wallet</div>
                    <div>Issued At</div>
                    <div>Hash</div>
                    <div>Status</div>
                    <div>View Document</div>
                </div>
                <div>
                    {issuedDocuments.map((doc, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-gray-200 text-gray-800 items-center hover:bg-gray-50 transition"
                    >
                        {/* Name & Wallet */}
                        <div>
                        <p className="text-sm font-semibold">{doc.name}</p>
                        <p className="text-xs text-blue-600">{doc.wallet}</p>
                        </div>

                        {/* Doc Type */}
                        <div>{doc.docType}</div>

                        {/* Org Name & Wallet */}
                        <div>
                        <p className="text-sm font-semibold">{doc.orgName}</p>
                        <p className="text-xs text-blue-600">{doc.orgWallet}</p>
                        </div>

                        {/* Issued At */}
                        <div>{doc.issuedAt}</div>

                        {/* Hash */}
                        <div className="truncate text-sm">{doc.hash}</div>

                        {/* Status */}
                        <div>
                        <span
                            className={`px-2 py-1 rounded-md text-sm font-medium ${
                            doc.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : doc.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                            {doc.status}
                        </span>
                        </div>

                        {/* View Document */}
                        <div>
                        <a
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-sm"
                        >
                            View Doc
                        </a>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

            </div>

            
        </div>
    );
    };

export default Admin;