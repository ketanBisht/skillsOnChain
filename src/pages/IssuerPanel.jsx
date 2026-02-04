import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import styles from './IssuerPanel.module.css';
import { Send, CheckCircle } from 'lucide-react';

const IssuerPanel = () => {
    const [formData, setFormData] = useState({
        recipient: '',
        skillName: '',
        category: 'Technical',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');

        // Simulate blockchain transaction
        setTimeout(() => {
            setLoading(false);
            setSuccess(`Successfully issued "${formData.skillName}" to ${formData.recipient.slice(0, 6)}...`);
            setFormData({ recipient: '', skillName: '', category: 'Technical' });

            // Clear success message after 5s
            setTimeout(() => setSuccess(''), 5000);
        }, 2000);
    };

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <h1 className={styles.title}>Issue Credentials</h1>
                <p className={styles.subtitle}>Grant new soulbound tokens to students.</p>
            </header>

            <Card className={styles.formCard}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Recipient Address</label>
                        <input
                            type="text"
                            name="recipient"
                            className={styles.input}
                            placeholder="0x..."
                            value={formData.recipient}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Skill Name</label>
                        <input
                            type="text"
                            name="skillName"
                            className={styles.input}
                            placeholder="e.g. React Fundamentals"
                            value={formData.skillName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Category</label>
                        <select
                            name="category"
                            className={styles.select}
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Technical">Technical</option>
                            <option value="Soft Skill">Soft Skill</option>
                            <option value="Certification">Certification</option>
                            <option value="Achievement">Achievement</option>
                        </select>
                    </div>

                    {success && (
                        <div style={{ marginBottom: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} />
                            <span>{success}</span>
                        </div>
                    )}

                    <Button type="submit" loading={loading} style={{ width: '100%' }}>
                        Issue Credential <Send size={16} />
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default IssuerPanel;
