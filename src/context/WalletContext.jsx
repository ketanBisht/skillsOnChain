import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [role, setRole] = useState('student'); // 'student', 'issuer', 'verifier', 'admin'
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if wallet is already connected
  useEffect(() => {
    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      setCurrentAccount(null);
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!window.ethereum) {
        window.open("https://metamask.io/download/", "_blank");
        throw new Error("MetaMask is not installed. redirecting to download page.");
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  return (
    <WalletContext.Provider value={{
      currentAccount,
      role,
      setRole,
      connectWallet,
      disconnectWallet,
      isConnecting,
      error
    }}>
      {children}
    </WalletContext.Provider>
  );
};
