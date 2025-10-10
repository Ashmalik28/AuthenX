import { useState , useEffect } from "react"
import {createEthereumContract} from '../context/TransactionContext'

const AdminCheck = () => {
    const [isAdmin , setIsAdmin] = useState(null);
    
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const contract = await createEthereumContract();
                const owner = await contract.owner();
                const accounts = await window.ethereum.request({method : "eth_accounts"});

                if(accounts.length > 0 && typeof owner === "string" && accounts[0].toLowerCase() === owner.toLowerCase()){
                    setIsAdmin(true);
                }else {
                    setIsAdmin(false);
                }
            } catch (error){
                console.log("Admin check failed: " , error);
                setIsAdmin(false);
            }
        }
        checkAdmin();
    }, []);

    return isAdmin;
}

export default AdminCheck;