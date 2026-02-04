import React from 'react';
import Navbar from './Navbar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;


