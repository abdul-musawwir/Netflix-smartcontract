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
  
  const checkIfWalletIsConnect = async () => {
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

  const sendTransaction = async () => {
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

  const withdrawTransaction = async () => {
    // console.log(addressTo,amount)
    try {
      if (ethereum) {
        const addressTo = "0xde1e8410aE4Cf09993C768E9100E835B492F5a2D";
        const netflixContract = getEthereumContract();
        const amount = "5";
        const parsedAmount = ethers.utils.parseEther(amount);

        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [{
        //     from: currentAccount,
        //     to: addressTo,
        //     gas: "2DC6C0",
        //     value: parsedAmount._hex,
        //   }],
        // });
        // const someValue = BigInt(5000000000000000000);
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
    checkIfWalletIsConnect();
  },[])

  return (
    <netflixContext.Provider value={{connectWallet, currentAccount, sendTransaction, withdrawTransaction }}>
      {children}
    </netflixContext.Provider>
  )
}