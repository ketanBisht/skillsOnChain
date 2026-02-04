import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import styles from './Verification.module.css';

const Verification = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setResult(null);

        // Mock Verification Logic
        setTimeout(() => {
            // Mock: IDs starting with '1' are valid, '0' are revoked, others invalid
            if (query.startsWith('1')) {
                setResult({ status: 'Valid', message: 'Credential is valid and active.', recipient: '0x123...456', skill: 'Blockchain Fundamentals', date: '2023-10-15' });
            } else if (query.startsWith('0')) {
                setResult({ status: 'Revoked', message: 'This credential has been revoked.', recipient: '0xabc...def', skill: 'Smart Contract Security', date: '2023-09-01' });
            } else {
                setResult({ status: 'Invalid', message: 'No credential found with this ID/Address.' });
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Credential Verification</h1>
                <p className={styles.subtitle}>Verify the authenticity of a skill credential.</p>
            </div>

            <Card className={styles.searchCard}>
                <form onSubmit={handleVerify} className={styles.searchForm}>
                    <div className={styles.inputWrapper}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Enter Token ID or Wallet Address"
                            className={styles.input}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" loading={loading}>Verify</Button>
                </form>
            </Card>

            {result && (
                <Card className={`${styles.resultCard} ${styles[result.status.toLowerCase()]}`}>
                    <div className={styles.resultHeader}>
                        {result.status === 'Valid' && <CheckCircle size={32} className={styles.successIcon} />}
                        {result.status === 'Revoked' && <XCircle size={32} className={styles.errorIcon} />}
                        {result.status === 'Invalid' && <XCircle size={32} className={styles.errorIcon} />}
                        <div>
                            <h2 className={styles.resultTitle}>Credential is {result.status}</h2>
                            <p className={styles.resultMessage}>{result.message}</p>
                        </div>
                    </div>

                    {result.status !== 'Invalid' && (
                        <div className={styles.details}>
                            <div className={styles.detailRow}>
                                <span>Skill:</span>
                                <strong>{result.skill}</strong>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Recipient:</span>
                                <code>{result.recipient}</code>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Issue Date:</span>
                                <span>{result.date}</span>
                            </div>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default Verification;
