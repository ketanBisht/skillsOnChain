import React, { useState } from 'react';
import Card from '../components/UI/Card';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
    const [issuers, setIssuers] = useState([
        { id: 1, address: '0x1234...5678', name: 'University A', status: 'Authorized' },
        { id: 2, address: '0x8765...4321', name: 'Coding Bootcamp', status: 'Authorized' },
        { id: 3, address: '0xabcd...efff', name: 'Bad Actor', status: 'Revoked' },
    ]);

    const toggleStatus = (id) => {
        setIssuers(issuers.map(issuer =>
            issuer.id === id
                ? { ...issuer, status: issuer.status === 'Authorized' ? 'Revoked' : 'Authorized' }
                : issuer
        ));
    };

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <h1 className={styles.title}>System Administration</h1>
                <p className={styles.subtitle}>Manage issuers and view system statistics.</p>
            </header>

            <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                    <div className={styles.statValue}>1,245</div>
                    <div className={styles.statLabel}>Total Tokens</div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statValue}>32</div>
                    <div className={styles.statLabel}>Active Issuers</div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statValue}>12</div>
                    <div className={styles.statLabel}>Revocations</div>
                </Card>
            </div>

            <h2 className={styles.sectionTitle}>Authorized Issuers</h2>
            <Card className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Wallet Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuers.map((issuer) => (
                            <tr key={issuer.id}>
                                <td>{issuer.name}</td>
                                <td style={{ fontFamily: 'monospace' }}>{issuer.address}</td>
                                <td>
                                    <span style={{
                                        color: issuer.status === 'Authorized' ? '#10b981' : '#ef4444',
                                        fontWeight: 600
                                    }}>
                                        {issuer.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={`${styles.actionBtn} ${issuer.status === 'Authorized' ? styles.revokeBtn : ''}`}
                                        onClick={() => toggleStatus(issuer.id)}
                                    >
                                        {issuer.status === 'Authorized' ? 'Revoke' : 'Authorize'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default AdminPanel;
