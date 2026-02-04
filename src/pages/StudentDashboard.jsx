import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import styles from './StudentDashboard.module.css';
import { Award, UserCheck } from 'lucide-react';

// Mock data
const MOCK_SKILLS = [
    { id: '101', name: 'Blockchain Fundamentals', issuer: '0x123...456', status: 'Active', date: '2023-10-15', category: 'Technical' },
    { id: '102', name: 'Advanced React Patterns', issuer: '0xabc...def', status: 'Active', date: '2023-11-20', category: 'Development' },
    { id: '103', name: 'Smart Contract Security', issuer: '0x123...456', status: 'Revoked', date: '2023-09-01', category: 'Security' },
];

const StudentDashboard = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        setTimeout(() => {
            setSkills(MOCK_SKILLS);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Your Credentials</h1>
                <p className={styles.subtitle}>Manage and view your verified soulbound tokens.</p>
            </header>

            {loading ? (
                <div>Loading skills...</div>
            ) : (
                <div className={styles.grid}>
                    {skills.map((skill) => (
                        <Card key={skill.id} className={styles.skillCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.skillName}>{skill.name}</h3>
                                <span className={styles.tokenId}>#{skill.id}</span>
                            </div>

                            <div className={styles.issuerInfo}>
                                <UserCheck size={16} />
                                <span>Issuer: {skill.issuer}</span>
                            </div>

                            <div className={`${styles.status} ${skill.status === 'Active' ? styles.active : styles.revoked}`}>
                                {skill.status}
                            </div>

                            <span className={styles.date}>Issued: {skill.date}</span>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
