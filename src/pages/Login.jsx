import React, { useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { Wallet, Shield, Award, ArrowRight, Zap } from 'lucide-react';

const Login = () => {
    const { connectWallet, isConnecting, currentAccount, error } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentAccount) {
            navigate('/dashboard');
        }
    }, [currentAccount, navigate]);

    return (
        <div className={styles.container}>
            <div className={`${styles.bgOrb} ${styles.orb1}`}></div>
            <div className={`${styles.bgOrb} ${styles.orb2}`}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Skills<span className="text-gradient">OnChain</span>
                </h1>
                <p className={styles.subtitle}>
                    The future of decentralized identity. Issue, verify, and own your credentials securely on the blockchain.
                </p>

                <div className={styles.heroCard}>
                    <div className={styles.iconWrapper}>
                        <Wallet size={32} className="text-gradient" />
                    </div>

                    <button
                        className={styles.connectBtn}
                        onClick={connectWallet}
                        disabled={isConnecting}
                    >
                        {isConnecting ? (
                            <>Connecting...</>
                        ) : (
                            <>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                                    alt="MetaMask"
                                    className={styles.metaMaskIcon}
                                />
                                Connect MetaMask
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>

                    {error && (
                        <p className={styles.error}>{error}</p>
                    )}
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}><Award size={20} /></div>
                        <span>Soulbound Tokens</span>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}><Shield size={20} /></div>
                        <span>Tamper Proof</span>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}><Zap size={20} /></div>
                        <span>Instant Verify</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
