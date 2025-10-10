import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {contractABI , contractAddress} from "../utils/constants"

export const TransactionContext = React.createContext();

export const createEthereumContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No ethereum object");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const connectWallet = async () => {
    try{
      if (!window.ethereum){
      return alert("Please install MetaMask.");
      } 

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const address = accounts[0];
  
      console.log("Connected address:", address);

      const { data } = await axios.post("http://localhost:3000/nonce",{ 
      walletAddress: address 
      });

      const nonce = data.nonce;

      const signature = await signer.signMessage(nonce);

      const res = await axios.post("http://localhost:3000/walletverify", {
        walletAddress: address,
        signature,
      });
  
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
  } catch (error) {
    console.error("Wallet connection error:", error);
    alert(error.message || "Connection failed. Please try again.");
  }
};

 
  const approveOrg = async (orgAddress, orgName) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.approveOrg(orgAddress, orgName);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      console.log("✅ Organization approved:", orgAddress);
    } catch (error) {
      console.error("approveOrg error:", error);
    }
  };

  // 📌 Revoke Organization
  const revokeOrg = async (orgAddress) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.revokeOrg(orgAddress);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      console.log("❌ Organization revoked:", orgAddress);
    } catch (error) {
      console.error("revokeOrg error:", error);
    }
  };

  // 📌 Issue Document
  const issueDocument = async (personName, personWallet, docType, orgName, docHash) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.issueDocument(personName, personWallet, docType, orgName, docHash);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      console.log("✅ Document issued!");
    } catch (error) {
      console.error("issueDocument error:", error);
    }
  };

  // 📌 Verify Document
  const verifyDocument = async (docHash) => {
    try {
      const contract = await createEthereumContract();
      return await contract.verifyDocument(docHash);
    } catch (error) {
      console.error("verifyDocument error:", error);
      return false;
    }
  };

  // 📌 Revoke Document
  const revokeDocument = async (docHash) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.revokeDocument(docHash);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      console.log("❌ Document revoked");
    } catch (error) {
      console.error("revokeDocument error:", error);
    }
  };

  // 📌 Get documents by person
  const getDocumentsByPerson = async (personWallet) => {
    try {
      const contract = await createEthereumContract();
      return await contract.getDocumentsByPerson(personWallet);
    } catch (error) {
      console.error("getDocumentsByPerson error:", error);
      return [];
    }
  };

  // 📌 Get documents by org
  const getDocumentsByOrg = async (orgWallet) => {
    try {
      const contract = await createEthereumContract();
      return await contract.getDocumentsByOrg(orgWallet);
    } catch (error) {
      console.error("getDocumentsByOrg error:", error);
      return [];
    }
  };

  // 📌 Get all documents (owner only)
  const getAllDocuments = async () => {
    try {
      const contract = await createEthereumContract();
      return await contract.getAllDocuments();
    } catch (error) {
      console.error("getAllDocuments error:", error);
      return [];
    }
  };

  // 📌 Auto-check wallet
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error("checkIfWalletIsConnected error:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        approveOrg,
        revokeOrg,
        issueDocument,
        verifyDocument,
        revokeDocument,
        getDocumentsByPerson,
        getDocumentsByOrg,
        getAllDocuments,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
