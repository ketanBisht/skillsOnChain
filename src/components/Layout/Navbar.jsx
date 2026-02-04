import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import styles from './Navbar.module.css';
import { LayoutDashboard, Award, ShieldCheck, LogOut, FileBadge, User } from 'lucide-react';

const Navbar = () => {
    const { currentAccount, role, setRole, disconnectWallet } = useWallet();
    const navigate = useNavigate();

    const handleDisconnect = () => {
        disconnectWallet();
        navigate('/');
    };

    const formatAddress = (addr) => {
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
    };

    // Define navigation items based on role
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} />, roles: ['student', 'issuer', 'admin', 'verifier'] },
        { name: 'Issue Skill', path: '/issuer', icon: <FileBadge size={18} />, roles: ['issuer', 'admin'] },
        { name: 'Admin', path: '/admin', icon: <ShieldCheck size={18} />, roles: ['admin'] },
        { name: 'Verify', path: '/verify', icon: <Award size={18} />, roles: ['student', 'issuer', 'admin', 'verifier'] },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Award size={24} color="#fff" />
                </div>
                <span>Skills<span className="text-gradient">OnChain</span></span>
            </div>

            <div className={styles.navLinks}>
                {navItems.map((item) => (
                    (item.roles.includes(role)) && (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    )
                ))}
            </div>

            <div className={styles.actions}>
                <div className={styles.walletInfo}>
                    <div className={styles.roleBadge}>{role}</div>
                    <User size={16} className={styles.userIcon} color="var(--color-text-secondary)" />
                    <span className={styles.address}>{formatAddress(currentAccount)}</span>
                </div>
                <button className={styles.logoutBtn} onClick={handleDisconnect} title="Disconnect">
                    <LogOut size={20} />
                </button>
            </div>

            {/* DEMO ONLY: Role Switcher - keeping it discrete */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        background: 'rgba(0,0,0,0.8)',
                        color: '#666',
                        border: '1px solid #333',
                        fontSize: '10px',
                        padding: '4px',
                        borderRadius: '4px'
                    }}
                >
                    <option value="student">Student</option>
                    <option value="issuer">Issuer</option>
                    <option value="verifier">Verifier</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </nav>
    );
};

export default Navbar;
