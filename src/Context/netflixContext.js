import React, {useEffect, useState, createContext} from 'react';
import { ethers } from 'ethers';

import {contractABI, contractAddress } from '../utils/constants';
export const netflixContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const netflixContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  return netflixContract;
}

export default function NetflixProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        alert("No accounts found");
      }
    } catch (error) {
      alert(error);
    }
  };

  const connectWallet = async () => {
    console.log("wallet connect")
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      alert(error);

      throw new Error("No ethereum object");
    }
  };

  const charge = async () => {
    try {
      if (ethereum) {
        const netflixContract = getEthereumContract();
        const amount = "10";
        const parsedAmount = ethers.utils.parseEther(amount);
        await netflixContract.charge({value:parsedAmount._hex });
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const withdraw = async (addressTo,amount) => {
    try {
      if (ethereum) {
        // const addressTo = "0x1Ce9C0f635Acf07E12265481c9C860096b8954b9";
        const netflixContract = getEthereumContract();
        // const amount = "5";
        const parsedAmount = ethers.utils.parseEther(amount);
        console.log(addressTo,amount)

        await netflixContract.withdraw(addressTo,parsedAmount._hex);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])

  return (
    <netflixContext.Provider value={{connectWallet, currentAccount, charge, withdraw }}>
      {children}
    </netflixContext.Provider>
  )
}