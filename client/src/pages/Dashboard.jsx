import React, { useContext } from 'react'
import { Button, Loader } from '../components';
import {ethers} from "ethers"
import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import { fetchOrgDetails } from '../../api';
import { useNavigate } from 'react-router-dom';
import { fetchDashboardStats } from '../../api';
import { fetchUserType } from '../../api';

const Dashboard = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [kycStatus, setKycStatus] = useState("Pending");
    const {currentAccount , getTransactionHistory} = useContext(TransactionContext);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [totalVerifications, setTotalVerifications] = useState(0);
    const [totalVerifiedOrgs, setTotalVerifiedOrgs] = useState(0);
    const [walletBalance, setWalletBalance] = useState("0");
    const navigate = useNavigate();
    const [transactionsData, setTransactionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("");
    const docsPerPage = 4;

    const totalTransactionData = Math.ceil(transactionsData.length/docsPerPage);
    const indexOfLastDoc = currentPage * docsPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
    const currentDocs = transactionsData.slice(indexOfFirstDoc, indexOfLastDoc);

   const handlePageChange = (page) => {
    setCurrentPage(page);
   }

   const nextPage = () => {
    if (indexOfLastDoc < transactionsData.length) {
      setCurrentPage(currentPage + 1);
    }
    };

     const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    };

    useEffect(() => {
    const getUserType = async () => {
      try {
        const data = await fetchUserType();
        if (data.success) {
          setUserType(data.type);
          setUserName(data.name);
        }

      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    getUserType();
    }, []);

    useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactionHistory();
        setTransactionsData(data.reverse());
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
    }, []);


    useEffect(() => {
    const fetchBalance = async () => {
      if (!currentAccount) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(currentAccount);
        const formatted = parseFloat(ethers.formatEther(balance)).toFixed(3);
        setWalletBalance(formatted);
      } catch (err) {
        console.error("Failed to fetch wallet balance:", err);
      }
    };

    fetchBalance();
   }, [currentAccount]);

    useEffect(() => {
    const getStats = async () => {
    try {
      const data = await fetchDashboardStats();
      if (data.success) {
        setTotalDocuments(data.data.totalDocuments);
        setTotalVerifications(data.data.totalVerifications);
        setTotalVerifiedOrgs(data.data.totalVerifiedOrgs);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
   };
   getStats();
   }, []);

     useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
    }, []);

     useEffect(() => {
        const fetchDetails = async () => {
        try {
          const res = await fetchOrgDetails();
          if (res.success && res.kycDetails) {
            setKycStatus(res.kycDetails.status);
          }
        } catch (err) {
          console.error("Failed to fetch org details:", err);
        }
       };
       fetchDetails();
       }, []);

    const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full inline-block";
    const statusClasses = {
        Approved: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
    };

    return (
        <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
        </span>
    );
    };

    const TransactionRow = ({ transaction }) => (
    <div className="grid grid-cols-4 items-center gap-4 py-3 px-4 border-b border-gray-200 hover:bg-gray-50 text-gray-700">
        <div className="font-medium flex justify-center text-gray-900">{transaction.date}</div>
        <div className='flex justify-center'>{transaction.action}</div>
        <div className='flex justify-center'>
        <StatusBadge status={transaction.status} />
        </div>
        <div className="font-mono flex justify-center text-sm text-gray-600">{shortenAddress(transaction.wallet)}</div>
    </div>
    );

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

            <div className='flex flex-1 h-full w-screen mt-[60px] bg-gray-300'> 
                 <Sidebar />
                <div className='flex flex-1 flex-col ml-72 mr-5 mb-5'>
                    <div className='grid grid-cols-4 gap-5 mt-5 ml-5'>
                        <div className=' bg-white rounded-xl text-black p-3'>
                            <div className='text-xl font-semibold'>Total Verifications</div>
                            <div className='mt-4 text-4xl font-bold'>{totalVerifications}</div>
                        </div>
                        <div className=' bg-white rounded-xl text-black p-3'>
                            <div className='text-xl font-semibold'>Total Documents Issued</div>
                            <div className='mt-4 text-4xl font-bold'>{totalDocuments}</div>
                        </div>
                        <div className=' bg-white rounded-xl text-black p-3'>
                            <div className='text-xl font-semibold'>Verified Organizations</div>
                            <div className='mt-4 text-4xl font-bold'>{totalVerifiedOrgs}</div>
                        </div>
                        <div className=' bg-white rounded-xl text-black p-3'>
                            <div className='text-xl font-semibold'>Wallet Balance</div>
                            <div className='mt-4 text-4xl font-bold'>{walletBalance} ETH</div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-5 mt-5 ml-5'>
                        <div className='bg-white rounded-xl p-6 col-span-2'>
                            <div className='flex flex-1 flex-col'>
                            <div className='text-black font-semibold text-2xl'>Quick Actions</div>
                            <div className='grid grid-cols-3 gap-5 mt-5'>
                            <div onClick={() => navigate("/verify")} className='bg-blue-100 hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-3'>
                                <div className='text-blue-500 flex flex-col justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-11">
                                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                </svg>
                                <div className='w-1/2 flex justify-center text-center text-black text-lg mt-1 font-semibold'>Verify Document</div>
                                </div>
                            </div>
                            <div onClick={() => navigate("/issue")} className='bg-blue-100  hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-3'>
                                <div className='text-blue-500 flex flex-col justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-11">
                                <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                </svg>
                                <div className='w-1/2 flex justify-center text-center text-black text-lg mt-1 font-semibold'>Issue Document</div>
                                </div>
                            </div>
                            <div onClick={() => navigate("/about")} className='bg-blue-100  hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-3'>
                                <div className='text-blue-500 flex flex-col justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-11">
                                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                </svg>
                                <div className='w-1/2 flex justify-center text-center text-black text-lg mt-1 font-semibold'>Detailed Guide</div>
                                </div>
                            </div>
                            
                            </div> 
                            <div className='text-black font-semibold text-2xl mt-4'>Recent Transactions</div>
                            <div className="grid grid-cols-4 gap-4 pb-3 px-4 border-b-2 border-gray-200 text-left text-lg font-semibold text-gray-500 tracking-wider mt-4">
                            <div className='flex justify-center gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            Date</div>
                            <div className='flex gap-2 justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                            Action</div>
                            <div className='flex justify-center gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            Status</div>
                            <div className='flex justify-center gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                </svg>
                            Wallet</div>
                            </div>
                            </div>
                            <div>
                            {isLoading ? (
                                <div className="text-gray-700 flex justify-center items-center p-4 w-full h-full"><Loader /></div>
                            ) : currentDocs.length === 0 ? (
                                <div className="text-gray-700 p-4">No recent transactions found.</div>
                            ) : (
                                currentDocs.map((tx, index) => (
                                <TransactionRow key={index} transaction={{
                                    date: tx.date,
                                    action: tx.action,
                                    status: tx.status,
                                    wallet: tx.walletAddress, 
                                }} />
                                ))
                            )}
                            <div className="flex justify-center bg-blue-500 p-1 rounded-b-2xl items-center gap-3">
                           <div className="flex p-1 rounded-xl bg-white" >
                            <div onClick={prevPage} className="p-2 text-black cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </div>
                            <div onClick={() => handlePageChange(1)} className={`px-2 my-1 flex text-sm ${currentPage == 1 ? "bg-blue-700 text-white" : "bg-gray-200"} justify-center text-black items-center rounded-lg mr-2`}>1</div>
                            {totalTransactionData > 1 && <div onClick={() => handlePageChange(2)} className={`px-2 my-1 ${currentPage == 2 ? "bg-blue-700 text-white" : "bg-gray-200"} text-black flex text-sm justify-center items-center rounded-lg mr-2`}>2</div> }
                            {totalTransactionData > 2 && <div onClick={() => handlePageChange(3)} className={`px-2 my-1 ${currentPage == 3 ? "bg-blue-700 text-white" : "bg-gray-200"} flex text-sm text-black justify-center items-center rounded-lg mr-2`}>3</div> }
                            <div className="px-2 my-1 flex text-sm justify-center items-center rounded-lg text-black bg-gray-200 mr-2">...</div>
                            <div onClick={() => handlePageChange(totalTransactionData)} className="px-2 my-1 flex text-sm justify-center items-center text-black rounded-lg bg-gray-200 mr-2">{totalTransactionData}</div>
                            <div onClick={nextPage} className="pr-2 py-2 text-black cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
              </div>
        </div>
                            </div>


                        </div>
                            <div className='flex flex-col rounded-xl gap-5'>
                                <div className='flex-1 bg-white rounded-xl p-5 '>
                                <div className='text-black font-semibold text-3xl'>Welcome , {userName}</div>
                                <div className="text-sm text-white bg-black p-3 rounded-2xl mt-3 flex justify-around">
                                    <div className='flex text-lg gap-2 justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                        </svg>
                                        {dateTime.toLocaleDateString()}
                                    </div>
                                    <div className='text-lg flex gap-2 justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {dateTime.toLocaleTimeString()}
                                    </div>
                                </div>
                                {userType === "verifier" && <div>
                                <div className="w-full flex mt-5 bg-gray-100 rounded-xl ">
                                <div  className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-blue-500 text-white">
                                Verifier 
                                </div>
                                <div  className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-gray-100 text-black">
                                Organization
                                </div>
                                </div>
                                <div className='text-black mt-5 text-wrap text-lg'>As a verifier, you can quickly verify documents with trust and transparency.</div>
                                </div>}
                                {userType === "organization" && <div>
                                <div className="w-full flex mt-5 bg-gray-100 rounded-xl ">
                                <div  className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-gray-100 text-black">
                                Verifier 
                                </div>
                                <div  className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-blue-500 text-white">
                                Organization
                                </div>
                                </div>
                                <div className='text-black mt-5 text-wrap text-lg'>As an organization, you can issue and manage verified documents with ease and reliability.</div>
                                </div>}
                                
                                </div>
                                <div className={`flex-1 flex flex-col justify-center items-center ${kycStatus == "Approved" ? "border-2 border-green-500" :"border-2 border-red-500"} bg-white rounded-xl p-5`}>
                                <div className='text-black flex justify-center font-bold text-3xl '>KYC Status</div>
                                {kycStatus == "Approved" && (
                                <div className='flex flex-col items-center'>
                                <div className='mt-4 py-3 px-4 items-center border-1 border-green-400 w-fit bg-green-100 rounded-2xl shadow-xs shadow-green-500 text-green-700 font-semibold flex gap-2'>
                                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                </svg>
                                </div> <div className='font-bold'> KYC {kycStatus}</div>
                                </div>
                                <div className='text-center text-sm font-semibold flex flex-col gap-1 text-gray-700 mt-3'>
                                <div>Your KYC verification is successfully completed!</div>
                                You now have full access to all platform features.</div>
                                <Button onClick={() => navigate("/issue")} variant="primary" size="md" className="before:bg-white pl-12 pr-12 w-full rounded-xl justify-center mt-4 mb-0 outline-blue-400 flex gap-2 items-center">
                                Issue Document
                                </Button>
                                </div>)
                                }
                                {kycStatus == "Pending" && 
                                <div className='flex flex-col items-center'>
                                <div className='mt-5 py-3 px-4 items-center border-1 border-red-400 w-fit bg-red-100 rounded-2xl shadow-2xs shadow-red-500 text-red-700 font-semibold flex gap-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                    </svg>
                                </div> <div>KYC {kycStatus}</div> 
                                </div> 
                                <div>
                                <p className="text-gray-700 text-center text-sm mt-3 font-semibold">
                                    Your KYC verification is still pending. Please complete the process
                                    to unlock the ability to issue documents.
                                </p>
                                <div className='flex justify-center'>
                                <Button onClick={() => navigate("/orgkyc")} variant="primary" size="md" className="before:bg-white rounded-lg w-full hover:scale-0  justify-center text-lg outline-blue-400 mt-6 flex gap-2 items-center">
                                    Verify Now
                                </Button> 
                                </div>
                                </div>
                                </div>    
                                }
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
