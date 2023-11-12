'use client'
import { useGlobalContext } from "@/contexts/store";
import { MetaMaskSDK } from '@metamask/sdk';
import React from "react";
import { ethers } from 'ethers';

export default () => {
  const { wallet, setWallet, error, setError } = useGlobalContext();

  const handleOnConnect = async () => {
    try {
      if (window.ethereum?.isMetaMask) {
        const MMSDK = new MetaMaskSDK({
          checkInstallationImmediately: true,
          enableDebug: false,
          dappMetadata: {
            name: "RatherLabs Quizz"
          }
        });
        await MMSDK.init()
        const ethHandler = MMSDK.getProvider();
        ethHandler.on('chainChanged', handleGetChainId);
        handleGetChainId();
        handleGetAccount();
      }
    }
    catch (err: any) {
      setError(err.message)
    }
  }
  const handleGetChainId = async () => {
    try {
      const response = await window.ethereum?.request({ method: 'eth_chainId' });
      wallet.chainId = Number(response);
      setWallet(Object.assign({}, wallet));
    }
    catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }
  const handleGetAccount = async () => {
    try {
      let response = await window.ethereum?.request({ method: 'eth_requestAccounts' });
      console.dir(response);
      //@ts-ignore
      wallet.address = response[0];

      console.log(`Eth: ${response}`)
      setWallet(Object.assign({}, wallet));
      getEther();
      getQuiz();
    }
    catch (err: any) {
      console.error(err);
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        setError('Please connect to MetaMask.');
      }
      else
        setError(err.message);
    }
  }
  const handleOnSwitchNetwork = async () => {
    try {
      setError('');
      await window.ethereum?.request({
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": "0x5"
          }
        ]
      });
      handleGetChainId()
    }
    catch (err: any) {
      setError(err.message)
    }
  }

  const getEther = async () => {
    try {
      const response = await window.ethereum?.request({
        "method": "eth_getBalance",
        "params": [
          wallet.address,
          null
        ]
      });
      wallet.ethToken = Number.isNaN(response) ? null : Number(response);
    }
    catch (err: any) {
      setError(err.message);
      wallet.ethToken = null;
    }
  }
  const getQuiz = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        if (provider) {
          const contractAddress = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72';
          const contractAbi = [{ "inputs": [{ "internalType": "uint256", "name": "_cooldownSeconds", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cooldownSeconds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "lastSubmittal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_cooldownSeconds", "type": "uint256" }], "name": "setCooldown", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_surveyId", "type": "uint256" }, { "internalType": "uint256[]", "name": "_answerIds", "type": "uint256[]" }], "name": "submit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
          const erc20Contract = new ethers.Contract(contractAddress, contractAbi, provider);
          const balance = await erc20Contract.balanceOf(wallet.address);
          console.log(`Balance de ${wallet.address}: ${balance.toString()} tokens`);
          wallet.quizToken = balance;
        }
      }
    }
    catch (err: any) {
      setError(err.message);
    }
  }

  const buttonConnectMetamask = () => {
    if (wallet.address == null) {
      return (
        <li className="nav-item">
          <button onClick={handleOnConnect} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="metamask-logo.png" // Reemplaza con la ruta correcta a tu imagen de MetaMask
              alt="MetaMask Logo"
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
            />
            Connect Metamask
          </button>
        </li>
      )
    }
  }
  const buttonSwitchNetwork = () => {
    if ((wallet.chainId != null && wallet.chainId != 0x5)) {
      return (
        <li className="nav-item">
          <button onClick={handleOnSwitchNetwork}>
            <svg viewBox="0 0 115 182" focusable="false" className="chakra-icon css-1io60e2" style={{ width: "24px", height: "24px" }}>
              <path d="M57.5054 181V135.84L1.64064 103.171L57.5054 181Z" fill="#F0CDC2" stroke="#1616B4" stroke-linejoin="round"></path>
              <path d="M57.6906 181V135.84L113.555 103.171L57.6906 181Z" fill="#C9B3F5" stroke="#1616B4" stroke-linejoin="round"></path>
              <path d="M57.5055 124.615V66.9786L1 92.2811L57.5055 124.615Z" fill="#88AAF1" stroke="#1616B4" stroke-linejoin="round"></path>
              <path d="M57.6903 124.615V66.9786L114.196 92.2811L57.6903 124.615Z" fill="#C9B3F5" stroke="#1616B4" stroke-linejoin="round"></path>
              <path d="M1.00006 92.2811L57.5054 1V66.9786L1.00006 92.2811Z" fill="#F0CDC2" stroke="#1616B4" stroke-linejoin="round"></path>
              <path d="M114.196 92.2811L57.6906 1V66.9786L114.196 92.2811Z" fill="#B8FAF6" stroke="#1616B4" stroke-linejoin="round"></path>
            </svg>
            Switch to Goerli
          </button>
        </li >
      )
    }
  }
  const showEther = () => {
    if (wallet.address != null && wallet.chainId == 0x5) {
      return (
        <li className="nav-item">
          <div className="input-group input-group-sm">
            <span className="input-group-text">$Ether</span>
            <input type="text" value={wallet.ethToken || 0} className="form-control" placeholder="Ingrese su dirección" />
          </div>
        </li>
      )
    }
  }
  const showQuiz = () => {
    if (wallet.address != null && wallet.chainId == 0x5) {
      return (
        <li className="nav-item">
          <div className="input-group input-group-sm">
            <span className="input-group-text">$Quiz</span>
            <input type="text" value={wallet.quizToken || 0} className="form-control" placeholder="Ingrese su dirección" />
          </div>
        </li>
      )
    }
  }
  const showAddress = () => {
    if (wallet.address != null && wallet.chainId == 0x5) {
      return (
        <li className="nav-item">
          <div className="input-group input-group-sm">
            <span className="input-group-text">Your Address</span>
            <input type="text" value={wallet.address} className="form-control" placeholder="Ingrese su dirección" />
          </div>
        </li>
      )
    }
  }

  return (
    <React.Fragment>
      <nav className="py-2 border-bottom" style={{ opacity: "30" }}>
        <div className="d-flex flex-wrap justify-content-end mx-2">
          <ul className="nav">
            {buttonConnectMetamask()}
            {buttonSwitchNetwork()}
            {showEther()}
            {showQuiz()}
            {showAddress()}
          </ul>
        </div>
      </nav>
      <header className={error.length ? "" : "visually-hidden"}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </header>
    </React.Fragment>
  )
}