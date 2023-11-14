'use client'
import { useGlobalContext } from "@/contexts/store";
import { MetaMaskSDK } from '@metamask/sdk';
import React from "react";

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
      await wallet.getQuizToken();
      await wallet.getEther();
      setWallet(wallet.clone());
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
            <input type="text" readOnly defaultValue={wallet.ethToken || 0} className="form-control" />
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
            <input type="text" readOnly defaultValue={wallet.quizToken || 0} className="form-control" />
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
            <input type="text" defaultValue={wallet.address} className="form-control" readOnly />
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