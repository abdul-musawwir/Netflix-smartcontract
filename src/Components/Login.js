import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import './Login.css'
import {useContext} from 'react';
import { netflixContext } from '../Context/netflixContext';
// import { SERVER_IP } from './constants'

export default function Login ({setToken}){
    const [address,setAddress] = useState("")
    const [amount,setAmount] = useState("")

    const {charge,withdraw,connectWallet} = useContext(netflixContext); 

    const handleSubmit =  e => {
        withdraw(address,amount)
      }

    return(
        <>
        
        <div className="container-bg">
            
        <img class="splash-logo" id = "image" alt="bg-crescent" src="/netflix.png"/>
        <div class="login-container">
            <div class="login">    
                    <label className="label2">
                        <b>Address&nbsp;&nbsp;</b>    
                    </label>    
                    <input type="text" name="Uname" id="Uname" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}}/>    
                    <br/><br/>    
                    <label className="label2">
                        <b>Amount&nbsp;&nbsp;&nbsp;</b>    
                    </label>    
                    
                    <input type="text" name="Pass" id="Pass" placeholder="Amount" onChange={(e)=>{setAmount(e.target.value)}}/>  
                    <br/><br/>   
                    <input type="button" name="connect" id="log" value="Connect wallet" onClick={connectWallet}/>
                    <br/>
                    <input type="button" name="log" id="log" value="Charge" onClick={charge}/>  
                    
                    <input type="button" name="log" id="log" value="Transfer" onClick={handleSubmit}/> 
                    
            </div>
            {/* <div class="imagelog">
                        <img src="./12.jpeg" alt="login" width="550px" height="450" />
                    </div> */}
            {/* <div>
                <img src="./new.jpeg" alt="login"  />
            </div> */}
        </div>
        </div>
        </>
    )
}

